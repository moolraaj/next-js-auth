'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import logo from '../../../images/logo.svg' 
function HeaderPage() {
    let [user,setUser]=useState([])
    let fetchAllUers=async()=>{
        let resp=await fetch('/api/users/me')
        let data=await resp.json()
        setUser(data?.user?.username)
        

    }

    useEffect(()=>{
        fetchAllUers()
    },[])
  return (
    <>
    <div className="header_outer">
        <div className="header_inner">
            <div className="header_wrapper">
                <div className="logo">
                    <Link href={`/`}>
                    <img src={logo.src} alt="logo" />
                    </Link>
                </div>
                <div className="ul-navbar">
                    <ul className='nav-wrapper'>
                        <li><Link href='/products'>products</Link></li>
                        <li><Link href='/add-products'>add products</Link></li>
                        <li><Link href='/profile'>profile</Link></li>
                       
                    </ul>
                </div>
                <div className="user">
                    welcome  (<span>{!user?'no user':user||''}</span>)
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default HeaderPage
