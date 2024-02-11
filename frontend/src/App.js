import React from "react";
import "./index.css";
import Home from "./Routes/Home";
import LoggerComponent from './Routes/Logger';
import Register from "./Routes/Register";
import EmailVerificationSuccess from "./Routes/EmailVerificationSuccess";
import ResetPasswordForm from "./Routes/ResetPassword";
import ResetPasswordSuccess from "./Routes/ResetPasswordSuccess";
import UserProfile from "./Routes/userProfile";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import PaymentTest from "./Routes/PaymentTest";
import {jwtDecode} from 'jwt-decode';
import Contact from "./components/Contact";
import TermsOfServices from "./Routes/TermsOfServices";
import Logout from "./Routes/Logout";
import Packages from "./pages/Packages";
import SinglePackage from "./pages/SinglePackage";
import CompanyDashboard from "./Routes/CompanyDashboard";
import NotFoundPage from "./Routes/404NotFound";
import ChatApp from "./Routes/ChatApp";
import CompanyInfo from "./Routes/CompanyInfo";

function App() {
  const { user } = useAuthContext()

  const renderLoginElement = () => {
    if (!user) {
      return <LoggerComponent />;
    } else {
      const role = jwtDecode(user.accessToken).user.role;
      if(role === 2){
        return <Navigate to="/Dashboard"/>;
      }else{
        return <Navigate to="/" />;
      }

      //add codition if admin
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
      <Route path="/password/reset-password/:userId/:token" element={<ResetPasswordForm/>} />
      <Route path="/password/reset-password/success" element={<ResetPasswordSuccess/>} />
      <Route path="/userProfile" element={user && jwtDecode(user.accessToken).user.role === 1  ? <UserProfile /> : <Navigate to="/" />} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/Package" element={<Packages/>} />
      <Route path="/Dashboard/*" element={user && jwtDecode(user.accessToken).user.role === 2  ? <CompanyDashboard /> : <Navigate to="/" />} />
      <Route path="/SinglePackage/:packageId" element={<SinglePackage />} />
      <Route path="/TermsOfServices" element={<TermsOfServices/>} />
      <Route path="/LogoutAndRedirect" element={user ? <Logout/> : <Navigate to="/Login" />} />
      <Route path="/ChatApp" element={user ? <ChatApp/> : <Navigate to="/Login" />} />
      <Route path="/CompanyInfo/*" element={<CompanyInfo/>} />
      
      {/* last route */}
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
    </>
  );
}

export default App;
