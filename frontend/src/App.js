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
import Footer from "./components/Footer";
import Packages from "./components/Packages";
import SinglePackage from "./components/SinglePackage";
import Table from "./components/Table"

function App() {
  const { user } = useAuthContext()

  console.log('User condition:', user);
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Login" element={!user ? <LoggerComponent /> : <Navigate to="/" />} />
      <Route path="/Register/*" element={!user ? <Register /> : <Navigate to="/" />} />
      <Route path="/paymentTest" element={<PaymentTest/>}/>
      <Route path="/email-verification-success" element={<EmailVerificationSuccess/>} />
      <Route path="/password/reset-password/:userId/:token" element={<ResetPasswordForm/>} />
      <Route path="/password/reset-password/success" element={<ResetPasswordSuccess/>} />
      <Route path="/userProfile" element={user && jwtDecode(user.accessToken).user.role === 1  ? <UserProfile /> : <Navigate to="/" />} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/Footer" element={<Footer/>} />
      <Route path="/Package" element={<Packages/>} />
      <Route path="/Table" element={<Table/>} />
      <Route path="/SinglePackage/:packageId" element={<SinglePackage />} />
    </Routes>
    </>
  );
}

export default App;
