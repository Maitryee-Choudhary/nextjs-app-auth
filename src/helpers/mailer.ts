
import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({email, emailType, userId} : any) => {
    try{
        //create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10 );

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now()+3600000,
            });
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now()+3600000,
            });
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "438abd96e5b330",
              pass: "691340cadb6e4e"
            }
          });

          const mailOptions = {
            from : 'maitryee@gmail.com',
            to : email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here </a> 
            to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} <br />  or click here <br /> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
      
        }
       const mailresponse = await transport.sendMail(mailOptions);
       return mailresponse;

    }catch(error:any){
       throw new Error(error.message);
    }
}