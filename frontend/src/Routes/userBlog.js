import Navbar from '../components/navbar/Navbar'
import Footer from '../components/Footer/Footer';
import UserBlogMain from '../components/Blogs/userBlogs';

const UserBlogs = () => {

  return (
    <div>
        <Navbar nothome='true' />
        <UserBlogMain />
        <Footer />
    </div>
  );
};

export default UserBlogs;