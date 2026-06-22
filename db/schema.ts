import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  unionId: text("unionId", { length: 255 }).notNull().unique(),
  name: text("name", { length: 255 }),
  email: text("email", { length: 320 }),
  avatar: text("avatar"),
  role: text("role", { enum: ["user", "admin"] }).default("user").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).$defaultFn(() => new Date()),
  lastSignInAt: integer("lastSignInAt", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const adminUsers = sqliteTable("admin_users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  username: text("username", { length: 100 }).notNull().unique(),
  passwordHash: text("password_hash", { length: 255 }).notNull(),
  name: text("name", { length: 255 }).notNull(),
  email: text("email", { length: 320 }),
  role: text("role", { enum: ["editor", "admin", "superadmin"] }).default("editor").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  lastLoginAt: integer("last_login_at", { mode: "timestamp" }),
  loginAttempts: integer("login_attempts").default(0),
  lockedUntil: integer("locked_until", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type AdminUser = typeof adminUsers.$inferSelect;

export const feedback = sqliteTable("feedback", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 255 }).notNull(),
  email: text("email", { length: 320 }).notNull(),
  subject: text("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  category: text("category", { enum: ["bug", "feature", "content", "other"] }).default("other").notNull(),
  status: text("status", { enum: ["new", "read", "replied", "archived"] }).default("new").notNull(),
  ipAddress: text("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type Feedback = typeof feedback.$inferSelect;

export const auditLogs = sqliteTable("audit_logs", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  action: text("action", { length: 100 }).notNull(),
  entity: text("entity", { length: 100 }).notNull(),
  entityId: text("entity_id", { length: 255 }),
  userId: text("user_id", { length: 255 }),
  username: text("username", { length: 255 }),
  oldValue: text("old_value"),
  newValue: text("new_value"),
  ipAddress: text("ip_address", { length: 45 }).notNull(),
  userAgent: text("user_agent"),
  status: text("status", { enum: ["success", "failure", "warning"] }).default("success").notNull(),
  details: text("details"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type AuditLog = typeof auditLogs.$inferSelect;

export const blockedIps = sqliteTable("blocked_ips", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  ipAddress: text("ip_address", { length: 45 }).notNull().unique(),
  reason: text("reason", { length: 255 }),
  blockedBy: text("blocked_by", { length: 255 }),
  expiresAt: integer("expires_at", { mode: "timestamp" }),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type BlockedIp = typeof blockedIps.$inferSelect;
