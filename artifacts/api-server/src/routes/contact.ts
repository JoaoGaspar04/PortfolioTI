import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body as { name?: string; email?: string; message?: string };

  if (!name || !email || !message) {
    res.status(400).json({ error: "Missing required fields." });
    return;
  }

  const smtpHost = process.env["SMTP_HOST"] || "ssl0.ovh.net";
  const smtpPort = Number(process.env["SMTP_PORT"] || "465");
  const smtpUser = process.env["SMTP_USER"];
  const smtpPass = process.env["SMTP_PASS"];
  const contactTo = process.env["CONTACT_TO"] || smtpUser;

  if (!smtpUser || !smtpPass) {
    console.error("SMTP_USER or SMTP_PASS not configured.");
    res.status(500).json({ error: "Email service not configured." });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"Portfólio João Gaspar" <${smtpUser}>`,
      to: contactTo,
      replyTo: email,
      subject: `Nova mensagem do portfólio — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#0f172a;color:#e2e8f0;border-radius:12px;overflow:hidden;border:1px solid #1e293b;">
          <div style="background:linear-gradient(135deg,#14b8a6,#8b5cf6);padding:24px 32px;">
            <h2 style="margin:0;color:#fff;font-size:22px;font-weight:700;">Nova mensagem do portfólio</h2>
            <p style="margin:6px 0 0;color:rgba(255,255,255,0.75);font-size:14px;">joaocgaspar.ovh</p>
          </div>
          <div style="padding:32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #1e293b;vertical-align:top;width:90px;">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.08em;font-weight:600;">Nome</span>
                </td>
                <td style="padding:12px 0;border-bottom:1px solid #1e293b;">
                  <span style="font-size:16px;font-weight:600;color:#f1f5f9;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #1e293b;vertical-align:top;">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.08em;font-weight:600;">Email</span>
                </td>
                <td style="padding:12px 0;border-bottom:1px solid #1e293b;">
                  <a href="mailto:${email}" style="color:#14b8a6;text-decoration:none;font-size:14px;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 0 0;vertical-align:top;">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:.08em;font-weight:600;">Mensagem</span>
                </td>
                <td style="padding:16px 0 0;">
                  <div style="background:#1e293b;border-radius:8px;padding:16px;border-left:3px solid #14b8a6;">
                    <p style="margin:0;line-height:1.75;color:#cbd5e1;white-space:pre-wrap;font-size:14px;">${message}</p>
                  </div>
                </td>
              </tr>
            </table>

            <div style="margin-top:32px;padding-top:16px;border-top:1px solid #1e293b;display:flex;justify-content:space-between;align-items:center;">
              <p style="margin:0;font-size:12px;color:#475569;">
                Enviado via portfólio de <strong style="color:#94a3b8;">João Gaspar</strong>
              </p>
              <a href="https://www.linkedin.com/in/joacgaspar/" style="font-size:12px;color:#14b8a6;text-decoration:none;">LinkedIn →</a>
            </div>
          </div>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

export default router;
