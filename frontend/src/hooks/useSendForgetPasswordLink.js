import { useState } from 'react'
import Swal from 'sweetalert2';

export const useSendForgetPasswordLink= () => {
    const [reset_error, setError] = useState(null);
    const [reset_isLoading, setIsLoading] = useState(null);

    const sendForgetPasswordLink = async (email) =>{
        setIsLoading(true)
        setError(null)

        try{
            const response = await fetch('http://localhost:4000/password/forget-password', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email})
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
                    confirmButtonText: 'OK',
                });
            }
    
            setIsLoading(false)
        }catch(error){
            setError(error.message)
            setIsLoading(false)
        }
    }

  return { sendForgetPasswordLink, reset_error, reset_isLoading}
}