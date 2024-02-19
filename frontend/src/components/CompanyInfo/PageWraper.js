import React, { useEffect, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import styles from '../../assets/css/companyInfo.module.css'
import Swal from 'sweetalert2';

//components
import HeaderSection from './HeaderSection';
import AboutSection from './AboutSection';
import TeamSection from './TeamSection';
import ServicesSection from './ServicesSection';
import ContactSection from './ContactSection';
import RatingSection from './RatingSection';
import FooterSection from './FooterSection';

function PageWraper(props) {
    const [companyName, setCompanyName] = useState(null);
    const [companyLogo, setCompanyLogo] = useState(null);
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [rate, setRate] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [customers, setCustomers] = useState('');

    useEffect(() =>{
        /* const encodedString = encodeURIComponent(props.heading); */
        const fetchCompanyInfo =  async ()=>{
            const res = await fetch(`http://localhost:4000/api/companyInfo/${props.heading}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const data = await res.json();
            
            if(!res.ok){
                Swal.fire({
                    title: 'Warning!',
                    text: data.error,
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
            }
    
            if(res.ok){
                if(data){
                    setCompanyName(data.name);
                    setCompanyLogo(data.logo);
                    setDescription(data.description);
                    setLocation(data.location);
                    setRate(data.rate);
                    setEmail(data.email);
                    setPhoneNumber(data.phoneNumber);
                    setCustomers(data.customers);
                }else {
                    // Handle the case when user attribute is not present
                    console.error('Company attribute is missing in the returned data:', data);
                }
               
            }
        }
        if(props.heading){
            fetchCompanyInfo();
        }
    },[props.heading])

  return (
    <>
    <HeaderSection title={companyName} logo={companyLogo}/> 

    <div id="page_wrap">
        <nav className={styles.menu}>
            <ul className={styles.ul}>
                <li className={styles.nav_four}><Link to={`/CompanyInfo?companyName=${props.heading}`}>About</Link></li>
                <li className={styles.nav_four}><Link to={`/CompanyInfo/Services?companyName=${props.heading}`}>Services</Link></li>
                <li className={styles.nav_four}><Link to={`/CompanyInfo/Customers?companyName=${props.heading}`}>Customers</Link></li>
                <li className={styles.nav_four}><Link to={`/CompanyInfo/Contact?companyName=${props.heading}`}>Contact Info</Link></li>
                <li className={styles.nav_four}><Link to={`/CompanyInfo/Rating?companyName=${props.heading}`}>Rating</Link></li>
                <li className={styles.nav_four}><Link to="/ChatApp">Contact Support</Link></li>
            </ul>
        </nav>

        <main className={styles.main}>
            <Routes>
                <Route path="/" element={<AboutSection description={description}/>} />
                <Route path="/Customers" element={<TeamSection customers={customers}/>} />
                <Route path="/Services" element={<ServicesSection/>} />
                <Route path="/Contact" element={<ContactSection email={email} phoneNumber={phoneNumber} location={location}/>} />
                <Route path="/Rating" element={<RatingSection rating={rate} companyName={companyName}/>} />
            </Routes>
        </main>
    </div>
   
    <FooterSection/>
    </>
    
  )
}

export default PageWraper
