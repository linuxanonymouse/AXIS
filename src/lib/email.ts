type EmailPayload = {
  to: string | string[];
  subject: string;
  html: string;
};

import nodemailer from "nodemailer";

export async function sendEmail(payload: EmailPayload) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.EMAIL_FROM || user;
  
  if (!user || !pass || !from) return false;

  const to = Array.isArray(payload.to) ? payload.to.join(", ") : payload.to;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  try {
    await transporter.sendMail({
      from,
      to,
      subject: payload.subject,
      html: payload.html,
    });
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

export function applicantConfirmationHtml(organizationName: string) {
  return `
    <div style="font-family: Georgia, serif; color: #111; max-width: 560px;">
      <p style="letter-spacing: 0.2em; text-transform: uppercase; font-size: 11px;">Axis Alignment Application</p>
      <h1 style="font-weight: 500;">Submission Received</h1>
      <p>Your Strategic Diagnostic for <strong>${organizationName}</strong> has been received.</p>
      <p>Axis will review the submission and issue next steps if alignment is confirmed.</p>
      <p style="color: #666; font-size: 14px;">This is an automated confirmation. Internal review will determine whether the opportunity is aligned with the Axis system.</p>
    </div>
  `;
}

export function internalDiagnosticHtml(application: {
  id: string;
  organizationName: string;
  applicantName: string;
  email: string;
  overallAlignmentScore: number | null;
  primaryConstraint: string | null;
  recommendedAxisPathway: string | null;
}) {
  return `
    <div style="font-family: system-ui, sans-serif; max-width: 640px;">
      <h2>New Axis Diagnostic Submission</h2>
      <p><strong>${application.organizationName}</strong> ${application.applicantName} (${application.email})</p>
      <p>Record ID: ${application.id}</p>
      <p>Alignment score: ${application.overallAlignmentScore ?? "Pending"}</p>
      <p>Primary constraint: ${application.primaryConstraint ?? "Pending"}</p>
      <p>Recommended pathway: ${application.recommendedAxisPathway ?? "Pending"}</p>
      <p>Review in the Axis diagnostic output system.</p>
    </div>
  `;
}
