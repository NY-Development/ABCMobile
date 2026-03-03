import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
	const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SENDER_EMAIL } = process.env;

	if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SENDER_EMAIL) {
		throw new Error("Missing SMTP configuration in environment variables");
	}

	const parsedPort = Number(SMTP_PORT);
	if (!Number.isFinite(parsedPort)) {
		throw new Error("SMTP_PORT must be a valid number");
	}

	const transporter = nodemailer.createTransport({
		host: SMTP_HOST,
		port: parsedPort,
		secure: parsedPort === 587,
		auth: {
			user: SMTP_USER,
			pass: SMTP_PASS,
		},
	});

	const info = await transporter.sendMail({
		from: `"Your App" <${SENDER_EMAIL}>`,
		to,
		subject,
		html: `
			<div style="max-width: 600px; margin: 20px auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); font-family: 'Inter', Arial, sans-serif; border: 1px solid #e5e7eb;">
				<div style="background-color: #4f46e5; padding: 30px 20px; text-align: center;">
					<h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
						Welcome to Your App!
					</h1>
				</div>

				<div style="padding: 30px 40px; background-color: #ffffff;">
					<p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 20px;">
						${text}
					</p>
				</div>

				<div style="padding: 20px 40px; background-color: #f3f4f6; text-align: center; border-top: 1px solid #e5e7eb;">
					<p style="font-size: 14px; color: #4b5563; margin: 5px 0; font-weight: 600;">
						Thank you for using our service!
					</p>
					<p style="font-size: 12px; color: #9ca3af; margin: 5px 0;">
						&copy; ${new Date().getFullYear()} Your App. All rights reserved.
					</p>
				</div>
			</div>
		`,
	});

	console.log("Email sent:", info.messageId);
	return info;
};
