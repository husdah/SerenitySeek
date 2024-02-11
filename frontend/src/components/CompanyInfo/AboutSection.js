import React from 'react'
import styles from '../../assets/css/companyInfo.module.css'

function AboutSection(props) {
  return (
    <section className={styles.page_content} id="about">
        <header className={styles.section_header}>
          <h2>About</h2>
          <p className={styles.lite_text}>What are we about?</p>
        </header>
        <p className={styles.para_text}>
         {props.description}
        </p>
    </section>
  )
}

export default AboutSection