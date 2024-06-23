'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function ProfilePage() {
    let router=useRouter()
    let [user, setUser] = useState([])
  

    let loadUserDetails = async () => {
     
        let resp = await fetch('/api/users/me')
        let data = await resp.json()
        setUser(data?.user?.username)
    }

    useEffect(() => {
        loadUserDetails()
    }, [])
    

    const logoutUser = async () => {
        if(window.confirm('are you sure you want to logou')){

            let resp = await fetch('/api/users/logout')
            let data = await resp.json()
            if (data.success) {
                toast.success(data.message)
                router.push('/login')
            }
        }
    }

  

    return (
        <>
        <div className="user_profile_outer">
            <div className="user_pofile_inner">
                <div className="user_profile_wrapper">

            <h1>welcome {!user?'no user':user ||''}</h1>
            <button onClick={logoutUser}>logout</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProfilePage
