import * as nodemailer from 'nodemailer';

export const send = async (to, from, subject, html) => {
  // let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    name: 'Gestion-PFE',
    service: 'gmail',
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  let info = await transporter.sendMail(
    {
      from,
      to  ,
      subject,
      html,
    },
    (err, info) => {
      if (err) {
        console.log(err);
      }

      console.log(info)
    },
  );
  
};
