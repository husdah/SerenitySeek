import React, { useState } from 'react';
import Styles from './Contact.module.css';
import {  FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn  } from 'react-icons/fa';
import image from '../../assets/images/contact.jpeg';
import validator from 'validator';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Contact() {
    // Initialize State Variable
    const [ state, setState ] = useState({
      fname: '',
      lname: '',
      email: '',
      subject: '',
      message: ''
    });

    // Initialize state variable for validation
    const [ isValidFirstName, setIsValidFirstName ] = useState(true);
    const [ isValidLastName, setIsValidLastName ]   = useState(true);
    const [ isValidEmail, setIsValidEmail ]         = useState(true);
    const [ isValidSubject, setIsValidSubject ]     = useState(true);
    const [ isValidMessage, setIsValidMessage ]     = useState(true);
    
    // Handle change on input
    const handleChange = (e) => {
      const { name, value } = e.target;
      setState((prev) => ({ ...prev, [name]: value }));
    };
    
    // Function to send email 
    const sendEmail = async () => {
      const MySwal = withReactContent(Swal);
      const handleSuccess = (responseData) => {
        MySwal.fire({
          icon: 'success',
          title: responseData.message,
          time: 4000,
        });
      };

      // Clear form fields 
      const handleClearForm = () => {
        setState({
          fname: '',
          lname: '',
          email: '',
          subject: '',
          message: '',
        });
      }

      try {
        const response = await fetch('http://localhost:4000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state),
        });

        const responseData = await response.json();

        if (response.status === 200) {
          handleSuccess(responseData);
          handleClearForm();
          console.log(responseData.message);
        } 
        else {
          console.error(responseData.message);
        }
      } 
      catch (error) {
        console.error('An error occurred while sending the email', error);
      }
    }

    // Action on submit  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Reset validation states
      setIsValidFirstName(true);
      setIsValidLastName(true);
      setIsValidEmail(true);
      setIsValidSubject(true);
      setIsValidMessage(true);

      // Destruct the properties(fname, lname, ...) from the state
      const { fname, lname, email, subject, message } = state;

      let emptyValues = [];

      if (!fname || validator.isEmpty(fname) || !validator.isAlpha(fname)) {
        emptyValues.push('fname');
        setIsValidFirstName(false);
        //console.log(isValidFirstName);
      }

      if (!lname || validator.isEmpty(lname) || !validator.isAlpha(lname)) {
        emptyValues.push('lname');
        setIsValidLastName(false);
        //console.log(isValidLastName);
      }

      if (!email || validator.isEmpty(email) || !validator.isEmail(email)) {
        emptyValues.push('email');
        setIsValidEmail(false);
        //console.log(isValidEmail);

      }

      if (!subject || validator.isEmpty(subject) || !validator.matches(subject, /^[a-zA-Z\s]+$/)) {
        emptyValues.push('subject');
        setIsValidSubject(false);
        //console.log(isValidSubject);

      }

      if (!message || validator.isEmpty(message) || !validator.isLength(message, { min: 1, max: 225 })) {
        emptyValues.push('message');
        setIsValidMessage(false);
        //console.log(isValidMessage);
      }

      if (emptyValues.length === 0 && isValidFirstName && isValidLastName && isValidEmail && isValidSubject && isValidMessage) {
        sendEmail();
      }
    };
  
    return (
        <div className={Styles.contact}>
            <div className={Styles.contactContainer}>
              <div className={Styles.contactInfo}>
                <h3 className={Styles.title}> Let's Get In Touch</h3>
                <div className={Styles.contactDetails}>
                  <img src={image} alt='image_2' />
                </div>
                
                <div className={Styles.socialMedia}>
                  <p>Connect With Us: </p>
                  <div className={Styles.socialIcons}>
                    <a href="/#" > <FaInstagram /> </a>
                    <a href="/#" > <FaFacebookF /> </a>
                    <a href="/#" > <FaTwitter /> </a>
                    <a href="/#" > <FaLinkedinIn /> </a>
                  </div>
                </div>
              </div>

              <div className={Styles.contactForm}>
                <span className={Styles.circleOne}></span>
                <span className={Styles.circleTwo}></span>

                <form className={Styles.contact_form} name="cForm" method="POST" onSubmit={handleSubmit}>
                  <h3 className={Styles.contactFormTitle}>Contact Us</h3>

                  <div className={Styles.input_control}>
                    <input 
                      type="text" 
                      placeholder='First Name' 
                      name="fname" 
                      value={state.fname}
                      onChange={handleChange}
                      onFocus={() => setIsValidFirstName(true)} 
                    />
                    <br />
                    {!isValidFirstName && <span className={Styles.error}>Please enter your first name.</span>}
                  </div>

                  <div className={Styles.input_control}>
                    <input 
                      type="text" 
                      placeholder='Last Name' 
                      name="lname"  
                      value={state.lname}
                      onChange={handleChange}
                      onFocus={() => setIsValidLastName(true)}
                    />
                    <br />
                    {!isValidLastName && <span className={Styles.error}>Please enter your last name.</span>}    
                  </div>

                  <div className={Styles.input_control}>
                    <input 
                      type="text" 
                      placeholder='Email' 
                      name="email" 
                      value={state.email}
                      onChange={handleChange}
                      onFocus={() => setIsValidEmail(true)}
                    />
                    <br />
                    {!isValidEmail && <span className={Styles.error}>Please enter your email.</span>}
                  </div>

                  <div className={Styles.input_control}>
                    <input 
                      type="text" 
                      placeholder='Subject'  
                      name="subject" 
                      value={state.subject}
                      onChange={handleChange}
                      onFocus={() => setIsValidSubject(true)}
                    />
                    <br />
                    {!isValidSubject && <span className={Styles.error}>Please enter a clear subject.</span>}
                  </div>

                  <div className={Styles.input_control}>
                    <textarea 
                      className={Styles.contactTextarea}  
                      placeholder='Message' 
                      name="message" 
                      value={state.message}
                      onChange={handleChange}
                      onFocus={() => setIsValidMessage(true)}
                    ></textarea>
                    <br />
                    {!isValidMessage && <span className={Styles.error}>Please enter a clear message.</span>}
                  </div>

                  <button className={Styles.contact_btn}>Send</button>  

                </form>

              </div>
            </div>
        </div>
        
    );
}