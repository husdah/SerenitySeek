import React, { useState } from 'react'
import Swal from "sweetalert2";
import validator from 'validator';
import withReactContent from 'sweetalert2-react-content'
import Styles from './Contact.module.css'
import {  FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn  } from "react-icons/fa"
import image from '../../assets/images/contact.jpeg'

export default function Contact() {

    /* const [Fname, setFname] = useState('') can I do this for all inputs or set them in object as below */
    const [state, setState] = useState({
      fname: '',
      lname: '',
      email: '',
      subject: '',
      message: ''
    });

    /* For validation state - type of useState boolean and initial state true */
    const [isValidFirstName, setIsValidFirstName] = useState(true);
    const [isValidLastName, setIsValidLastName]   = useState(true);
    const [isValidEmail, setIsValidEmail]         = useState(true);
    const [isValidSubject, setIsValidSubject]     = useState(true);
    const [isValidMessage, setIsValidMessage]     = useState(true);
    const [emptyFields, setEmptyFields] = useState([]);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      /* ...prev if we have sentence and change one word only this word will change  while the other remain the same  */
      setState((prev) => ({ ...prev, [name]: value }));
    };

    /* Action on submit  */
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Reset validation states
      setIsValidFirstName(true);
      setIsValidLastName(true);
      setIsValidEmail(true);
      setIsValidSubject(true);
      setIsValidMessage(true);

      setEmptyFields([]);
  
      // Destructure the state to get individual values
      const { fname, lname, email, subject, message } = state;
  
      let emptyValues = [];
      if (!fname || validator.isEmpty(fname) || !validator.isAlpha(fname)) {
        emptyValues.push('First Name');
        setIsValidFirstName(false);
      }
      if (!lname || validator.isEmpty(lname) || !validator.isAlpha(fname)) {
        emptyValues.push('Last Name');
        setIsValidLastName(false);
      }
      if (!email || validator.isEmpty(email) || !validator.isEmail(email)) {
        emptyValues.push('Email');
        setIsValidEmail(false);
      }
      if (!subject || validator.isEmpty(subject) || !validator.matches(subject, /^[a-zA-Z\s]+$/)) {
        emptyValues.push('Subject');
        setIsValidSubject(false);
      }
      if (!message || validator.isEmpty(message) || !validator.isLength(message, { min: 1, max: 50 })) {
        emptyValues.push('Message');
        setIsValidMessage(false);
      }

      const MySwal = withReactContent(Swal);

      const handleSuccess = (responseData) => {
        MySwal.fire({
          icon: 'success',
          title: responseData.message,
          time: 4000,
        });
        // Clear the form fields
        handleClearForm();
      };

      const handleFailure = (errorData) => {
        MySwal.fire({
          icon: 'error',
          title: errorData.message,
          time: 4000,
        });
      };

      const handleValidation = () => {
        MySwal.fire({
          icon: 'error',
          title: 'All fields should be required & validated',
          time: 4000,
        });
      };

      if (emptyValues.length > 0) {
        setEmptyFields(emptyValues);
        handleValidation();
        return;
      }
  
      try {
        const response = await fetch('http://localhost:4000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state),
        });
  
        if (response.status === 200) {
          const responseData = await response.json();
          handleSuccess(responseData);
          console.log(responseData.message);
        } else {
          const errorData = await response.json();
          handleFailure(errorData);
          console.error(errorData.message);
        }
      } catch (error) {
        console.error('An error occurred while sending the email', error);
      }
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
    return (
        <div className={Styles.contact}>
            <div className={Styles.contactContainer}>
              <div className={Styles.contactInfo}>
                <h3 className={Styles.title}> Let's Get In touch</h3>
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
                    <input type="text" placeholder='First Name' name="fname" 
                      value={state.fname}
                      onChange={handleChange}
                      onFocus={() => setIsValidFirstName(true)} 
                    />
                    <br />
                    {!isValidFirstName && <span className={Styles.error}>Contains only letters.</span>}
                  </div>

                  <div className={Styles.input_control}>
                    <input type="text" placeholder='Last Name' name="lname"  
                      value={state.lname}
                      onChange={handleChange}
                      onFocus={() => setIsValidLastName(true)}
                    />
                    <br />
                    {!isValidLastName && <span className={Styles.error}>Contains only letters.</span>}
                  </div>

                  <div className={Styles.input_control}>
                    <input type="text" placeholder='Email' name="email" 
                      value={state.email}
                      onChange={handleChange}
                      onFocus={() => setIsValidEmail(true)}
                    />
                    <br />
                    {!isValidEmail && <span className={Styles.error}>example@gmail.com</span>}
                  </div>

                  <div className={Styles.input_control}>
                    <input type="text" placeholder='Subject'  name="subject" 
                      value={state.subject}
                      onChange={handleChange}
                      onFocus={() => setIsValidSubject(true)}
                    />
                    <br />
                    {!isValidSubject && <span className={Styles.error}>The subject must be clear</span>}
                  </div>

                  <div className={Styles.input_control}>
                    <textarea className={Styles.contactTextarea}  placeholder='Message' name="message" 
                      value={state.message}
                      onChange={handleChange}
                      onFocus={() => setIsValidMessage(true)}
                    ></textarea>
                    <br />
                    {!isValidMessage && <span className={Styles.error}>The message must be clear</span>}
                  </div>

                  <button className={Styles.contact_btn}>Send</button>  

                </form>

              </div>
            </div>
        </div>
        
    );
}