import { useState } from 'react';
import Swal from 'sweetalert2';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
  
    const signup = async (name, description, location, phoneNumber, email, password, confirmPassword, licenseFile, onSuccess) => {
      setIsLoading(true);
      setError(null);
  
      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('phoneNumber', phoneNumber);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('license', licenseFile);
  
        const response = await fetch('http://localhost:4000/api/company', {
          method: 'POST',
          body: formData,
        });
  
        const json = await response.json();
  
        if (!response.ok) {
          setError(json.error);

          Swal.fire({
            title: 'Warning!',
            text: json.error,
            icon: 'warning',
            confirmButtonText: 'OK',
          });

        } else {
          // Display SweetAlert upon successful registration
          Swal.fire({
            title: 'Success!',
            text: json.message,
            icon: 'success',
            confirmButtonText: 'OK',
          });
  
          // Call the onSuccess callback to handle additional actions on success
          onSuccess();
        }
  
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };
  
    return { signup, isLoading, error };
};  