const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,      // bv. smtp.elasticemail.com
      port: process.env.SMTP_PORT,      // bv. 587
      secure: false,                     // TLS
      auth: {
        user: process.env.SMTP_USER,    // je e-mail
        pass: process.env.SMTP_PASS     // SMTP wachtwoord of App Password
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      text: message
    });

    res.json({ status: "success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
