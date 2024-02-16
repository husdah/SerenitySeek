import PageWraper from "../components/CompanyInfo/PageWraper";
import { useLocation } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'

const CompanyInfo = () => {
  const location = useLocation();
  const companyName = new URLSearchParams(location.search).get('companyName');

  return (
    <div>
        <Navbar nothome='true' />
        <PageWraper heading={companyName}/>
    </div>
  );
};

export default CompanyInfo;