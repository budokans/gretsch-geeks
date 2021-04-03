import { createTransport } from 'nodemailer';

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
