import mongoose from 'mongoose'

let productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    company: {
        type: String,
        required: [true,'company is required']
    },
    category: {
        type: String,
        required: [true,'category is required']
    },
    brand: {
        type: String,
        required: [true,'brand is required']
    },
    
 


})

let ProductModel = mongoose.models.products || mongoose.model('products', productSchema)

export default ProductModel