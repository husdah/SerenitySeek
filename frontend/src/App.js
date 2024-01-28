import React from "react";
import "./index.css";
import Home from "./Routes/Home";
import Signup from "./Routes/Signup";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import PaymentTest from "./Routes/PaymentTest";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Packages from "./components/Packages";
import SinglePackage from "./components/SinglePackage";

function App() {
  const { user } = useAuthContext()
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Signup" element={!user ? <Signup/> : <Navigate to="/" />}/>
      <Route path="/Login" element={!user ? <Login/> : <Navigate to="/" />}/>
      <Route path="/Register/*" element={<Register />} />
      <Route path="/paymentTest" element={<PaymentTest/>}/>
      <Route path="/contact" element={<Contact/>} />
      <Route path="/Footer" element={<Footer/>} />
      <Route path="/Package" element={<Packages/>} />
      <Route path="/SinglePackage/:packageId" element={<SinglePackage />} />
    </Routes>
    </>
  );
}

export default App;
