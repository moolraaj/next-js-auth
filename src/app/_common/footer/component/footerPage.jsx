'use client'

import React, { useEffect, useState } from 'react'
import logo from '../../../images/logo.svg'
function FooterPage() {




    return (
        <>
            <div className="header_outer footer">
                <div className="header_inner">
                    <div className="footer_wrapper">
                        <div className="logo">
                            <img src={logo.src} alt="logo" />
                        </div>
                        <div className="infos">

                            <p>welcome to next js</p>
                        </div>
                        <div className="unerinfos">
                            <li>6230097248</li>
                            <li>6230397248</li>
                        </div>

                    </div>
                </div>
            </div>

            <div className="header_outer">
                <div className="header_inner">
                    <div className="wrapper">
                        <p>create by nextjs team</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FooterPage
