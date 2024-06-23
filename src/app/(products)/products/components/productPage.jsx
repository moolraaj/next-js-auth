'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'sonner';


function ProductPage() {
    let router=useRouter()
    let [result, setResult] = useState([])
    let [loading, setLoading] = useState(false)

    const loadAllProducts = async () => {
        setLoading(true)
        let resp = await fetch('/api/products/get',{cache:'no-store'})
        let data = await resp.json()
        setResult(data.product)
        
        setLoading(false)
    }

    const deletProduct = async (id) => {
        if(window.confirm('are you sure to want to delete this product')){

            let resp = await fetch(`/api/products/delete/${id}`,{
                method:'DELETE'
            })
            let data = await resp.json()
            if(data.success){
                toast.success(data.message)
                loadAllProducts()
            } 
        }
    }

    useEffect(() => {
        loadAllProducts()
    }, [])

     

    return (
        <>
            <div className="product_outer">
                <div className="product_inner">
                    <div className="product_wrapper">
                        {loading ? 'loading....' :
                            result.map((ele, index) => {
                                return <div key={index} className='products'>
                                    <div className="action_buttons">
                                        <button onClick={()=>deletProduct(ele._id)}><FaTrash/></button>
                                        <Link href={`/update-product/${ele._id}`}><FaEdit/></Link>
                                    </div>
                                    <div className="product_id">
                                        <h1>{ele._id}</h1>
                                    </div>
                                    <div className="product_infos">
                                        <ul>
                                            <li><span className='p-infos'>Product Name  </span> <span className='p-full-infos'>{ele.name}</span></li>
                                            <li><span className='p-infos'>Product Price  </span> <span className='p-full-infos'>{ele.price}</span></li>
                                            <li><span className='p-infos'>Product Category  </span> <span className='p-full-infos'>{ele.category}</span></li>
                                            <li><span className='p-infos'>Product Brand  </span> <span className='p-full-infos'>{ele.brand}</span></li>
                                        </ul>

                                    </div>

                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductPage
