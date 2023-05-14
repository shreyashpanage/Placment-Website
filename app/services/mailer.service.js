const nodemailer = require("nodemailer");
const templateService = require("../services/template.service");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kkmkittu36@gmail.com",
    pass: "bwypowrjvaszxqdv",
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
    console.log("user-->email", user.email);
    const opts = templateService.getEmailOpts(user, mailType);
    opts.subject = subject; // Set the subject from the frontend input
    opts.html = content; // Set the content from the frontend input
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
