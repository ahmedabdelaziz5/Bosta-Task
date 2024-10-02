const nodemailer = require('nodemailer');
const templateManager = require('../helpers/email.template');
const { createResponse } = require('../utils/createResponse');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});;

exports.setUpMails = async (emailType, emailData) => {
  let mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: emailData.email
  };

  if (emailType === "forgetPassword") {
    mailOptions['subject'] = "Reset your Password";
    mailOptions['html'] = templateManager.ForgetPasswordTemplate(emailData.newPassword);
  }

  const result = await sendEmail(mailOptions);
  return result;
};

const sendEmail = async (mailOptions) => {
  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return createResponse(false, "Could not send your email", 400, error);
      }
    })
    return createResponse(true, "Email has been sent successfully !", 200);
  }
  catch (error) {
    return createResponse(false, "Could not send your email", 400, error);
  }
};