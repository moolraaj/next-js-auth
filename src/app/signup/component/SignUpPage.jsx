'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import hide from '../../images/hide.png'
import show from '../../images/view.png'
function SignUpPage() {
    let router = useRouter()
    let [pass, setPass] = useState(false)
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const getUserValues = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validateFields = () => {
        const { username, email, password } = user;
        let valid = true;
        let errorFields = {};

        if (!username) {
            valid = false;
            errorFields.username = 'Username is required';
        }
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
                let resp = await fetch('/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });

                resp = await resp.json()
                console.log(resp)
                if (resp) {
                    toast.success(resp.message)
                    router.push(`/verifyemail`)
                }
                setUser({
                    username: '',
                    email: '',
                    password: '',
                })


            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (


        <div className="sign_up_wrapper">
            <div className="input_wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={user.username} onChange={getUserValues} />
                {errors.username && <span>{errors.username}</span>}
            </div>

            <div className="input_wrapper">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={user.email} onChange={getUserValues} />
                {errors.email && <span>{errors.email}</span>}
            </div>

            <div className="input_wrapper">
                <label htmlFor="password">Password</label>
                <div className="pass-wrapper">
                    <input type={pass === false ? 'password' : 'text'} name="password" value={user.password} onChange={getUserValues} />
                    <button className='hide-and-seek' onClick={() => setPass(!pass)}>{pass === false ? <img src={hide.src} /> : <img src={show.src} />}</button>
                </div>
                {errors.password && <span>{errors.password}</span>}
            </div>

            <div className="button_wrapper">
                <button onClick={submitUserDetails}>Sign Up</button>

            </div>
            <div className='credintials'>
                <p>if you have already an account? go to  <Link href={`/login`}>login</Link></p>

            </div>
        </div>

    );
}

export default SignUpPage;
