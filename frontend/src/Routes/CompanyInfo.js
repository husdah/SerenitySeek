import PageWraper from "../components/CompanyInfo/PageWraper";
import { useLocation } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/Footer/Footer';

const CompanyInfo = () => {
  const location = useLocation();
  const companyName = new URLSearchParams(location.search).get('companyName');

  return (
    <div>
        <Navbar nothome='true' />
        <PageWraper heading={companyName}/>
        <Footer />
    </div>
  );
};

export default CompanyInfo;