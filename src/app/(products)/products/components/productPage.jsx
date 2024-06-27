'use client';
import Link from 'next/link';
 import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'sonner'
function ProductPage() {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');

    const loadAllProducts = async () => {
        setLoading(true);
        const resp = await fetch('/api/products/get', { cache: 'no-store' });
        const data = await resp.json();
        setResult(data.product);
        setLoading(false);
    };

    const deleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const resp = await fetch(`/api/products/delete/${id}`, {
                method: 'DELETE'
            });
            const data = await resp.json();
            if (data.success) {
                toast.success(data.message);
                loadAllProducts();
            } 
        }
    };

    const searchProducts = async (searchTerm) => {
        if (searchTerm) {
            const resp = await fetch(`/api/products/search/${searchTerm}`, { cache: 'no-store' });
            const data = await resp.json();
            setResult(data.product);  
        } else {
            loadAllProducts();
        }
    };

    useEffect(() => {
        loadAllProducts();
    }, []);

    useEffect(() => {
        searchProducts(search);
    }, [search]);

    return (
        <>
            <div className="search_outer">
                <div className="search_inner">
                    <div className="search_wrapper">
                        <input 
                            type="text" 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search for products..."
                        />
                    </div>
                </div>
            </div>
            <div className="product_outer">
                <div className="product_inner">
                    <div className="product_wrapper">
                        {loading ? 'Loading....' :
                            result.map((product, index) => (
                                <div key={index} className='products'>
                                    <div className="action_buttons">
                                        <button onClick={() => deleteProduct(product._id)}><FaTrash /></button>
                                        <Link href={`/update-product/${product._id}`}><FaEdit /></Link>
                                    </div>
                                    <div className="product_id">
                                        <h1>{product._id}</h1>
                                    </div>
                                    <div className="product_infos">
                                        <ul>
                                            <li><span className='p-infos'>Product Name: </span> <span className='p-full-infos'>{product.name}</span></li>
                                            <li><span className='p-infos'>Product Price: </span> <span className='p-full-infos'>{product.price}</span></li>
                                            <li><span className='p-infos'>Product Category: </span> <span className='p-full-infos'>{product.category}</span></li>
                                            <li><span className='p-infos'>Product Brand: </span> <span className='p-full-infos'>{product.brand}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductPage;
