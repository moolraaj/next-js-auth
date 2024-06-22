import UserModel from "@/model/usermodel";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { DbConnection } from "@/config/database";
import { SendEmail } from "@/helpers/mailer";

DbConnection();

export async function POST(request) {
    try {
        let payload = await request.json();
        let { username, email, password } = payload;

        let user = await UserModel.findOne({ email });
        if (user) {
            return NextResponse.json({ message: 'User already exists' });
        }

        let salt = await bcryptjs.genSalt(10);
        let hashedPassword = await bcryptjs.hash(password, salt);

        let userToSave = new UserModel({
            username,
            email,
            password: hashedPassword
        });
        
        await userToSave.save();
        console.log('User saved:', userToSave);

        await SendEmail({ email, emailType: 'VERIFY', userId: userToSave._id });

        return NextResponse.json({ message: 'User registered successfully', user: userToSave });
    } catch (error) {
        console.error('Error in user registration:', error);
        return NextResponse.json({ message: 'User registration failed', success: false });
    }
}
