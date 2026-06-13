import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 400 });
  }

  try {
    const operatorToken = await prisma.operatorToken.findUnique({
      where: { token },
    });

    if (!operatorToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (operatorToken.used) {
      return NextResponse.json({ error: "Token has already been used" }, { status: 401 });
    }

    if (new Date() > operatorToken.expiresAt) {
      return NextResponse.json({ error: "Token has expired" }, { status: 401 });
    }

    return NextResponse.json({ success: true, email: operatorToken.email });
  } catch (err) {
    console.error("Token validation error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
