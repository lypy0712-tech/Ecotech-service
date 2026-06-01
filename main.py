import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel, Field

app = FastAPI(
    title="ECOTECH CMS Backend",
    description="FastAPI Backend for Ecotech Services CMS",
    version="2.4"
)


origins = [
    "http://localhost:3000"
]

# Configure CORSMiddleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom validation exception handler matching TS API error format
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=400,
        content={"error": "Name and Phone are required parameters."},
    )

class CallbackRequest(BaseModel):
    name: str = Field(..., min_length=1)
    phone: str = Field(..., min_length=1)
    tankVolume: Optional[str] = None
    serviceType: Optional[str] = None
    notes: Optional[str] = None

@app.post("/api/callback")
async def handle_callback(payload: CallbackRequest):
    name = payload.name
    phone = payload.phone
    tank_volume = payload.tankVolume
    service_type = payload.serviceType
    notes = payload.notes

    print(f"[CALLBACK RECEIVED] Name: {name}, Phone: {phone}, Tank Volume: {tank_volume or 'N/A'}, Service: {service_type}")

    # Retrieve SMTP configurations from ENVIRONMENT
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port_str = os.getenv("SMTP_PORT", "587")
    try:
        smtp_port = int(smtp_port_str)
    except ValueError:
        smtp_port = 587
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    smtp_sender = os.getenv("SMTP_SENDER", f'"AquaClean Alerts" <{smtp_user or "no-reply@aquaclean.az"}>')
    notification_email = os.getenv("NOTIFICATION_EMAIL", smtp_user)

    # HTML Email template mirroring original TypeScript server layout
    email_html = f"""
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background: linear-gradient(135deg, #0284c7 0%, #1d4ed8 100%); padding: 30px; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">ECOTECH CMS</h2>
        <p style="margin: 5px 0 0 0; font-size: 13px; color: #bae6fd; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px;">YENİ GERİ ZƏNG SİFARİŞİ</p>
      </div>
      
      <div style="padding: 30px; background-color: #ffffff;">
        <p style="font-size: 15px; color: #334155; line-height: 1.6; margin-top: 0;">Sizin veb saytınızdan yeni bir geri zəng sifarişi daxil olmuşdur. Müştəri ilə ən qısa zamanda əlaqə saxlayın.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 25px 0;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; font-size: 13px; color: #64748b; font-weight: bold; width: 150px; text-transform: uppercase;">Müştəri adı:</td>
            <td style="padding: 12px 0; font-size: 14px; color: #0f172a; font-weight: 600;">{name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; font-size: 13px; color: #64748b; font-weight: bold; text-transform: uppercase;">Telefon nömrəsi:</td>
            <td style="padding: 12px 0; font-size: 14px; color: #2563eb; font-weight: bold;">
              <a href="tel:{phone}" style="color: #2563eb; text-decoration: none;">{phone}</a>
            </td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; font-size: 13px; color: #64748b; font-weight: bold; text-transform: uppercase;">Tank / Sistern həcmi:</td>
            <td style="padding: 12px 0; font-size: 14px; color: #334155;">{tank_volume or "Qeyd edilməyib"}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px 0; font-size: 13px; color: #64748b; font-weight: bold; text-transform: uppercase;">Seçilən Xidmət:</td>
            <td style="padding: 12px 0; font-size: 14px; color: #0284c7; font-weight: bold;">{service_type or "Ümumi təmizlik"}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; font-size: 13px; color: #64748b; font-weight: bold; text-transform: uppercase; vertical-align: top;">Əlavə Qeydlər:</td>
            <td style="padding: 12px 0; font-size: 13px; color: #475569; line-height: 1.5;">{notes or "—"}</td>
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
    """

    email_was_sent = False
    status_message = "Callback successfully saved."

    if smtp_host and smtp_user and smtp_pass and notification_email:
        try:
            print(f"[SMTP] Attempting to send real notification email to {notification_email} via {smtp_host}...")
            
            # Setup MIME message structure
            msg = MIMEMultipart("alternative")
            msg["Subject"] = f"🔔 AQUACLEAN: Yeni Geri Zəng Sifarişi ({name})"
            msg["From"] = smtp_sender
            msg["To"] = notification_email

            # Setup fallback string format
            text_body = f"Müştəri: {name}\nTelefon: {phone}\nHəcm: {tank_volume or 'Yoxdur'}\nXidmət: {service_type or 'Yoxdur'}\nQeyd: {notes or 'Yoxdur'}"
            msg.attach(MIMEText(text_body, "plain", "utf-8"))
            msg.attach(MIMEText(email_html, "html", "utf-8"))

            # Server connections
            secure_ssl = (smtp_port == 465)
            if secure_ssl:
                server = smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=10)
            else:
                server = smtplib.SMTP(smtp_host, smtp_port, timeout=10)
                server.ehlo()
                server.starttls()
                server.ehlo()

            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_sender, [notification_email], msg.as_string())
            server.quit()

            print(f"[SMTP] Email successfully sent to {notification_email}!")
            email_was_sent = True
            status_message = "Callback saved and real notification email has been dispatched via SMTP!"
        except Exception as e:
            print(f"[SMTP ERROR] Failed to send email via SMTP: {str(e)}")
            status_message = f"Callback saved, but SMTP dispatch failed due to configuration: {str(e)}"
    else:
        print("[SMTP NOTICE] SMTP environmental options are not completely configured in development.")
        print(f"[SMTP SIMULATION] Beautiful notification email would have been sent to: {notification_email or 'No target address configured'}")
        print("To enable actual email delivery, add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and NOTIFICATION_EMAIL secrets in .env")
        status_message = "Callback saved! Mail simulation successfully printed to the local console (Credentials not yet configured in Secrets)."

    return {
        "success": True,
        "message": status_message,
        "emailSent": email_was_sent,
        "data": {
            "name": name,
            "phone": phone,
            "tankVolume": tank_volume,
            "serviceType": service_type,
            "notes": notes
        }
    }

# SPA production support serving compiled dist static directory
dist_dir = os.path.join(os.getcwd(), "dist")
if os.path.exists(dist_dir):
    app.mount("/", StaticFiles(directory=dist_dir, html=True), name="static")

    # Serve index.html as fallback for any frontend routes (SPA support)
    @app.exception_handler(status.HTTP_404_NOT_FOUND)
    async def spa_404_fallback(request: Request, exc: HTTPException):
        # Exclude API routes from index.html redirection
        if not request.url.path.startswith("/api"):
            index_path = os.path.join(dist_dir, "index.html")
            if os.path.exists(index_path):
                return FileResponse(index_path)
        return JSONResponse(status_code=404, content={"detail": "Not Found"})
