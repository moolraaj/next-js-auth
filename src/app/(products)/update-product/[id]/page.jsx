import React from 'react'
import UpdateProductPage from './component/updatePage'
import Header from '@/app/_common/header/page'
import Footer from '@/app/_common/footer/page'

function page({params}) {
    let {id}=params
  return (
     <>
     <Header/>
     <UpdateProductPage id={id}/>
     <Footer/>
     </>
  )
}

export default page
