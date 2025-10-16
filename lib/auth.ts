// lib/auth.ts
import { prisma } from "./prisma"; // ✅ correct

const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!; // hashed is better

export const verifyAdmin = (email: string, password: string) => {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
};
