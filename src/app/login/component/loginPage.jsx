'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    const getUserValues = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateFields = () => {
        const { email, password } = user;
        let valid = true;
        let errorFields = {};

        if (!email) {
            valid = false;
            errorFields.email = 'Email is required';
        }
        if (!password) {
            valid = false;
            errorFields.password = 'Password is required';
        }

        setErrors(errorFields);
        return valid;
    };

    const submitUserDetails = async () => {
        if (validateFields()) {
            try {
                const response = await fetch('/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });

                const data = await response.json();
                if (response.ok) {
                    toast.success(data.message);
                    router.push('/products');
                    setUser({ email: '', password: '' });
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="sign_up_wrapper">
            <div className="input_wrapper">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={user.email} onChange={getUserValues} />
                {errors.email && <span>{errors.email}</span>}
            </div>

            <div className="input_wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={user.password} onChange={getUserValues} />
                {errors.password && <span>{errors.password}</span>}
            </div>

            <div className="button_wrapper">
                <button onClick={submitUserDetails}>Login</button>
            </div>
            <div className='credintials'>
                <p>Not have an account? please signup first  <Link href={`/signup`}>signup</Link></p>
               
            </div>
        </div>
    );
}

export default LoginPage;
