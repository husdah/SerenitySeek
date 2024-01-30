import React, { useState } from 'react'
import "./index.css"
import "../assets/Contact.css"
import Accordion from './Accordion';
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'


export default function Contact() {
    const [fname, setFname] = useState(''); 
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const [errors, setErrors] = useState('');

    const validateForm = () => {
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
      
        setErrors(errors); 
        
        const keysArray = Object.keys(errors);

        return keysArray.length === 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()){   
            const formData = {fname, lname, email, subject, message};
              const handleSuccess = () => {
                MySwal.fire({
                    icon: 'success',
                    title: 'Your email send successfully',
                    time: 4000,
                });
              };
              const handleFailure = () => {
                MySwal.fire({
                  icon: 'error',
                  title: 'All fields are required and validated',
                  time: 4000,
                });
              };
            
              const MySwal = withReactContent(Swal);
              try {
                const response = await fetch('http://localhost:4000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
              
                if (response.status === 200) {
                    const responseData = await response.json();
                    handleSuccess();
                    console.log(responseData.message); 

                } else {
                    const errorData = await response.json();
                    handleFailure();
                    console.error(errorData.message);

                }
            } catch (error) {
                console.error('An error occurred while sending the email', error);
            }
        } 
    }

    const accordionItems = [
      { title: 'How can I book a vacation package?', content: 'Visit our website and browse through our exciting range of vacation packages. ' },
      { title: 'What destinations do you offer?', content: 'Our travel packages cover an extensive list of destinations worldwide, ranging from exotic beach getaways and cultural city experiences to thrilling adventure destinations.' },
      { title: 'How do I make payments?', content: 'You can make payments online using major credit cards, debit cards, and secure online payment gateways.' },
      { title: 'Can I get a refund if my plans change?', content: 'Our refund policy varies depending on the type of package and the timeframe of your cancellation. '},
      { title: 'Do you offer group discounts?', content: 'Our group discounts vary depending on the size of your group and the specific package you\'re interested in. '},
    ];
    
    return (
        <div className='contact'>
            <div className="contact-banner">
              <h1>Contact Us</h1>
            </div>
            <div className='contact-container'> 
              <div className='contact-form-container'>
                <h3>Please Fill Out The Following Form And We Will Get Back To You As Soon As Possible!</h3>
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
              <div className='faq'>
                <h3>Frequently Asked Questions</h3>
                <hr />
                <Accordion items={accordionItems}/>
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
        </div>
        
    );
}