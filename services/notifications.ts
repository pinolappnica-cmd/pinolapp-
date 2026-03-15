export async function sendEmail(to: string, subject: string, body: string) {
  // Aquí puedes integrar SendGrid, Nodemailer, etc.
  console.log(`Email enviado a ${to}: ${subject}`);
}

export async function sendSMS(phone: string, message: string) {
  // Aquí puedes integrar Twilio u otro servicio de SMS
  console.log(`SMS enviado a ${phone}: ${message}`);
}

export async function sendPush(userId: number, message: string) {
  // Push notifications (Firebase, OneSignal, etc.)
  console.log(`Push enviado a usuario ${userId}: ${message}`);
}
