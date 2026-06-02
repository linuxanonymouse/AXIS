import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json(data, init);
}

export function jsonError(
  message: string,
  status: number,
  details?: unknown
) {
  return NextResponse.json(
    { error: message, ...(details !== undefined ? { details } : {}) },
    { status }
  );
}

export function handleRouteError(err: unknown) {
  if (err instanceof ZodError) {
    return jsonError("Invalid payload", 400, err.flatten());
  }

  const message = err instanceof Error ? err.message : "Internal server error";

  if (
    message.includes("connect") ||
    message.includes("ECONNREFUSED") ||
    message.includes("Connection")
  ) {
    return jsonError(
      "Database unavailable. Ensure MongoDB is running and DATABASE_URL is set.",
      503
    );
  }

  if (message.includes("Unique constraint")) {
    return jsonError("Resource already exists", 409);
  }

  console.error("[axis api]", err);
  return jsonError("Internal server error", 500);
}
