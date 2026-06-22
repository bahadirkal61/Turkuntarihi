import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { adminUsers } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "turk-tarihi-secret-key-2024-change-in-production";
const SALT_ROUNDS = 12;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 30 * 60 * 1000; // 30 dakika

// Generate JWT token
function generateToken(userId: number, username: string, role: string): string {
  return jwt.sign({ userId, username, role }, JWT_SECRET, {
    expiresIn: "24h",
    issuer: "turk-tarihi-api",
    audience: "turk-tarihi-admin",
  });
}

// Verify JWT token
export function verifyToken(token: string): { userId: number; username: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: "turk-tarihi-api",
      audience: "turk-tarihi-admin",
      clockTolerance: 60,
    }) as { userId: number; username: string; role: string };
    return decoded;
  } catch {
    return null;
  }
}

export const localAuthRouter = createRouter({
  // Admin login
  login: publicQuery
    .input(
      z.object({
        username: z.string().min(1, "Kullanıcı adı gereklidir").max(100),
        password: z.string().min(1, "Şifre gereklidir").max(255),
        ipAddress: z.string().optional(),
        userAgent: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      // Find admin user
      const user = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.username, input.username))
        .limit(1);

      if (user.length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Kullanıcı adı veya şifre hatalı",
        });
      }

      const admin = user[0];

      // Check if account is locked
      if (admin.lockedUntil && new Date(admin.lockedUntil) > new Date()) {
        const remaining = Math.ceil((new Date(admin.lockedUntil).getTime() - Date.now()) / 60000);
        throw new TRPCError({
          code: "FORBIDDEN",
          message: `Hesabınız ${remaining} dakika kilitlendi. Çok fazla başarısız giriş denemesi.`,
        });
      }

      // Verify password
      const validPassword = await bcrypt.compare(input.password, admin.passwordHash);

      if (!validPassword) {
        // Increment login attempts
        const newAttempts = (admin.loginAttempts || 0) + 1;
        const updateData: Record<string, unknown> = {
          loginAttempts: newAttempts,
        };

        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          updateData.lockedUntil = new Date(Date.now() + LOCKOUT_DURATION);
        }

        await db
          .update(adminUsers)
          .set(updateData)
          .where(eq(adminUsers.id, admin.id));

        const remaining = MAX_LOGIN_ATTEMPTS - newAttempts;
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: `Kullanıcı adı veya şifre hatalı. Kalan deneme: ${remaining}`,
        });
      }

      // Reset login attempts and update last login
      await db
        .update(adminUsers)
        .set({
          loginAttempts: 0,
          lockedUntil: null,
          lastLoginAt: new Date(),
        })
        .where(eq(adminUsers.id, admin.id));

      // Generate token
      const token = generateToken(admin.id, admin.username, admin.role);

      return {
        token,
        user: {
          id: admin.id,
          username: admin.username,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      };
    }),

  // Verify token
  verify: publicQuery
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const decoded = verifyToken(input.token);
      if (!decoded) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Oturum süresi doldu veya geçersiz token",
        });
      }

      // Check user still exists and is active
      const db = getDb();
      const user = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.id, decoded.userId))
        .limit(1);

      if (user.length === 0 || !user[0].isActive) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Kullanıcı bulunamadı veya hesap devre dışı",
        });
      }

      return {
        valid: true,
        user: {
          id: user[0].id,
          username: user[0].username,
          name: user[0].name,
          email: user[0].email,
          role: user[0].role,
        },
      };
    }),

  // Change password
  changePassword: publicQuery
    .input(
      z.object({
        token: z.string(),
        currentPassword: z.string().min(1),
        newPassword: z.string().min(8, "Şifre en az 8 karakter olmalıdır").max(255),
      })
    )
    .mutation(async ({ input }) => {
      const decoded = verifyToken(input.token);
      if (!decoded) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Oturum süresi doldu",
        });
      }

      const db = getDb();
      const user = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.id, decoded.userId))
        .limit(1);

      if (user.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Kullanıcı bulunamadı" });
      }

      // Verify current password
      const valid = await bcrypt.compare(input.currentPassword, user[0].passwordHash);
      if (!valid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Mevcut şifre hatalı" });
      }

      // Hash new password
      const newHash = await bcrypt.hash(input.newPassword, SALT_ROUNDS);
      await db
        .update(adminUsers)
        .set({ passwordHash: newHash })
        .where(eq(adminUsers.id, decoded.userId));

      return { success: true, message: "Şifre başarıyla değiştirildi" };
    }),

  // Create admin user (superadmin only - no auth check for initial setup)
  createUser: publicQuery
    .input(
      z.object({
        username: z.string().min(3).max(100),
        password: z.string().min(8).max(255),
        name: z.string().min(1).max(255),
        email: z.string().email().optional(),
        role: z.enum(["editor", "admin", "superadmin"]).default("editor"),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      // Check if username exists
      const existing = await db
        .select()
        .from(adminUsers)
        .where(eq(adminUsers.username, input.username))
        .limit(1);

      if (existing.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Bu kullanıcı adı zaten kullanılıyor",
        });
      }

      const hash = await bcrypt.hash(input.password, SALT_ROUNDS);

      const result = await db.insert(adminUsers).values({
        username: input.username,
        passwordHash: hash,
        name: input.name,
        email: input.email || null,
        role: input.role,
      });

      return {
        success: true,
        id: Number((result as any).insertId),
        message: "Admin kullanıcısı başarıyla oluşturuldu",
      };
    }),

  // List admin users
  listUsers: publicQuery.query(async () => {
    const db = getDb();
    return db
      .select({
        id: adminUsers.id,
        username: adminUsers.username,
        name: adminUsers.name,
        email: adminUsers.email,
        role: adminUsers.role,
        isActive: adminUsers.isActive,
        lastLoginAt: adminUsers.lastLoginAt,
        createdAt: adminUsers.createdAt,
      })
      .from(adminUsers)
      .orderBy(adminUsers.id);
  }),
});
