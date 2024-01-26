import React from "react";
import "./index.css";
import Home from "./Routes/Home";
import { Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Packages from "./components/Packages";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/contact" element={<Contact/>} />
      <Route path="/Footer" element={<Footer/>} />
      <Route path="/Package" element={<Packages/>} />
    </Routes>
    </>
  );
}

export default App;
