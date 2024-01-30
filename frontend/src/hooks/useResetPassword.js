import { useState } from 'react'
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

export const useResetPassword= () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { userId, token } = useParams();

    const ResetPassword = async (password,confirmPassword) =>{
        setIsLoading(true)
        setError(null)

        try{
            const response = await fetch(`http://localhost:4000/password/reset-password/${userId}/${token}`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({password, confirmPassword})
            })
    
            const json = await response.json()
    
            if(!response.ok){
                setError(json.error)
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

                if (json.redirectTo) {
                    window.location.href = json.redirectTo;
                }
            }
    
            setIsLoading(false)
        }catch(error){
            setError(error.message)
            setIsLoading(false)
        }
    }

  return { ResetPassword, error, isLoading}
}