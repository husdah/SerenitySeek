import { useAuthContext} from './useAuthContext'
// here still missing imports to dispatch other rrlated context of the user
export const useLogout = () =>{
    const { dispatch } = useAuthContext()
    //const { user } = useAuthContext()
    
    const logout = async () =>{

/*         const response = await fetch('http://localhost:4000/api/logout',{
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }
        })

        if(response.ok){
            localStorage.removeItem('user')
            //dispatch({type: 'LOGOUT'})
        } */

        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
    }

    return { logout }
}