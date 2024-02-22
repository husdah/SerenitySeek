import Swal from 'sweetalert2';
import { useAuthContext } from '../hooks/useAuthContext'

export const useUpdateAdminPassword = () => {
    const { user, dispatch } = useAuthContext();

    const updatePassword = async (password, confirmPassword) => {

        try {
            const response = await fetch(`http://localhost:4000/api/adminUpdatePasword`, {
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
        } catch (error) {
            console.log(error.message);
        }
    };

    return { updatePassword };
};