import React from "react";
import "./index.css";
import Home from "./Routes/Home";
import LoggerComponent from './Routes/Logger';
import Register from "./Routes/Register";
import EmailVerificationSuccess from "./Routes/EmailVerificationSuccess";
import ResetPassword from "./Routes/ResetPassword";
import UserProfile from "./Routes/userProfile";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import PaymentTest from "./Routes/PaymentTest";
import {jwtDecode} from 'jwt-decode';
import ContactUs from "./pages/ContactUs";
import TermsOfServices from "./Routes/TermsOfServices";
import Logout from "./Routes/Logout";
import Packages from "./pages/Packages";
import SinglePackage from "./pages/SinglePackage";
import CompanyDashboard from "./Routes/CompanyDashboard";
import NotFoundPage from "./Routes/404NotFound";
import ChatApp from "./Routes/ChatApp";
import CompanyInfo from "./Routes/CompanyInfo";
import Blogs from "./Routes/blogs";
import AllBlogs from "./Routes/allBlogs";
import UserBlogs from "./Routes/userBlog";
import AdminDashboard from "./Routes/AdminDashboard";

function App() {
  const { user } = useAuthContext()

  const renderLoginElement = () => {
    if (!user) {
      return <LoggerComponent />;
    } else {
      const role = jwtDecode(user.accessToken).user.role;
      if(role === 2){
        return <Navigate to="/Dashboard"/>;
      }else if(role === 0){
        return <Navigate to="/AdminDashboard"/>;
      }else{
        return <Navigate to="/" />;
      }
    }
  };

  console.log('User condition:', user);
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Login" element={renderLoginElement()} />
      <Route path="/Register/*" element={!user ? <Register /> : <Navigate to="/" />} />
      <Route path="/paymentTest" element={<PaymentTest/>}/>
      <Route path="/email-verification-success" element={<EmailVerificationSuccess/>} />
      <Route path="/password/reset-password/*" element={<ResetPassword/>} />
      <Route path="/userProfile" element={user && jwtDecode(user.accessToken).user.role === 1  ? <UserProfile /> : <Navigate to="/" />} />
      <Route path="/contact" element={<ContactUs/>} />
      <Route path="/Package" element={<Packages/>} />
      <Route path="/Dashboard/*" element={user && jwtDecode(user.accessToken).user.role === 2  ? <CompanyDashboard /> : <Navigate to="/" />} />
      <Route path="/SinglePackage/:packageId" element={<SinglePackage />} />
      <Route path="/blogs" element={user && jwtDecode(user.accessToken).user.role === 1  ? <Blogs/> : <Navigate to="/" />} />
      <Route path="/allBlogs" element={< AllBlogs />} />
      <Route path="/userBlogs/*" element={< UserBlogs />} />
      <Route path="/TermsOfServices" element={<TermsOfServices/>} />
      <Route path="/LogoutAndRedirect" element={user ? <Logout/> : <Navigate to="/Login" />} />
      <Route path="/ChatApp" element={user ? <ChatApp/> : <Navigate to="/Login" />} />
      <Route path="/CompanyInfo/*" element={<CompanyInfo/>} />
      <Route path="/AdminDashboard/*" element={user && jwtDecode(user.accessToken).user.role === 0  ?< AdminDashboard/> : <Navigate to="/" />} />
      
      {/* last route */}
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
    </>
  );
}

export default App;
