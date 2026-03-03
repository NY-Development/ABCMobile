import nodemailer from "nodemailer";
import { fileURLToPath } from "url";

const iconPath = fileURLToPath(new URL("../assets/icon.png", import.meta.url));

const toHtmlSafe = (value = "") =>
	String(value)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\"/g, "&quot;")
		.replace(/'/g, "&#039;")
		.replace(/\n/g, "<br />");

export const sendEmail = async (to, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		const safeSubject = toHtmlSafe(subject);
		const safeText = toHtmlSafe(text);

		const info = await transporter.sendMail({
			from: `"ABC Mobile" <${process.env.SENDER_EMAIL}>`,
			to,
			subject,
			attachments: [
				{
					filename: "icon.png",
					path: iconPath,
					cid: "abc-app-icon",
				},
			],
			html: `
				<div style="background:#f8fafc;padding:24px 12px;font-family:Inter,Arial,sans-serif;">
					<div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(15,23,42,0.08);">
						<div style="background:linear-gradient(135deg,#1d4ed8,#2563eb);padding:20px 24px;">
							<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
								<tr>
									<td style="width:52px;vertical-align:middle;">
										<img src="cid:abc-app-icon" alt="ABC Mobile" width="44" height="44" style="display:block;border-radius:10px;background:#ffffff;padding:4px;" />
									</td>
									<td style="vertical-align:middle;padding-left:10px;">
										<div style="font-size:20px;line-height:1.2;font-weight:800;color:#ffffff;">ABC Mobile</div>
										<div style="font-size:12px;color:#dbeafe;">System Notification</div>
									</td>
								</tr>
							</table>
						</div>

						<div style="padding:24px;">
							<h2 style="margin:0 0 8px 0;font-size:20px;line-height:1.3;color:#0f172a;">${safeSubject}</h2>
							<div style="height:3px;width:56px;background:#f59e0b;border-radius:9999px;margin:12px 0 18px;"></div>
							<div style="font-size:15px;line-height:1.7;color:#334155;">${safeText}</div>
						</div>

						<div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:16px 24px;">
							<div style="font-size:12px;color:#64748b;">This is an automated message from ABC Mobile.</div>
							<div style="font-size:12px;color:#94a3b8;margin-top:4px;">© ${new Date().getFullYear()} ABC Mobile. All rights reserved.</div>
						</div>
					</div>
				</div>
			`,
		});

		console.log("Email sent: %s", info.messageId);
	} catch (error) {
		console.error("Error sending email:", error);
	}
};
