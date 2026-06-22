import { getDb } from "../api/queries/connection";
import { adminUsers } from "./schema";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  // Check if admin user exists
  const existing = await db.select().from(adminUsers).limit(1);
  if (existing.length > 0) {
    console.log("Admin user already exists, skipping seed.");
    return;
  }

  // Create default admin user
  const hash = await bcrypt.hash("Admin123!", SALT_ROUNDS);
  await db.insert(adminUsers).values({
    username: "admin",
    passwordHash: hash,
    name: "Sistem Yöneticisi",
    email: "admin@turkuntarihi.com",
    role: "superadmin",
  });

  console.log("Default admin created:");
  console.log("  Username: admin");
  console.log("  Password: Admin123!");
  console.log("  IMPORTANT: Change this password after first login!");
}

seed().catch(console.error);
