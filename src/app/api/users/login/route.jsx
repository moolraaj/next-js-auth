import UserModel from "@/model/usermodel"
import { NextResponse } from "next/server"
import bcryptjs from 'bcryptjs'
import { DbConnection } from "@/config/database"
import jwt from 'jsonwebtoken'


DbConnection()

export async function POST(req) {
     try {
        let payload = await req.json()
        let { email, password } = payload

        let user = await UserModel.findOne({ email })
        if (!user) {
            return NextResponse.json({ success: false, message: 'user not found' })
        }
        let verifyPassword = await bcryptjs.compare(password, user.password)
        if (!verifyPassword) {
            return NextResponse.json({ success: false, message: 'user not found' })
        }

        let userOptions = {
            id: user._id
        }
        let token = jwt.sign(userOptions ,process.env.NEXT_PUBLIC_SECRET_KEY , { expiresIn: '1h' })

        let response = NextResponse.json({

            success: true,
            message: 'user logged in successfully',
            token
        })
        response.cookies.set('token', token, {
            httpOnly: true
        })
        return response
    } catch (error) {
        return NextResponse.json({ success: false, message: 'user not found' })
    }

}