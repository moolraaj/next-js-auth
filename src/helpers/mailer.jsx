import UserModel from '@/model/usermodel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
export const SendEmail = async ({ email, emailType, userId }) => {
     

    try {

        let hashedToken = await bcryptjs.hash(userId.toString(), 12)

        if (emailType === 'VERIFY') {
            await UserModel.findByIdAndUpdate(userId, {$set:{
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            }})
        } else if (emailType === 'RESET') {
            await UserModel.findByIdAndUpdate(userId, {
                $set:{forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000}
            })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port:2525,
            auth: {
                user: "f6e796ce1cd115",
                pass: "34f3327405bd2c" 
            }
        });

        const mailOptions = {
            from: "raaj73906@gmail.com",
            to: email,
            subject: emailType === 'VERIFY' ? 'verify your email' : 'reset your password',
            html: `<p>click <a href=${process.env.NEXT_PUBLIC_PORT}/verifyemail?token=${hashedToken}>click</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'} or copy you link to the browser <br/>
            ${process.env.NEXT_PUBLIC_PORT}/verifyemail?token=${hashedToken}
            </p>`,
        }

        let mailresponse = await transporter.sendMail(mailOptions)
        console.log('mail sent successfully')
        return mailresponse
    } catch (error) {
        console.log('error mail not sent' + error)
    }

}