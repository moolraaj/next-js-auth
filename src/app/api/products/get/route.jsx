
import ProductModel from '@/model/productModel'
import { DbConnection } from '@/config/database'
import { NextResponse } from 'next/server'

DbConnection()

export async function GET(req){
    try {
        let product=await ProductModel.find()
        return NextResponse.json({success:true,product})
    } catch (error) {
        return NextResponse.json({success:false,message:'error 404'})

    }

}