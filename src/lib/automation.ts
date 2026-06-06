import nodemailer from "nodemailer";

// ─── Types ───────────────────────────────────────────────────────────────────

type AutomationPayload = {
  type: string;
  id: string;
  createdAt: string;
  email?: string | null;
  name?: string | null;
  organization?: string | null;
  [key: string]: unknown;
};

async function createClickupTask(payload: AutomationPayload) {
  const token = process.env.CLICKUP_API_TOKEN;
  const listId = process.env.CLICKUP_LIST_ID;
  if (!token || !listId) {
    console.warn("[automation] ClickUp credentials not found skipping task creation");
    return;
  }

  // Build task description from payload
  let description = "New submission received via Axis OS.\n\n";
  for (const [key, value] of Object.entries(payload)) {
    if (key !== "type" && key !== "id" && key !== "createdAt" && value) {
      description += `**${key}:** ${value}\n`;
    }
  }

  const taskName = `[${payload.type}] ${payload.name || payload.email || "New Submission"}`;

  await fetch(`https://api.clickup.com/api/v2/list/${listId}/task`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      name: taskName,
      description: description,
      status: "to do",
    }),
  }).catch((err) => {
    console.warn("[automation] ClickUp task creation failed:", err?.message);
  });
}

// ─── SMTP transporter (lazy-initialized) ─────────────────────────────────────

let _transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (_transporter) return _transporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  _transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return _transporter;
}

// ─── Email templates ─────────────────────────────────────────────────────────

function baseTemplate(title: string, bodyHtml: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border:1px solid rgba(212,175,55,0.15);border-radius:8px;overflow:hidden;">
        <!-- Header -->
        <tr><td style="padding:40px 40px 24px;border-bottom:1px solid rgba(212,175,55,0.1);">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:20px;font-weight:700;color:#d4af37;letter-spacing:4px;text-transform:uppercase;">AXIS</td>
              <td align="right" style="font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:1px;text-transform:uppercase;">Operations</td>
            </tr>
          </table>
        </td></tr>
        <!-- Title -->
        <tr><td style="padding:32px 40px 0;">
          <h1 style="margin:0;font-size:22px;font-weight:600;color:#ededed;line-height:1.4;">${title}</h1>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:20px 40px 32px;">
          ${bodyHtml}
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:24px 40px;border-top:1px solid rgba(212,175,55,0.08);background:rgba(0,0,0,0.3);">
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);line-height:1.6;">
            This is an automated confirmation from Axis Operations.<br>
            Do not reply to this email. For inquiries, contact
            <a href="mailto:operations@axisoperations.ca" style="color:#d4af37;text-decoration:none;">operations@axisoperations.ca</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function diagnosticEmailTemplate(name: string): string {
  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:15px;color:#c8c8c8;line-height:1.7;">
      ${name},
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#c8c8c8;line-height:1.7;">
      Your Axis Strategic Diagnostic has been received and logged into our operations queue.
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#c8c8c8;line-height:1.7;">
      Your responses will be processed through the Axis diagnostic engine for scoring, constraint analysis,
      and pathway recommendation. An internal review will follow to confirm alignment and determine next steps.
    </p>
    <div style="margin:24px 0;padding:20px;background:rgba(212,175,55,0.05);border-left:3px solid #d4af37;border-radius:0 4px 4px 0;">
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1px;font-weight:600;">What happens next</p>
      <p style="margin:8px 0 0;font-size:14px;color:#c8c8c8;line-height:1.6;">
        Our team will review your diagnostic output and respond with direction based on fit, readiness,
        and strategic opportunity typically within 24 48 hours.
      </p>
    </div>`;

  return baseTemplate("Strategic Diagnostic Submission Received", bodyHtml);
}

function contactEmailTemplate(name: string, projectType?: string | null): string {
  const serviceNote = projectType ? `<p style="margin:0 0 16px;font-size:14px;color:rgba(255,255,255,0.4);">Service requested: <span style="color:#d4af37;">${projectType}</span></p>` : "";

  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:15px;color:#c8c8c8;line-height:1.7;">
      ${name},
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#c8c8c8;line-height:1.7;">
      Your project request has been received and a new task has been generated within the
      Axis Operations queue.
    </p>
    ${serviceNote}
    <div style="margin:24px 0;padding:20px;background:rgba(212,175,55,0.05);border-left:3px solid #d4af37;border-radius:0 4px 4px 0;">
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1px;font-weight:600;">What happens next</p>
      <p style="margin:8px 0 0;font-size:14px;color:#c8c8c8;line-height:1.6;">
        Your submission has been reviewed for completeness. A member of the Axis technical team
        will follow up within 24 hours to discuss scope, specifications, and timeline.
      </p>
    </div>`;

  return baseTemplate("Project Inquiry Submission Received", bodyHtml);
}

