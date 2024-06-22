
import { NextResponse } from "next/server"
import { DbConnection } from "@/config/database"
 

DbConnection()

export async function GET(){
    try {
        
        let response=NextResponse.json({message:'user logged out',success:true})
        response.cookies.set('token','',{
            httpOnly:true,
            expires:new Date(0)
        })
        return response
    } catch (error) {
        return NextResponse.json({message:'you cant logou no user found',success:false})
    }
}