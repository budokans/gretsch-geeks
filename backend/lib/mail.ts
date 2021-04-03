import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

function makeNiceEmail(text: string) {
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