function deploymentEmailTemplate(name: string, projectType?: string | null): string {
  const serviceNote = projectType ? `<p style="margin:0 0 16px;font-size:14px;color:rgba(255,255,255,0.4);">Category: <span style="color:#d4af37;">${projectType}</span></p>` : "";

  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:15px;color:#c8c8c8;line-height:1.7;">
      ${name},
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#c8c8c8;line-height:1.7;">
      Your deployment request has been received and logged into our operations queue.
    </p>
    ${serviceNote}
    <div style="margin:24px 0;padding:20px;background:rgba(212,175,55,0.05);border-left:3px solid #d4af37;border-radius:0 4px 4px 0;">
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1px;font-weight:600;">What happens next</p>
      <p style="margin:8px 0 0;font-size:14px;color:#c8c8c8;line-height:1.6;">
        Our technical team will review your deployment scope and system requirements. We will contact you shortly regarding approval and deployment timelines.
      </p>
    </div>`;

  return baseTemplate("Deployment Request Received", bodyHtml);
}

function operatorEmailTemplate(name: string): string {
  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:15px;color:#c8c8c8;line-height:1.7;">
      ${name},
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#c8c8c8;line-height:1.7;">
      Your Axis Operator Application has been received.
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#c8c8c8;line-height:1.7;">
      We appreciate your interest in the Axis Studio Operator System. Access is limited and based on experience, active client portfolio, and ability to operate at a professional level.
    </p>
    <div style="margin:24px 0;padding:20px;background:rgba(212,175,55,0.05);border-left:3px solid #d4af37;border-radius:0 4px 4px 0;">
      <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1px;font-weight:600;">What happens next</p>
      <p style="margin:8px 0 0;font-size:14px;color:#c8c8c8;line-height:1.6;">
        Our team will review your application to determine alignment. If approved, you will receive next steps to access the system.
      </p>
    </div>`;

  return baseTemplate("Operator Application Received", bodyHtml);
}

function newsletterEmailTemplate(name: string): string {
  const bodyHtml = `
    <p style="margin:0 0 16px;font-size:15px;color:#c8c8c8;line-height:1.7;">
      ${name || "Operator"},
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#c8c8c8;line-height:1.7;">
      Your subscription to the Axis Intelligence briefing has been confirmed.
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#c8c8c8;line-height:1.7;">
      You will receive strategic intelligence, operational insights, and deployment updates
      directly from the Axis network.
    </p>`;

  return baseTemplate("Intelligence Briefing Subscription Confirmed", bodyHtml);
}

// ─── Send confirmation email ─────────────────────────────────────────────────

export async function sendConfirmationEmail(payload: AutomationPayload): Promise<void> {
  const transporter = getTransporter();
  if (!transporter) {
    console.info("[automation] SMTP not configured skipping email for", payload.type);
    return;
  }

  const to = payload.email;
  if (!to) return;

  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@axisoperations.ca";
  const recipientName = (payload.name as string) || "Operator";

  let subject: string;
  let html: string;

  switch (payload.type) {
    case "diagnostic_application":
      subject = "Axis Strategic Diagnostic Submission Received";
      html = diagnosticEmailTemplate(recipientName);
      break;
    case "contact_submission":
      subject = "Axis Operations Project Inquiry Received";
      html = contactEmailTemplate(recipientName, payload.projectType as string | undefined);
      break;
    case "newsletter_subscription":
      subject = "Axis Intelligence Subscription Confirmed";
      html = newsletterEmailTemplate(recipientName);
      break;
    case "deployment_request":
      subject = "Axis Studio Deployment Request Received";
      html = deploymentEmailTemplate(recipientName, payload.projectType as string | undefined);
      break;
    case "operator_application":
      subject = "Axis Operator Application Received";
      html = operatorEmailTemplate(recipientName);
      break;
    default:
      console.info(`[automation] Unknown type for email ${payload.type}, skipping fallback.`);
      return;
  }

  try {
    await transporter.sendMail({ from, to, subject, html });
    console.info(`[automation] Confirmation email sent to ${to} (${payload.type})`);
  } catch (err) {
    console.warn("[automation] Email send failed:", (err as Error)?.message);
  }
}

// ─── Main dispatch ───────────────────────────────────────────────────────────

export async function dispatchAutomation(payload: AutomationPayload) {
  // Run webhook and email in parallel, never throw
  await Promise.allSettled([
    createClickupTask(payload),
    sendConfirmationEmail(payload),
  ]);
}
