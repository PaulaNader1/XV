import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// import '../public/styles/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route  , Router, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import HomeAdmin from './pages/HomeAdmin';
import UpdateRole from "./pages/UpdateUserRole";
import Checkout from "./pages/checkoutPage";
import Profile from "./pages/myProfile";
import Login from "./pages/login";
import Signup from "./pages/register";
import MFAPage from "./pages/mfaPage";
import KnowledgeBase from "./pages/KnowledgeBase";
import Ticket from "./pages/ticket";
import React from 'react';
import GenerateReport from './pages/generateReport';
import GenerateAnalytics from './pages/generateAnalytics';

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/mfa" element={<MFAPage />} />
          <Route path="/KnowledgeBase" element={<KnowledgeBase />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/homeadmin" element={<HomeAdmin />} />
          <Route path="/update-role" element={<UpdateRole />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/generateReport" element={<GenerateReport />} />
          <Route path="/generateAnalytics" element={<GenerateAnalytics />} />
        </Routes>
    </>
  );
}

export default App;
