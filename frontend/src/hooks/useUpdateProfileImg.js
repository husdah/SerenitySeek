import Swal from 'sweetalert2';
import {jwtDecode} from 'jwt-decode';
import { useAuthContext } from '../hooks/useAuthContext'

export const useUpdateProfileImg = () => {
    const { user, dispatch } = useAuthContext();

    const updateProfilePic = async (profilePic) => {
        try {
            const formData = new FormData();
            formData.append('profilePic', profilePic);
            let userId = jwtDecode(user.accessToken).user.id;
            const response = await fetch(`http://localhost:4000/api/uploadUserPic/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                },
                body: formData,
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

                return json.newProfilePic;
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return { updateProfilePic };
};