import React from 'react'
import styles from '../assets/css/TermsOfServices.module.css'

function TermsServices() {
  return (
    <section id="terms-of-service">
        <div className={styles.card}>
            <h1 className={styles.primary_heading}>Terms of Service</h1>
            <p className={styles.paragraph}>
                1- Welcome to <span className={styles.bold}>Serenity Seek Website</span>, a platform connecting travel agencies with potential customers. By using our services, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, please refrain from using our website.

                <br/><br/>

                2- Our platform is designed for travel agencies seeking to showcase and promote their travel and tour packages. To use our services, travel agencies <span className={styles.bold}>must apply</span> for an account on our website. We reserve the right to review and approve or reject any application at our discretion.

                <br/><br/>

                3- <span className={styles.bold}>Once approved</span>, travel agencies are granted permission to upload and manage their travel and tour packages on our platform. It is the responsibility of the travel agency to provide accurate and up-to-date information about their offerings.

                <br/><br/>

                4- Users of our website can view the travel and tour packages listed by registered travel agencies. They can book these packages directly through our platform. <span className={styles.bold}>By booking a package</span>, users enter into a contractual agreement with the respective travel agency.

                <br/><br/>

                5- Serenity Seek Website acts as an intermediary and charges a service fee of <span className={styles.bold}>5% on the total cost</span> of each booking. This fee is deducted from the payment made by the user to the travel agency.

                <br/><br/>

                6- Payments made through our platform are <span className={styles.bold}>processed securely</span>. Serenity Seek Website is not responsible for any issues related to payment transactions, including but not limited to errors, fraud, or unauthorized transactions.

                <br/><br/>

                7- Travel agencies using our platform must comply with all applicable laws and regulations. Any violation may result in the suspension or termination of the agency's account on our website.

                <br/><br/>

                8- Serenity Seek Webiste reserves the right to modify, <span className={styles.bold}>suspend, or terminate</span> any aspect of the platform at any time without prior notice. We may also update these terms of service, and it is the responsibility of users and travel agencies to review them periodically.

                <br/><br/>

                9- Users and travel agencies acknowledge that Serenity Seek Webiste <span className={styles.bold}>does not guarantee the accuracy</span>, availability, or quality of the travel and tour packages listed on the platform. Users are encouraged to communicate directly with travel agencies to address any concerns.

                <br/><br/>

                10- Serenity Seek Website is <span className={styles.bold}>not liable for any damages, losses</span>, or disputes arising from interactions between users and travel agencies on the platform.

                <br/><br/>

                11- By using our services, you agree to our <span className={styles.bold}>Privacy Policy</span>, which outlines how we collect, use, and protect your personal information.

                <br/><br/>

                12- These <span className={styles.bold}>terms of service</span> constitute the entire agreement between users, travel agencies, and Serenity Seek Website.

            </p>

        </div>
    </section>
  )
}

export default TermsServices