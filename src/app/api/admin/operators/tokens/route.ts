import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { email } = json;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate a secure random token
    const token = crypto.randomBytes(32).toString("hex");

    // Token expires in 7 days
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // Save token to database
    const operatorToken = await prisma.operatorToken.create({
      data: {
        token,
        email,
        expiresAt,
      },
    });

    // Send email using existing utility
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://axisoperations.ca";
    const accessLink = `${appUrl}/apply?flow=operator&token=${token}`;

    const html = `
      <div style="font-family: Georgia, serif; color: #111; max-width: 560px;">
        <p style="letter-spacing: 0.2em; text-transform: uppercase; font-size: 11px;">Axis Operator System</p>
        <h1 style="font-weight: 500;">Secure Access Granted</h1>
        <p>You have been granted exclusive access to apply for the Axis Operator System.</p>
        <p>Use the following single-use link to access the intake form:</p>
        <p><a href="${accessLink}" style="color: #0044cc;"><strong>Access Application</strong></a></p>
        <p style="color: #666; font-size: 14px; margin-top: 2rem;">This link is unique to you and will expire in 7 days or after a single use.</p>
      </div>
    `;

    const sent = await sendEmail({
      to: email,
      subject: "Access Granted: Axis Operator System",
      html,
    });

    return NextResponse.json({ success: true, token: operatorToken, emailSent: sent });
  } catch (error) {
    console.error("Token generation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
