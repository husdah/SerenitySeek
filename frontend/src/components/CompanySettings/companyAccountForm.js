import React, {useState} from "react";
import styles from "../../assets/css/companyProfile.module.css";
import { useUpdatePassword } from '../../hooks/useUpdateCompanyPassword'; 
import validator from 'validator';

function CompanyAccountForm() {
  const { updatePassword, isLoading_pass} =useUpdatePassword();
  const [state, setState] = React.useState({
    password: "",
    confirmPassword: ""
  });

  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleReset = async (e) => {
    e.preventDefault();
  
    // Reset validation states
    setIsValidPassword(true);
    setIsValidConfirmPassword(true);

    const { password, confirmPassword } = state;

  
    let emptyValues = [];
    if (!password || validator.isEmpty(password) || !validator.isStrongPassword(password)) {
      emptyValues.push('password');
      setIsValidPassword(false);
    }
    if (!confirmPassword || validator.isEmpty(confirmPassword) || !validator.equals(confirmPassword, password)) {
      emptyValues.push('confirmPassword');
      setIsValidConfirmPassword(false);
    }
  
    // Check if there are no validation errors before calling signup
    if (emptyValues.length === 0 && isValidPassword && isValidConfirmPassword) {
      await updatePassword(password, confirmPassword);
  
      setState({
        password: "",
        confirmPassword: ""
      })
      setIsValidPassword(true);
      setIsValidConfirmPassword(true);
    }
  };  

  return (
    <div className={styles.form_container +" " +styles.sign_up_container}>
      <form className={styles.form} onSubmit={handleReset}>
        <h1 className={styles.h1}>Reset Password</h1>
        {/* <div className={styles.social_container}>
          <a href="#" className={styles.a +" " +styles.social}>
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className={styles.a +" " +styles.social}>
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className={styles.a +" " +styles.social}>
            <i className="fab fa-linkedin-in" />
          </a>
        </div> */}
        <span className={styles.span}>Enter a new password</span>

        <label className={styles.input_container}>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Password"
            onFocus={() => setIsValidPassword(true)}
            className={!isValidPassword ? styles.input_error : styles.input}
          />
          {!isValidPassword && <p className={styles.Rg_error}>Please enter a Strong Password.</p>}
        </label>

        <label className={styles.input_container}>
          <input
            type="password"
            name="confirmPassword"
            value={state.confirmPassword}
            onChange={handleChange}
            placeholder="confirm Password"
            onFocus={() => setIsValidConfirmPassword(true)}
            className={!isValidConfirmPassword ? styles.input_error : styles.input}
          />
          {!isValidConfirmPassword && <p className={styles.Rg_error}>Confirm Password</p>}
        </label>

        <button className={styles.button} disabled={isLoading_pass}>Reset</button>
      </form>
    </div>
  );
}

export default CompanyAccountForm;
