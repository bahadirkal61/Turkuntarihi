import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { feedback } from "../db/schema";

export const feedbackRouter = createRouter({
  // Submit feedback (public - no auth required)
  submit: publicQuery
    .input(
      z.object({
        name: z.string().min(1, "İsim gereklidir").max(255),
        email: z.string().email("Geçerli bir e-posta adresi giriniz"),
        subject: z.string().min(1, "Konu gereklidir").max(255),
        message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır").max(5000),
        category: z.enum(["bug", "feature", "content", "other"]).default("other"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const db = getDb();
        const result = await db.insert(feedback).values({
          name: input.name,
          email: input.email,
          subject: input.subject,
          message: input.message,
          category: input.category,
          ipAddress: ctx.req?.headers.get("x-real-ip") || ctx.req?.headers.get("x-forwarded-for") || "unknown",
          userAgent: ctx.req?.headers.get("user-agent") || "unknown",
        });

        return {
          success: true,
          message: "Geri bildiriminiz başarıyla alındı. Teşekkür ederiz!",
          id: Number((result as any).insertId),
        };
      } catch (error) {
        console.error("Feedback submission error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Geri bildirim gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
        });
      }
    }),

  // List all feedback (admin only)
  list: publicQuery
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
        status: z.enum(["new", "read", "replied", "archived"]).optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const limit = input?.limit ?? 50;
      const offset = input?.offset ?? 0;

      const query = db.select().from(feedback).orderBy(desc(feedback.createdAt)).limit(limit).offset(offset);

      return query;
    }),

  // Get feedback count
  count: publicQuery.query(async () => {
    const db = getDb();
    const result = await db.select().from(feedback);
    return {
      total: result.length,
      new: result.filter((f) => f.status === "new").length,
      read: result.filter((f) => f.status === "read").length,
      replied: result.filter((f) => f.status === "replied").length,
    };
  }),

  // Update feedback status
  updateStatus: publicQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "read", "replied", "archived"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(feedback)
        .set({ status: input.status })
        .where(eq(feedback.id, input.id));
      return { success: true };
    }),
});
