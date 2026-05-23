import { NextRequest, NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  organization?: string;
  email?: string;
  brief?: string;
};

/** Node.js API — contact transmission handler */
export async function POST(request: NextRequest) {
  let body: ContactBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  const { name, organization, email, brief } = body;

  if (!name?.trim() || !organization?.trim() || !email?.trim() || !brief?.trim()) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValid) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // In production: persist to CRM, send email, queue job, etc.
  console.info("[AXIS Contact]", {
    name: name.trim(),
    organization: organization.trim(),
    email: email.trim(),
    brief: brief.trim(),
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    success: true,
    message: "Transmission received. Our mission team will respond within 24 hours.",
    id: `orb-${Date.now().toString(36)}`,
  });
}
