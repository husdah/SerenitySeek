import React from "react";
import "./index.css";
import Home from "./Routes/Home";
import { Route, Routes } from "react-router-dom";
import PaymentTest from "./Routes/PaymentTest";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/paymentTest" element={<PaymentTest/>}/>

    </Routes>
    </>
  );
}

export default App;
