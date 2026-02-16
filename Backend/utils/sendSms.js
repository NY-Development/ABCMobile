import twilio from "twilio";

export const sendSms = async (to, message) => {
  const sid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (!sid || !authToken || !from) {
    throw new Error("Twilio env variables are missing!");
  }

  const client = twilio(sid, authToken);

  try {
    await client.messages.create({
      body: message,
      from,
      to,
    });
    console.log(`SMS sent to ${to}`);
  } catch (err) {
    console.error("Error sending SMS:", err);
  }
};
