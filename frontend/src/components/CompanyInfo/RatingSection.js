import React, { useEffect } from 'react'
import styles from '../../assets/css/companyInfo.module.css'
import starStyles from '../../assets/css/ratingStar.module.css'
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useRateCompany } from '../../hooks/useRateCompany';

function RatingSection(props) {
    const [rating, setRating] = useState(null);
    const [hoverFill, setHoverFill] = useState(null);
    const [isHover, setIsHover] = useState(null);

    const [propsRating, setPropsRating] = useState(null);

    const { rateCompany } = useRateCompany()

    const getReviewLabel = (rating) => {
        switch (rating) {
          case 1:
            return `Very bad ${String.fromCodePoint("0x1F922")}`;
          case 2:
            return `Bad ${String.fromCodePoint("0x1F97A")}`;
          case 3:
            return `Okay ${String.fromCodePoint("0x1F60C")}`;
          case 4:
            return `Good ${String.fromCodePoint("0x1F60A")}`;
          case 5:
            return `Excellent ${String.fromCodePoint("0x1F929")}`;
    
          default:
            return "";
        }
      };

      useEffect(() =>{
        if(rating){

          const handleRatingChange = async () => {
            const newRating = await rateCompany(props.companyName,rating)
            if(newRating){
              setPropsRating(newRating)
            }
        };

        handleRatingChange();
        }
      },[rating])

  return (
    <section className={styles.page_content +" " +starStyles.conatiner} id="rating">
        <header className={styles.section_header}>
          <h2>Rate us</h2>
          <p className={styles.lite_text}>Company Rating : {propsRating || props.rating || 0}</p>
        </header>

        <div className={starStyles.star_wrapper}>
            <h2 className={starStyles.review_label}>
              {getReviewLabel(isHover > 0 ? isHover : rating)}
            </h2>

            <div className={starStyles.star}>
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;

                return (
                  <button
                    key={index}
                    onMouseOver={() => setIsHover(ratingValue)}
                    onMouseOut={() => setIsHover(null)}
                    onMouseEnter={() => setHoverFill(ratingValue)}
                    onMouseLeave={() => setHoverFill(null)}
                    onClick={() => setRating(ratingValue)}
                  >
                    <FaStar
                      className={starStyles.FaStar}
                      size={80}
                      style={{
                        color:
                          ratingValue <= (hoverFill || rating)
                            ? "#FFB100"
                            : "#ccc",
                      }}
                      onChange={(ratingValue) => setRating(ratingValue)}
                      value={ratingValue}
                    />
                  </button>
                );
              })}
            </div>
        </div>

    </section>
  )
}

export default RatingSection