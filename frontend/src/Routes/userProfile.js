import Navbar from '../components/navbar/Navbar'
import Footer from '../components/Footer/Footer';
import UserInfo from '../components/UserInfo';

const UserProfile = () => {
    return (
        <>
            <Navbar nothome='true'/>
            <UserInfo />
            <Footer />
        </>
    );
};

export default UserProfile; 