import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Contact from '../components/Contact'
import Footer from '../components/Footer/Footer'


export default function ContactUs() {
  return (
    <div className='contact-page'>
        <Navbar nothome='true' />
        <Contact />
        <Footer />
    </div>
  )
}
