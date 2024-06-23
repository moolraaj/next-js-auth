
import ProductModel from '@/model/productModel'
import { DbConnection } from '@/config/database'
import { NextResponse } from 'next/server'

DbConnection()

export async function GET(req, { params }) {
    try {
        let { id } = params
        let productId = { _id: id }
        let product = await ProductModel.findOne(productId)
        if (!product) {
            return NextResponse.json({ success: false, message: 'product not found' })
        }
        return NextResponse.json({ success: true, product })

    } catch (error) {
        return NextResponse.json({ success: false, message: 'error 404' })

    }

}