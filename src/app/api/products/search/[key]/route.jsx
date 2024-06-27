import ProductModel from '@/model/productModel'
import { DbConnection } from '@/config/database'
import { NextResponse } from 'next/server'

DbConnection()

export async function GET(req,{params}){
    try {
        let {key}=params
        console.log(key)
        let searchKey=key
        console.log(searchKey)
        let product=await ProductModel.find({
            "$or":[
                { name: { $regex: new RegExp(searchKey, 'i') } }
            ]
        })
        console.log(product)
        return NextResponse.json({success:true,product})
    } catch (error) {
        return NextResponse.json({success:false,message:'error 404'})

    }

}