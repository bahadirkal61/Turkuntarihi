import { authRouter } from "./auth-router";
import { localAuthRouter } from "./local-auth-router";
import { feedbackRouter } from "./feedback-router";
import { auditRouter } from "./audit-router";
import { adminRouter } from "./admin-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  localAuth: localAuthRouter,
  feedback: feedbackRouter,
  audit: auditRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
