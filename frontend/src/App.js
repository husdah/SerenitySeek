import React from "react";
import "./index.css";
import Home from "./Routes/Home";
import Signup from "./Routes/Signup";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext()
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Signup" element={!user ? <Signup/> : <Navigate to="/" />}/>
      <Route path="/Login" element={!user ? <Login/> : <Navigate to="/" />}/>
      <Route path="/Register/*" element={<Register />} />
    </Routes>
    </>
  );
}

export default App;
