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
                <span>Transposition</span>
                <p>Lorem ipsum dolor sit amet  Sint.Lorem ipsum dolor sit amet  Sint</p>
            </div>
            <div></div>
            <div>
                <span>Transposition</span>
                <p>Lorem ipsum dolor sit amet  Sint.Lorem ipsum dolor sit amet  Sint</p>
            </div>
            <div></div>
            <div>
                <span>Transposition</span>
                <p>Lorem ipsum dolor sit amet  Sint.Lorem ipsum dolor sit amet  Sint</p>
            </div>
        </div>
    </div>
  )
}
