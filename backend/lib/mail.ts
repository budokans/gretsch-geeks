import { createTransport, getTestMessageUrl } from 'nodemailer';

const transporter = createTransport({
  port: Number(process.env.MAIL_PORT),
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeNiceEmail(text: string): string {
  return `
    <div style="
      border: 1px solid black; 
      padding: 20px; 
      font-family: sans-serif; 
      line-height: 1.6; 
      font-size: 20px;
    ">
      <h2>Hello!</h2>
      <p>${text}</p>
      <p>Cheers, Steven Webster</p>
    </div>
  `;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info = await transporter.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Your password reset token',
    html: makeNiceEmail(`Your password reset token is here!
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}"/>Click here to reset your password.</a>
    `),
  });

  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`💌 Message sent! Preview at ${getTestMessageUrl(info)}`);
  }
}
