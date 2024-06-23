
import ProductModel from '@/model/productModel'
import { DbConnection } from '@/config/database'
import { NextResponse } from 'next/server'

DbConnection()

export async function POST(req){
    try {
        
        let payload=await req.json()
        let {name,price,company,category,brand}=payload
        let product=new ProductModel({name,price,company,category,brand})
        await product.save()
        return NextResponse.json({success:true,message:'product saved',product})
    } catch (error) {
        return NextResponse.json({success:false,message:'error 404'})

    }

}