import React, { useState } from 'react';
import Styles from './Contact.module.css';
import {  FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn  } from 'react-icons/fa';
import image from '../../assets/images/contact.jpeg';
import validator from 'validator';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function Contact() {

    /* const [Fname, setFname] = useState('') can I do this for all inputs or set them in object as below */
    const [ state, setState ] = useState({
      fname: '',
      lname: '',
      email: '',
      subject: '',
      message: ''
    });

    /* For validation state - type of useState boolean and initial state true */
    const [ isValidFirstName, setIsValidFirstName ] = useState(true);
    const [ isValidLastName, setIsValidLastName ]   = useState(true);
    const [ isValidEmail, setIsValidEmail ]         = useState(true);
    const [ isValidSubject, setIsValidSubject ]     = useState(true);
    const [ isValidMessage, setIsValidMessage ]     = useState(true);
    const [ emptyFields, setEmptyFields ]           = useState([]);
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      /* ...prev if we have sentence and change one word only this word will change while the other remain the same  */
      setState((prev) => ({ ...prev, [name]: value }));
    };

    const handleOnFocus = (fieldName) => {
      setEmptyFields('');
      switch (fieldName) {
        case 'fname':
          setIsValidFirstName(true);
          break;
        case 'lname':
          setIsValidLastName(true);
          break;
        case 'email':
          setIsValidEmail(true);
          break;
        case 'subject':
          setIsValidSubject(true);
          break;
        case 'message':
          setIsValidMessage(true);
          break;
        default:
          break;
      }
    };
    
    /* Action on submit  */
    const handleSubmit = async (e) => {
      e.preventDefault();

      const { fname, lname, email, subject, message } = state;

       /* Reset validation states */
       setIsValidFirstName(true);
       setIsValidLastName(true);
       setIsValidEmail(true);
       setIsValidSubject(true);
       setIsValidMessage(true);

      if (!fname || !lname || !email || !subject || !message || validator.isEmpty(fname) || validator.isEmpty(lname) || validator.isEmpty(email) || validator.isEmpty(subject) || validator.isEmpty(message) ) {
        setEmptyFields('This field is required.');
        return;
      }

      setIsValidFirstName(validator.isAlpha(fname));
      setIsValidLastName(validator.isAlpha(lname));
      setIsValidEmail(validator.isEmail(email));
      setIsValidSubject(validator.matches(subject, /^[a-zA-Z\s]+$/));
      setIsValidMessage(validator.isLength(message, { min: 1, max: 50 }));

      if (!isValidFirstName || !isValidLastName || !isValidEmail || !isValidSubject || !isValidMessage) {
        return;
      }

      const MySwal = withReactContent(Swal);

      const handleSuccess = (responseData) => {
        MySwal.fire({
          icon: 'success',
          title: responseData.message,
          time: 4000,
        });
      };

      /* Clear form fields */
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
    };
  
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
                    <input 
                      type="text" 
                      placeholder='First Name' 
                      name="fname" 
                      value={state.fname}
                      onChange={handleChange}
                      onFocus={() => handleOnFocus('fname')} 
                    />
                    <br />
                    {emptyFields && <span className={Styles.error}>{emptyFields}</span>}
                    {!isValidFirstName && <span className={Styles.error}>Contains only letters.</span>}
                  </div>

                  <div className={Styles.input_control}>
                    <input 
                      type="text" 
                      placeholder='Last Name' 
                      name="lname"  
                      value={state.lname}
                      onChange={handleChange}
                      onFocus={() => handleOnFocus('lname')}
                    />
                    <br />
                    {emptyFields && <span className={Styles.error}>{emptyFields}</span>}
                    {!isValidLastName && <span className={Styles.error}>Contains only letters.</span>}
                  </div>

                  <div className={Styles.input_control}>
                    <input 
                      type="text" 
                      placeholder='Email' 
                      name="email" 
                      value={state.email}
                      onChange={handleChange}
                      onFocus={() => handleOnFocus('email')}
                    />
                    <br />
                    {emptyFields && <span className={Styles.error}>{emptyFields}</span>}
                    {!isValidEmail && <span className={Styles.error}>example@gmail.com</span>}
                  </div>

                  <div className={Styles.input_control}>
                    <input 
                      type="text" 
                      placeholder='Subject'  
                      name="subject" 
                      value={state.subject}
                      onChange={handleChange}
                      onFocus={() => handleOnFocus('subject')}
                    />
                    <br />
                    {emptyFields && <span className={Styles.error}>{emptyFields}</span>}
                    {!isValidSubject && <span className={Styles.error}>The subject must be clear</span>}
                  </div>

                  <div className={Styles.input_control}>
                    <textarea 
                      className={Styles.contactTextarea}  
                      placeholder='Message' 
                      name="message" 
                      value={state.message}
                      onChange={handleChange}
                      onFocus={() => handleOnFocus('message')}
                    ></textarea>
                    <br />
                    {emptyFields && <span className={Styles.error}>{emptyFields}</span>}
                    {!isValidMessage && <span className={Styles.error}>The message must be clear</span>}
                  </div>

                  <button className={Styles.contact_btn}>Send</button>  

                </form>

              </div>
            </div>
        </div>
        
    );
}