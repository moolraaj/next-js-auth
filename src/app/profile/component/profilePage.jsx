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
        let resp = await fetch('/api/users/logout')
        let data = await resp.json()
        if (data.success) {
            toast.success(data.message)
            router.push('/login')
        }
    }

    console.log(user)

    return (
        <>
            <h1>welcome {user?'no user':user?.username || ''}</h1>
            <button onClick={logoutUser}>logout</button>
        </>
    )
}

export default ProfilePage
