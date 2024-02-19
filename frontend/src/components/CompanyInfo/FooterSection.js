import React from 'react'
import styles from '../../assets/css/companyInfo.module.css'

function FooterSection() {
  return (
    <footer className={styles.footer}>
        <p className={styles.center}>
        To report this company, contact <a href="/contact" alt="<!-- Insert link to your profile -->">Serenity Seek</a>.
        </p>
    </footer>
  )
}

export default FooterSection