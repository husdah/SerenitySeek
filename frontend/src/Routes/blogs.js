import Navbar from '../components/navbar/Navbar'
import Footer from '../components/Footer/Footer';
import BlogsMain from '../components/Blogs/Blogs';

const Blogs = () => {

  return (
    <div>
        <Navbar nothome='true' />
        <BlogsMain />
        <Footer />
    </div>
  );
};

export default Blogs;