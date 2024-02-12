import PageWraper from "../components/CompanyInfo/PageWraper";
import { useLocation } from 'react-router-dom'

const CompanyInfo = () => {
  const location = useLocation();
  const companyName = new URLSearchParams(location.search).get('companyName');

  return (
    <div>
       <PageWraper heading={companyName}/>
    </div>
  );
};

export default CompanyInfo;