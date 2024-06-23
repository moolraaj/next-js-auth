'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

function AddProductPage() {
    let router = useRouter()
    const [product, setProduct] = useState({
        name: '',
        price: '',
        company: '',
        category: '',
        brand: ''
    });

    const [errors, setErrors] = useState({});

    const getUserValues = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateFields = () => {
        const { name, price, company, category, brand } = product;
        let valid = true;
        let errorFields = {};

        if (!name) {
            valid = false;
            errorFields.name = 'name is required';
        }
        if (!price) {
            valid = false;
            errorFields.price = 'price is required';
        }
        if (!company) {
            valid = false;
            errorFields.company = 'compnay is required';
        }
        if (!category) {
            valid = false;
            errorFields.category = 'category is required';
        }
        if (!brand) {
            valid = false;
            errorFields.brand = 'brand is required';
        }

        setErrors(errorFields);
        return valid;
    };

    const submitUserDetails = async () => {
        if (validateFields()) {
            try {
                let resp = await fetch('/api/products/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(product)
                });

                resp = await resp.json()
                console.log(resp)
                if (resp) {
                    toast.success(resp.message)
                    router.push(`/products`)
                }
                setProduct({
                    name: '',
                    price: '',
                    company: '',
                    category: '',
                    brand: ''
                })


            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (

        <div className="add_outer">
            <div className="outer_inner">
                <div className="sign_up_wrapper">
                    <div className="input_wrapper">
                        <label htmlFor="username">product name</label>
                        <input type="text" name="name" value={product.name} onChange={getUserValues} />
                        {errors.name && <span>{errors.name}</span>}
                    </div>

                    <div className="input_wrapper">
                        <label htmlFor="email">product price</label>
                        <input type="number" name="price" value={product.price} onChange={getUserValues} />
                        {errors.price && <span>{errors.price}</span>}
                    </div>

                    <div className="input_wrapper">
                        <label htmlFor="password">product company </label>
                        <input type="text" name="company" value={product.company} onChange={getUserValues} />
                        {errors.company && <span>{errors.company}</span>}
                    </div>
                    <div className="input_wrapper">
                        <label htmlFor="password">product category</label>
                        <input type="text" name="category" value={product.category} onChange={getUserValues} />
                        {errors.category && <span>{errors.category}</span>}
                    </div>
                    <div className="input_wrapper">
                        <label htmlFor="password">product brand</label>
                        <input type="text" name="brand" value={product.brand} onChange={getUserValues} />
                        {errors.brand && <span>{errors.brand}</span>}
                    </div>

                    <div className="button_wrapper">
                        <button onClick={submitUserDetails}>add product</button>

                    </div>

                </div>
            </div>
        </div>


    );
}

export default AddProductPage;
