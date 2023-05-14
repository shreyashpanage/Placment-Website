const mailerService = require("../services/mailer.service");

exports.sendBulkEmails = async (req, res) => {
  const { recipients, subject, content } = req.body;

  try {
    await mailerService.sendBulkEmails(recipients, subject, content);
    res.status(200).json({ success: true, message: "Bulk emails sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error sending bulk emails", error: error.message });
  }
};
