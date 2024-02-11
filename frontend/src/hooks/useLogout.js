import { useAuthContext} from './useAuthContext'
import Swal from 'sweetalert2';
// here still missing imports to dispatch other rrlated context of the user
export const useLogout = () =>{
    const { dispatch } = useAuthContext()
    const { user } = useAuthContext()
    
    const logout = async () =>{

        const response = await fetch('http://localhost:4000/api/logout',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.accessToken}`
            },
            credentials: 'include'
        })

        const json = await response.json()

        if(!response.ok){
            Swal.fire({
                title: 'Warning!',
                text: json.error,
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }

        if(response.ok){
            localStorage.removeItem('user')
            dispatch({type: 'LOGOUT'})
        }
    }

    return { logout }
}