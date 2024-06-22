import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
 
 
export async function GetUserdetails(){
    let response= NextResponse.json({success:true})
    let token= response.cookies.get('token').value
 
    let decodetoken= jwt.verify(token,process.env.NEXT_PUBLIC_SECRETKEY)
    return decodetoken.id
}

 
