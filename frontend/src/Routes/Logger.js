import React, { useState, useEffect } from 'react';
import styles from '../assets/css/Login.module.css'; 
import { useLogin } from '../hooks/useLogin';
import { useSendForgetPasswordLink } from '../hooks/useSendForgetPasswordLink';
import validator from 'validator';
import { Link } from 'react-router-dom';

const LoggerComponent = (props) => {
  const [mode, setMode] = useState(props.mode || 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();
  const { sendForgetPasswordLink, reset_error} = useSendForgetPasswordLink();

  const [isValidEmail, setIsValidEmail] = useState(true)
  const [isValidPassword, setIsValidPassword] = useState(true)

  const toggleMode = () => {
    const newMode = mode === 'login' ? 'reset' : 'login';
    setMode(newMode);
    setEmail('');
    setPassword('');
    setIsValidEmail(true);
    setIsValidPassword(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsValidEmail(true);
    setIsValidPassword(true);

    let emptyFields = [];

    if (!email || validator.isEmpty(email)) {
      setIsValidEmail(false);
      emptyFields.push('email');
    }
    if (!password || validator.isEmpty(password)) {
      setIsValidPassword(false);
      emptyFields.push('password');
    }

    // Check if there are no validation errors before calling login
    if (emptyFields.length === 0) {
      await login(email, password);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();

    setIsValidEmail(true);

    let emptyFields = [];

    if (!email || validator.isEmpty(email)) {
      setIsValidEmail(false);
      emptyFields.push('email');
    }
    // Check if there are no validation errors before calling login
    if (emptyFields.length === 0) {
      await sendForgetPasswordLink(email);
    }
  };

  useEffect(() => {
    // Additional logic you may want to run on mode change
  }, [mode]);

  return (
    <div className={`${styles.Lg_app} ${styles[`Lg_app_is_${mode}`]}`}>
      <div className={`${styles.Lg_form_block_wrapper} ${styles[`Lg_form_block_wrapper_is_${mode}`]}`}>
        <section className={`${styles.Lg_form_block} ${styles[`Lg_form_block_is_${mode}`]} ${mode === 'reset' ? styles['slide_in'] : ''}`}>
          <header className={styles.Lg_form_block__header}>
            <h1>{mode === 'login' ? 'Welcome back!' : 'Reset Password'}</h1>
            <div className={styles.Lg_form_block__toggle_block}>
              <span>{mode === 'login' ? 'Forget Your Password?' : 'Back to Login?'} Click here &#8594;</span>
              <input id="form_toggler" className={styles.Lg_inputCheckbox} type="checkbox" onClick={toggleMode} />
              <label htmlFor="form_toggler"></label>
            </div>
          </header>

          <form onSubmit={mode === 'login' ? handleLogin : handleReset}>
            <div className={`${styles.Lg_form_group} ${styles[`form_group_${mode}`]}`}>
              {mode === 'login' && (
                <>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    onChange={handleInputChange}
                    value={email}
                    disabled={mode === 'reset'}
                    className={!isValidEmail ? `${styles.Lg_form_group__input_error} ${styles.Lg_form_group__input}` : styles.Lg_form_group__input}
                    onFocus={() => setIsValidEmail(true)}
                  />
                  {!isValidEmail && <p className={styles.Lg_errorMsg}>Please enter your email.</p>}
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    onChange={handleInputChange}
                    value={password}
                    disabled={mode === 'reset'}
                    className={!isValidPassword ? `${styles.Lg_form_group__input_error} ${styles.Lg_form_group__input}` : styles.Lg_form_group__input}
                    onFocus={() => setIsValidPassword(true)}
                  />
                  {!isValidPassword && <p className={styles.Lg_errorMsg}>Please enter your password.</p>}
                </>
              )}
              {mode === 'reset' && (
                <>
                  <input 
                    type="email" 
                    id="resetEmail" 
                    name='email'
                    onChange={handleInputChange}
                    value={email}
                    disabled={mode === 'login'}
                    placeholder="email"
                    onFocus={() => setIsValidEmail(true)}
                    className={!isValidEmail ? `${styles.Lg_form_group__input_error} ${styles.Lg_form_group__input}` : styles.Lg_form_group__input}
                  />
                  {!isValidEmail && <p className={styles.Lg_errorMsg}>Please enter your email.</p>}
                </>
              )}
            </div>
            <button className={`${styles.Lg_button} ${styles['Lg_button_primary']} ${styles.Lg_full_width}`} type="submit" disabled={isLoading}>
            {mode === 'login' ? 'Log In' : 'Send Email'}
            </button>
            {error && <div className={styles.Lg_error}>{error}</div>}
            {reset_error && <div className={styles.Lg_error}>{reset_error}</div>}
            <div className={styles.Lg_form_block__toggle_block}>
            <span>Don't Have an Account? <Link className={styles.Lg_Link} to="/Register">Click Here</Link></span>
            </div>
        </form>
      </section>
    </div>
  </div>
  );
};

export default LoggerComponent;