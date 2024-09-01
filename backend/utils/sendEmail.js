const nodeMailer = require("nodemailer");

const SMPT_HOST=process.env.SMPT_HOST || "smtp.gmail.com"
const SMPT_MAIL=process.env.SMPT_MAIL || "manishiitguwahati01@gmail.com"
const SMPT_PASSWORD = process.env.SMPT_PASSWORD || "lgcramsxtqsqkdjh";
const SMPT_PORT = process.env.SMPT_PORT || 465;
const SMPT_SERVICE = process.env.SMPT_SERVICE || "gmail";

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: SMPT_HOST,
    port: SMPT_PORT,
    service: SMPT_SERVICE,
    auth: {
      user: SMPT_MAIL,
      pass: SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

// console.log(process.env.SMPT_HOST)
// console.log(process.env.SMPT_PORT)
// console.log(process.env.SMPT_SERVICE)
// console.log(process.env.SMPT_MAIL)
// console.log(process.env.SMPT_PASSWORD)

module.exports = sendEmail;