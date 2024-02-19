import React, { useState } from 'react';
import { useResetPassword } from '../../hooks/useResetPassword';
import validator from 'validator';
import styles from '../../assets/css/Login.module.css';  // Import the CSS module

const ResetPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { ResetPassword, error, isLoading } = useResetPassword();

  const [isValidPassword, setIsValidPassword] = useState(true)
  const [isValidConfPassword, setIsValidConfPassword] = useState(true)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setIsValidPassword(true);
    setIsValidConfPassword(true);

    let emptyFields = [];

    if (!password || validator.isEmpty(password) || !validator.isStrongPassword(password)) {
      emptyFields.push('password');
      setIsValidPassword(false);
    }
    if (!confirmPassword || validator.isEmpty(confirmPassword) || !validator.equals(confirmPassword, password)) {
      emptyFields.push('confirmPassword');
      setIsValidConfPassword(false);
    }
    // Check if there are no validation errors before calling login
    if (emptyFields.length === 0 && isValidPassword && isValidConfPassword) {
      await ResetPassword(password, confirmPassword);
    }
  };

  return (
    <div className={`${styles.Lg_app} ${styles['Lg_app_is_reset']}`}>
      <div className={`${styles.Lg_form_block_wrapper} ${styles['Lg_form_block_wrapper_is_reset']}`}>
        <section className={`${styles.Lg_form_block} ${styles['Lg_form_block_is_reset']}`}>
          <header className={styles.Lg_form_block__header}>
            <h1>Reset Password</h1>
          </header>

          <form onSubmit={handleResetPassword}>
            <div className={`${styles.Lg_form_group} ${styles['form_group_reset']}`}>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="new password"
                onChange={handleInputChange}
                value={password}
                className={!isValidPassword ? `${styles.Lg_form_group__input_error} ${styles.Lg_form_group__input}` : styles.Lg_form_group__input}
                onFocus={() => setIsValidPassword(true)}
              />
              {!isValidPassword && <p className={styles.Lg_errorMsg}>Please enter a Strong password.</p>}

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="confirmPassword"
                onChange={handleInputChange}
                value={confirmPassword}
                className={!isValidConfPassword ? `${styles.Lg_form_group__input_error} ${styles.Lg_form_group__input}` : styles.Lg_form_group__input}
                onFocus={() => setIsValidConfPassword(true)}
              />
              {!isValidConfPassword && <p className={styles.Lg_errorMsg}>Confirm Your Passowrd.</p>}
            </div>
            <button className={`${styles.Lg_button} ${styles['Lg_button_primary']} ${styles.Lg_full_width}`} type="submit" disabled={isLoading}>
              Reset
            </button>
            {error && <div className={styles.Lg_error}>{error}</div>}
          </form>
        </section>
      </div>
    </div>
  );
};

export default ResetPasswordForm;