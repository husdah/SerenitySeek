import { useState } from 'react';
import Swal from 'sweetalert2';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const signup = async (Fname, Lname, phoneNumber, email, password, confirmPassword, onSuccess) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:4000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Fname, Lname, phoneNumber, email, password, confirmPassword })
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
                Swal.fire({
                    title: 'Warning!',
                    text: json.error,
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
            }
            if(response.ok){
                Swal.fire({
                    title: 'Success!',
                    text: json.message,
                    icon: 'success',
                    confirmButtonText: 'OK'
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