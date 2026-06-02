import crypto from "crypto";
import type { NextRequest } from "next/server";

export function getRequestMeta(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  const ipHash = ip
    ? crypto.createHash("sha256").update(ip).digest("hex")
    : null;

  return {
    ipHash,
    userAgent: request.headers.get("user-agent"),
    sourcePath: request.nextUrl.pathname,
  };
}

export function verifyAdminSecret(request: Request): boolean {
  const secret = request.headers.get("x-admin-secret");
  return Boolean(secret && secret === process.env.ADMIN_SECRET);
}
