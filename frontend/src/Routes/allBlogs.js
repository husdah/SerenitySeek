import Navbar from '../components/navbar/Navbar'
import Footer from '../components/Footer/Footer';
import AllBlogMain from '../components/Blogs/AllBlog';

const AllBlogs = () => {

  return (
    <div>
        <Navbar nothome='true' />
        <AllBlogMain />
        <Footer />
    </div>
  );
};

export default AllBlogs;