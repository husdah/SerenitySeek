import { useState } from 'react';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const signup = async (Fname, Lname, phoneNumber, email, password, confirmPassword) => {
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
            }
            if(response.ok){
                setError(json.message);
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    return { signup, isLoading, error };
};