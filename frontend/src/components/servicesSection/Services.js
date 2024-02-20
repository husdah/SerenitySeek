import React from 'react'
import styles from './services.module.css';
import { BiLocationPlus } from "react-icons/bi";
import londonImage from '../../images/london.jpg';

export default function Services() {
  return (
    <div className={styles.services}>
        <h1>Our Services</h1>
        <div className={styles.forservices}>
            <div></div>
            <div>
                <span>Flight Booking Services</span>
                <p>Provide a user-friendly platform for customers to search, compare, and book flights to various destinations.</p>
            </div>
            <div></div>
            <div>
                <span>Accommodation Reservation</span>
                <p>Facilitate hotel and accommodation bookings with a wide range of options, from budget to luxury.</p>
            </div>
            <div></div>
            <div>
                <span>Travel Insurance Services</span>
                <p>Provide clear information on coverage options, terms, and conditions.</p>
            </div>
        </div>
    </div>
  )
}
