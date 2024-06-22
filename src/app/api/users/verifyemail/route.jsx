import UserModel from "@/model/usermodel";
import { NextResponse } from "next/server";
import { DbConnection } from "@/config/database";

DbConnection();

export async function POST(request) {
    try {
        let payload = await request.json();
        let { token } = payload;

        let user = await UserModel.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ success: false, message: 'Invalid or expired token' });
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ success: true, message: 'User verified successfully' });
    } catch (error) {
        console.error('Error in user verification:', error);
        return NextResponse.json({ success: false, message: 'User verification failed' });
    }
}
