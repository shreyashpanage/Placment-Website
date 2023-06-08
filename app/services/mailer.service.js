const Student = require("../models/user.model");
const nodemailer = require("nodemailer");

const templateService = require("../services/template.service");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kkmkittu36@gmail.com",
    pass: "bnbjnjstvzughktd",
  },
});

async function sendDM(user, mailType) {
  try {
    console.log("Calling Mailer service with payload ", JSON.stringify(user));
    const opts = templateService.getEmailOpts(user, mailType);
    const data = await transporter.sendMail(opts);
    return { success: true, message: "Email sent.", data: data };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Email service not working.",
      error: err,
    };
  }
}

async function sendDMWithSubject(user, mailType, subject, content) {
  try {
    console.log("Calling Mailer service with payload ", JSON.stringify(user));
    console.log(user);
    // user = JSON.stringify(user);
    const email = user.email;
    console.log("email--->", email);
    const trimmedEmail = email.split("@")[0];

    console.log(trimmedEmail);

    const userName = await Student.findOne({ college_id: trimmedEmail }).select(
      "student_name"
    );
    const emailData = {
      recipient: user.email,
      name: userName.student_name,
      subject: subject,
      content: content,
    };
    console.log("user-->data", emailData);
    const opts = templateService.getEmailOpts(emailData, mailType);
    const data = await transporter.sendMail(opts);
    return { success: true, message: "Email sent.", data: data };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "Email service not working.",
      error: err,
    };
  }
}

async function sendBulkEmails(recipients, subject, content) {
  for (const recipient of recipients) {
    const user = { email: recipient };
    console.log(user, "subject-->", subject);
    const mailType = "notification"; // Adjust the mail type as needed
    const result = await sendDMWithSubject(user, mailType, subject, content);
    console.log(`Email sent to ${recipient}`);
  }
}

module.exports = { sendBulkEmails, sendDM };
