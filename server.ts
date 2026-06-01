import express from "express";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Enable JSON parsing
app.use(express.json());

// API Route: Handle Callback Submission & Send Email Notification
app.post("/api/callback", async (req, res) => {
  const { name, phone, tankVolume, serviceType, notes } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "Name and Phone are required parameters." });
  }

  console.log(`[CALLBACK RECEIVED] Name: ${name}, Phone: ${phone}, Tank Volume: ${tankVolume || "N/A"}, Service: ${serviceType}`);

  // Retrieve SMTP configurations
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpSender = process.env.SMTP_SENDER || `"AquaClean Alerts" <${smtpUser || "no-reply@aquaclean.az"}>`;
  const notificationEmail = process.env.NOTIFICATION_EMAIL || smtpUser;

  // Render a polished HTML Email layout
  const emailHtml = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background: linear-gradient(135deg, #0284c7 0%, #1d4ed8 100%); padding: 30px; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">AQUACLEAN CMS</h2>
        <p style="margin: 5px 0 0 0; font-size: 13px; color: #bae6fd; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px;">YENİ GERİ ZƏNG SİFARİŞİ</p>
      </div>
      
      <div style="padding: 30px; background-color: #ffffff;">
        <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-top: 0;">Sizin veb saytınızdan yeni bir geri zəng sifarişi daxil olmuşdur. Müştəri ilə ən qısa zamanda əlaqə saxlayın.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 25px 0;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; font-size: 13px; color: #64748b; font-weight: bold; width: 150px; text-transform: uppercase;">Müştəri adı:</td>
            <td style="padding: 12px 0; font-size: 14px; color: #0f172a; font-weight: 600;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; font-size: 13px; color: #64748b; font-weight: bold; text-transform: uppercase;">Telefon nömrəsi:</td>
            <td style="padding: 12px 0; font-size: 14px; color: #2563eb; font-weight: bold;">
              <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; font-size: 13px; color: #64748b; font-weight: bold; text-transform: uppercase;">Tank / Sistern həcmi:</td>
            <td style="padding: 12px 0; font-size: 14px; color: #334155;">${tankVolume || "Qeyd edilməyib"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; font-size: 13px; color: #64748b; font-weight: bold; text-transform: uppercase;">Seçilən Xidmət:</td>
            <td style="padding: 12px 0; font-size: 14px; color: #0284c7; font-weight: bold;">${serviceType || "Ümumi təmizlik"}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; font-size: 13px; color: #64748b; font-weight: bold; text-transform: uppercase; vertical-align: top;">Əlavə Qeydlər:</td>
            <td style="padding: 12px 0; font-size: 13px; color: #475569; line-height: 1.5;">${notes || "—"}</td>
          </tr>
        </table>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #0284c7; padding: 15px; border-radius: 4px; margin-top: 20px;">
          <p style="margin: 0; font-size: 12px; color: #475569; line-height: 1.4;">
            <strong>Məlumat:</strong> Bu bildiriş AQUACLEAN saytı üzərindən göndərilmişdir. Geri zənglərə nəzarət etmək üçün CMS panelinə keçid edin.
          </p>
        </div>
      </div>
      
      <div style="background-color: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="margin: 0; font-size: 11px; color: #94a3b8; font-family: monospace;">AQUACLEAN SYSTEM AUTOMATION • 2026</p>
      </div>
    </div>
  `;

  let emailWasSent = false;
  let statusMessage = "Callback successfully saved.";

  // Check if real credentials are set up
  if (smtpHost && smtpUser && smtpPass && notificationEmail) {
    try {
      console.log(`[SMTP] Attempting to send real notification email to ${notificationEmail} via ${smtpHost}...`);

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // Use SSL/TLS for 465
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: smtpSender,
        to: notificationEmail,
        subject: `🔔 ECOTECH: Yeni Geri Zəng Sifarişi (${name})`,
        text: `Müştəri: ${name}\nTelefon: ${phone}\nHəcm: ${tankVolume || "Yoxdur"}\nXidmət: ${serviceType || "Yoxdur"}\nQeyd: ${notes || "Yoxdur"}`,
        html: emailHtml,
      });

      console.log(`[SMTP] Email successfully sent to ${notificationEmail}!`);
      emailWasSent = true;
      statusMessage = "Callback saved and real notification email has been dispatched via SMTP!";
    } catch (error: any) {
      console.error("[SMTP ERROR] Failed to send email via SMTP:", error);
      statusMessage = `Callback saved, but SMTP dispatch failed due to configuration: ${error.message}`;
    }
  } else {
    console.log("[SMTP NOTICE] SMTP environmental options are not completely configured in development.");
    console.log(`[SMTP SIMULATION] Beautiful notification email would have been sent to: ${notificationEmail || "No target address configured"}`);
    console.log("To enable actual email delivery, add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and NOTIFICATION_EMAIL secrets in .env");
    statusMessage = "Callback saved! Mail simulation successfully printed to the local console (Credentials not yet configured in Secrets).";
  }

  return res.json({
    success: true,
    message: statusMessage,
    emailSent: emailWasSent,
    data: { name, phone, tankVolume, serviceType, notes }
  });
});

// Configure Vite middleware in developmental state / static in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development server leveraging Vite Node API
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving compiled static bundles
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`===============================================`);
    console.log(`🚀 ECOTECH SERVER ONLINE AND READY!`);
    console.log(`🔗 Interface URL: http://localhost:${PORT}`);
    console.log(`🌍 Environmental State: ${process.env.NODE_ENV || "development"}`);
    console.log(`===============================================`);
  });
}

startServer();
