import { DbConnection } from "@/config/database";
import UserModel from "@/model/usermodel";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
 
DbConnection();

export async function GET(request) {
    try {
        
        let token=request.cookies.get('token').value || ''
    
        if(!token){
            return NextResponse.json({success:false , message:'no token found'})
        }
    
        
    
        let decodedToken=jwt.verify(token,process.env.NEXT_PUBLIC_SECRET_KEY)
        let userId=decodedToken.id
    
        let user=await UserModel.findOne({_id:userId}).select('-password')
        if(!user){
            return NextResponse.json({success:false , message:'no user found'})
        }
    
        return NextResponse.json({success:true,user})
    } catch (error) {
        return NextResponse.json({success:false,message:'internal server error '})
    }


}
