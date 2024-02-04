import { useState } from 'react';
import Swal from 'sweetalert2';
import {jwtDecode} from 'jwt-decode';
import { useAuthContext } from '../hooks/useAuthContext'

export const useUpdatePassword = () => {
    const [error_pass, setError] = useState(null);
    const [isLoading_pass, setIsLoading] = useState(null);
    const { user, dispatch } = useAuthContext();

    const updatePassword = async (password, confirmPassword) => {
        setIsLoading(true);
        setError(null);

        try {
            let companyId = jwtDecode(user.accessToken).user.id;
            const response = await fetch(`http://localhost:4000/api/companyUpdatePassword/${companyId}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.accessToken}`
                },
                body: JSON.stringify({ password, confirmPassword}),
                credentials: 'include'
            });

            const newAccessToken = response.headers.get('New-Access-Token');
            // Check if a new access token is present
            if (newAccessToken) {
                // Update the access token in LocalStorage
                user.accessToken = newAccessToken;
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({type: 'LOGIN', payload: user})
                console.log('New access token saved:', newAccessToken);
            }

            const json = await response.json();
            if (json.expired) {
                // Handle expiration of refreshToken on the client side
                window.location.href = 'http://localhost:3000/LogoutAndRedirect';
            }

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
            }

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    return { updatePassword, isLoading_pass, error_pass };
};