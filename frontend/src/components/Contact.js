import React, { useState } from 'react'
import "./index.css"
import "./Contact.css"
import { MdEmail, MdOutlinePlace } from "react-icons/md"
import { FaPhone } from "react-icons/fa"
import Footer from './Footer'

export default function Contact() {
    //useState(''): returns array of 2 elements, fname: current state value, setFname: function that can be used to update the state
    const [fname, setFname] = useState(''); //fname hold the value of inputs fname
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    // errors: store validation error messages.
    const [errors, setErrors] = useState('');

    const validateForm = () => {
        // declare an empty object
        const errors = {};
      
        const name_pattern = /^[a-zA-Z]+$/;
        //const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const subject_pattern =  /^[a-zA-Z\s]+$/;
        
        if(fname === ""){
          errors.fname = "This field is required!";
        }
        else if(!name_pattern.test(fname)) {
          errors.fname = "Must be only letters!";
        }
      
        if(lname === ""){
          errors.lname = "This field is required!";
        }
        else if(!name_pattern.test(lname)) {
          errors.lname = "Must be only letters!";
        }
      
        if(email === ""){
          errors.email = "This field is required!";
        }
        /*else if(!email_pattern.test(email)){
          errors.email = "example@gmail.com";
        }*/
      
        if(subject === ""){
          errors.subject = "This field is required!";
        }
        else if(!subject_pattern.test(subject)){
          errors.subject = "Must be only letters!";
        }
      
        if(message === ""){
          errors.message = "This field is required!";
        }
        

        /* 
          To display the error:
          console.log(errors) 
        */
        
        // Set Errors State and Return Validation 
        setErrors(errors); // is used to update the state with the errors object.
        
        const keysArray = Object.keys(errors);
        /*
          display the key object of error { fname: "this field is required"} only return fname
          console.log("keys: " + keysArray); 
        */
        
        // Return true if there are no errors, otherwise false
        return keysArray.length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate the form data and get validation errors
        if(validateForm()){   
            // Form data is valid, make an API call to send email 
            const formData = {fname, lname, email, subject, message};
            /*
              Dispaly the values of input
              console.log(fname)
              console.log(lname)
              console.log(email)
              console.log(subject)
              console.log(message)
            */

              try {
                const response = await fetch('http://localhost:4000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                // ok is property mean status of response over 200
                
                if (response.ok) {
                    // Parse the JSON response
                    const responseData = await response.json();
                    alert(responseData.message);
                    
                    //console.log('Email sent successfully');
                    //console.log(responseData.message);  // Log the parsed response data

                } else {
                    // If there is an error, parse and log the error response
                    const errorData = await response.json();
                    alert(errorData.message);

                    //console.error('Failed to send email');
                    //console.error(errorData);

                }
            } catch (error) {
                console.error('An error occurred while sending the email', error);
            }
        } 
    }

    return (
        <div className='contact'>
            <div className="contact-banner">
            </div>
            <div className='contact-container'> 
              <h4> Get In Touch </h4>   
              <div className = "contact-media">
                  <div className='contact-media-subcontainer'>
                    <MdOutlinePlace className='address'/><br />
                    <a href="https://www.google.com/maps/place/Beyrouth/@33.8892114,35.4630826,13z/data=!3m1!4b1!4m6!3m5!1s0x151f17215880a78f:0x729182bae99836b4!8m2!3d33.8937913!4d35.5017767!16zL20vMDlianY?entry=ttu" rel="noreferrer" target="_blank"> Beirut, Lebanon</a>
                  </div>
                  <div className='contact-media-subcontainer'>
                    <MdEmail className='email'/><br />
                    <a href="mailto:serenityseek2024@gmail.com">serenityseek2024@gmail.com </a>
                  </div>
                  <div className='contact-media-subcontainer'>
                    <FaPhone className='phone'/><br />
                    <a href="tel:0096170980354"> +961 70 980354 </a>
                  </div>
              </div>

              <div className='contact-form-container'>
                <h3>Or Fill Out The Following Form And We Will Get Back To You As Soon As Possible!</h3>
                <form className="contact-form" name="cForm" method="POST" onSubmit={handleSubmit}>
                    <div className="input-control">
                        <div className="full-width">
                            <div className="half-width-left">
                                <input type="text" placeholder="First Name" name="fname" onChange={(e) => setFname(e.target.value)} />
                                {errors.fname && <p className='error'>{errors.fname}</p>}
                            </div>
                            <div className="half-width-right">
                                <input type="text" placeholder="Last Name" name="lname"  onChange={(e) => setLname(e.target.value)}  />
                                {errors.lname && <p className='error'>{errors.lname}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="input-control">
                        <input type="text" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)}  />
                        {errors.email && <p className='error'>{errors.email}</p>}
                    </div>
                    <div className="input-control">
                        <input type="text" placeholder="Subject" name="subject" onChange={(e) => setSubject(e.target.value)} />
                        {errors.subject && <p className='error'>{errors.subject}</p>}
                    </div>
                    <div className="input-control">
                        <textarea cols="50" rows="3" name="message" placeholder="Message" onChange={(e) => setMessage(e.target.value)}></textarea>
                        {errors.message && <p className='error'>{errors.message}</p>}
                    </div>
                    <button type='submit' className='contact-btn'>Send</button>
                </form>
              </div>

            </div>
            <div class="map-container">
            <iframe
                className="map"
                src="https://www.google.com/maps/embed?pb=!3m1!4b1!4m6!3m5!1s0x151f17215880a78f:0x729182bae99836b4!8m2!3d33.8937913!4d35.5017767!16zL20vMDlianY"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
            >  
            </iframe>
            </div>
            <Footer />
        </div>
        
    );
}