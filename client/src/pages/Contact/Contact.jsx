import React from 'react'
import './contact.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

function Contact() {
  return (
    <>
    <Navbar />
    <div className='contact'>
      <h1>Contact Us</h1>
      <p>For any questions or inquiries, please contact us at:</p>
      <p>Email: razvan.stefan@khromera.com</p>
      <p>Phone: 072 791 7254</p>
      <p>Location: Str. Toamnei, nr. 1</p>
      <p>Program: 8-17</p>
    </div>
    <Footer />
    </>
  )
}

export default Contact