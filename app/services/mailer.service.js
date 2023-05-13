let nodemailer = require('nodemailer');
const templateService = require('../services/template.service');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "kkmkittu36@gmail.com",
        pass: "bwypowrjvaszxqdv"
    }
});

async function sendDM(user, mailType) {

    try {
        console.log('Calling Mailer service with payload ', JSON.stringify(user));

        const opts = templateService.getEmailOpts(user, mailType);

        const data = await transporter.sendMail(opts);

        return { success : true, message : 'Email sent.', data : data }
    }
    catch (err) {
        console.log(err);
        return { success : false, message : 'Email service not working.' , error : err}
    }
}

exports.sendDM = sendDM;
