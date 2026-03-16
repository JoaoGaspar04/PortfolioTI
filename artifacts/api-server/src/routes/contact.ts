import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body as { name?: string; email?: string; message?: string };

  if (!name || !email || !message) {
    res.status(400).json({ error: "Missing required fields." });
    return;
  }

  const smtpUser = process.env["SMTP_USER"];
  const smtpPass = process.env["SMTP_PASS"];
  const contactTo = process.env["CONTACT_TO"] || smtpUser;

  if (!smtpUser || !smtpPass) {
    console.error("SMTP_USER or SMTP_PASS environment variables are not set.");
    res.status(500).json({ error: "Email service not configured." });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"Portfólio - ${name}" <${smtpUser}>`,
      to: contactTo,
      replyTo: email,
      subject: `Nova mensagem do portfólio — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#0f172a;color:#e2e8f0;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#14b8a6,#8b5cf6);padding:24px 32px;">
            <h2 style="margin:0;color:#fff;font-size:22px;">Nova mensagem do portfólio</h2>
          </div>
          <div style="padding:32px;">
            <p style="margin:0 0 8px;font-size:13px;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">De</p>
            <p style="margin:0 0 24px;font-size:18px;font-weight:600;color:#f1f5f9;">${name}</p>

            <p style="margin:0 0 8px;font-size:13px;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">Email</p>
            <p style="margin:0 0 24px;"><a href="mailto:${email}" style="color:#14b8a6;text-decoration:none;">${email}</a></p>

            <p style="margin:0 0 8px;font-size:13px;color:#94a3b8;text-transform:uppercase;letter-spacing:.05em;">Mensagem</p>
            <div style="background:#1e293b;border-radius:8px;padding:16px;border-left:3px solid #14b8a6;">
              <p style="margin:0;line-height:1.7;white-space:pre-wrap;">${message}</p>
            </div>

            <p style="margin:32px 0 0;font-size:12px;color:#475569;border-top:1px solid #1e293b;padding-top:16px;">
              Enviado através do portfólio de João Gaspar • <a href="https://www.linkedin.com/in/joacgaspar/" style="color:#14b8a6;">LinkedIn</a>
            </p>
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
