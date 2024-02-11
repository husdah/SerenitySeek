import React from 'react'
import styles from '../../assets/css/companyInfo.module.css'
import logoPlaceHolder from '../../assets/images/clogoHolder.png'

function HeaderSection(props) {
  return (
    <div className={styles.title}>
        <h1 alt="title">
          <a href="#">
            <img crossOrigin="anonymous" src={props.logo ? 'http://localhost:4000/uploads/' +props.logo : logoPlaceHolder} alt="Rugged Room Logo" />
            <br />
            {props.title}
          </a>
        </h1>
    </div>
  )
}

export default HeaderSection