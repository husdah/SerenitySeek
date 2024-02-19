import { useLogout } from '../hooks/useLogout'

const Logout = () => {
    const {logout} = useLogout();

    logout();
    return (
        <div>
            Logout
        </div>
    );
}

export default Logout