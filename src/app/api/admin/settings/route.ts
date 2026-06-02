import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    let settings = await prisma.systemSettings.findUnique({
      where: { globalKey: "global" },
    });

    if (!settings) {
      settings = await prisma.systemSettings.create({
        data: { globalKey: "global" },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { diagnosticEnabled, deploymentEnabled, operatorEnabled } = body;

    const settings = await prisma.systemSettings.upsert({
      where: { globalKey: "global" },
      update: {
        diagnosticEnabled,
        deploymentEnabled,
        operatorEnabled,
      },
      create: {
        globalKey: "global",
        diagnosticEnabled: diagnosticEnabled ?? true,
        deploymentEnabled: deploymentEnabled ?? true,
        operatorEnabled: operatorEnabled ?? true,
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
