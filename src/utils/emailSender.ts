import * as nodemailer from 'nodemailer';
import  {google , gmail_v1} from 'googleapis'
import * as htmlToText from 'html-to-text'
const OAuth2 = google.auth.OAuth2;

export const send = async (to, from, subject, html) => {
  const myOAuth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    )

    myOAuth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
      });
      const myAccessToken = await myOAuth2Client.getAccessToken()

      
  let transporter = nodemailer.createTransport({
    
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      type: 'OAuth2',
      user: process.env.FROM_EMAIL,
      accessToken: myAccessToken.token,
  },
  });
  transporter.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  const text = htmlToText.htmlToText(html)
  
  let info = await transporter.sendMail(
    {
      from,
      to  ,
      subject,
      text,
    },
    (err, info) => {
      if (err) {
        console.log(err);
      }

      console.log(info)
    },
  );
  
};
