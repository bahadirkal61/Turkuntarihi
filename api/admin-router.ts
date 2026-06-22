import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { feedback, auditLogs, blockedIps } from "../db/schema";
import { desc, eq } from "drizzle-orm";

export const adminRouter = createRouter({
  // Dashboard statistics
  dashboard: publicQuery.query(async () => {
    const db = getDb();
    const [feedbackList, auditList] = await Promise.all([
      db.select().from(feedback),
      db.select().from(auditLogs),
    ]);

    const last24h = auditList.filter(
      (l) => new Date(l.createdAt ?? 0).getTime() > Date.now() - 86400000
    );

    return {
      feedback: {
        total: feedbackList.length,
        new: feedbackList.filter((f) => f.status === "new").length,
        read: feedbackList.filter((f) => f.status === "read").length,
        replied: feedbackList.filter((f) => f.status === "replied").length,
      },
      audit: {
        total: auditList.length,
        last24h: last24h.length,
        failures: auditList.filter((l) => l.status === "failure").length,
      },
      recentFeedback: feedbackList
        .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
        .slice(0, 10),
      recentAudit: auditList
        .sort((a, b) => new Date(b.createdAt ?? 0).getTime() - new Date(a.createdAt ?? 0).getTime())
        .slice(0, 10),
    };
  }),

  // List feedback with pagination
  feedbackList: publicQuery
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

      const query = db
        .select()
        .from(feedback)
        .orderBy(desc(feedback.createdAt))
        .limit(limit)
        .offset(offset);

      return query;
    }),

  // Update feedback status
  updateFeedbackStatus: publicQuery
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

  // Delete feedback
  deleteFeedback: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(feedback).where(eq(feedback.id, input.id));
      return { success: true };
    }),

  // List audit logs
  auditList: publicQuery
    .input(
      z.object({
        limit: z.number().min(1).max(500).default(100),
        offset: z.number().min(0).default(0),
      }).optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const limit = input?.limit ?? 100;
      const offset = input?.offset ?? 0;

      return db
        .select()
        .from(auditLogs)
        .orderBy(desc(auditLogs.createdAt))
        .limit(limit)
        .offset(offset);
    }),

  // Block IP
  blockIp: publicQuery
    .input(
      z.object({
        ipAddress: z.string().regex(/^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/),
        reason: z.string().optional(),
        expiresAt: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(blockedIps).values({
        ipAddress: input.ipAddress,
        reason: input.reason || "Manual block",
        blockedBy: "admin",
        expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
      });
      return { success: true };
    }),

  // Unblock IP
  unblockIp: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(blockedIps).where(eq(blockedIps.id, input.id));
      return { success: true };
    }),

  // List blocked IPs
  blockedIpList: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(blockedIps).orderBy(desc(blockedIps.createdAt));
  }),
});
