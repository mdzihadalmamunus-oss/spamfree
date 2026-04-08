const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json());

app.post("/send", async (req, res) => {
  const { email, pass, target, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: pass
      }
    });

    await transporter.sendMail({
      from: email,
      to: target,
      subject: "Message",
      text: message
    });

    res.send({ success: true });
  } catch (err) {
    res.send({ success: false, error: err.toString() });
  }
});

app.listen(3000, () => console.log("Server running"));
