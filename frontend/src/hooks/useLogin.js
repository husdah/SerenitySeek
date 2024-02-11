import { useState } from 'react'
import { useAuthContext } from './useAuthContext';
import Swal from 'sweetalert2';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch }  = useAuthContext();

    const login = async (email, password) =>{
        setIsLoading(true)
        setError(null)

        try{
            const response = await fetch('http://localhost:4000/api/login', {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
                credentials: 'include'
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
                localStorage.setItem('user', JSON.stringify(json))
                dispatch({type: 'LOGIN', payload: json})
            }
    
            setIsLoading(false)
        }catch(error){
            setError(error.message)
            setIsLoading(false)
        }
    }

  return { login, error, isLoading}
}