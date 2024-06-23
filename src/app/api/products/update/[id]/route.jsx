import ProductModel from '@/model/productModel';
import { DbConnection } from '@/config/database';
import { NextResponse } from 'next/server';

DbConnection();

export async function PUT(req, { params }) {
    try {
        const { id } = params;

        const productId = { _id: id };
        const payload = await req.json();
        const product = await ProductModel.updateOne(productId, { $set: payload });

        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' });
        }
        return NextResponse.json({ success: true, message: 'Product updated successfully ', product });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'An error occurred', error: error.message });
    }
}
