import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { auditLogs } from "../db/schema";
import { desc } from "drizzle-orm";

export const auditRouter = createRouter({
  // Create audit log entry
  log: publicQuery
    .input(
      z.object({
        action: z.string().min(1).max(100),
        entity: z.string().min(1).max(100),
        entityId: z.string().max(255).optional(),
        userId: z.string().max(255).optional(),
        username: z.string().max(255).optional(),
        oldValue: z.string().optional(),
        newValue: z.string().optional(),
        ipAddress: z.string().max(45),
        userAgent: z.string().optional(),
        status: z.enum(["success", "failure", "warning"]).default("success"),
        details: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.insert(auditLogs).values({
        action: input.action,
        entity: input.entity,
        entityId: input.entityId,
        userId: input.userId,
        username: input.username,
        oldValue: input.oldValue,
        newValue: input.newValue,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
        status: input.status,
        details: input.details,
      });
      return { success: true };
    }),

  // List audit logs
  list: publicQuery
    .input(
      z.object({
        limit: z.number().min(1).max(500).default(100),
        offset: z.number().min(0).default(0),
        action: z.string().optional(),
        status: z.enum(["success", "failure", "warning"]).optional(),
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

  // Get audit statistics
  stats: publicQuery.query(async () => {
    const db = getDb();
    const logs = await db.select().from(auditLogs);

    const last24h = logs.filter(
      (l) => new Date(l.createdAt ?? 0).getTime() > Date.now() - 86400000
    );

    return {
      total: logs.length,
      last24h: last24h.length,
      success: logs.filter((l) => l.status === "success").length,
      failure: logs.filter((l) => l.status === "failure").length,
      warning: logs.filter((l) => l.status === "warning").length,
      byAction: Object.entries(
        logs.reduce((acc, l) => {
          acc[l.action] = (acc[l.action] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      ).map(([action, count]) => ({ action, count })),
    };
  }),
});
