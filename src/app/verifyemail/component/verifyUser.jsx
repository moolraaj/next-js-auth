'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function VerifyUser() {
    let router=useRouter()
    const [token, setToken] = useState('')
    const [verify, setVerify] = useState(null)

    console.log(token)

    const VerifyUserByToken = async () => {
        const resp = await fetch('/api/users/verifyemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token })
        })
        const data = await resp.json()
        if (data.success) {
            setVerify(true)
            toast.success(data.message)
            router.push('/login')
        } else {
            setVerify(false)
            toast.error(data.message)
        }
    }

    useEffect(() => {
        const newToken = window.location.search.split('=')[1]
        setToken(newToken || '')
    }, [])

    return (
        <>
        <div className="verify_user">
            <button onClick={VerifyUserByToken} className='verify'>{verify ? 'verified' : 'isverified'}</button>

        </div>
            
        </>
    )
}

export default VerifyUser
