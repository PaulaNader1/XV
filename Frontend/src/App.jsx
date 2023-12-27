import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

// import '../public/styles/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Router, Routes } from "react-router-dom";
import Homepage from "./pages/HomePage";
import HomeAdmin from './pages/HomeAdmin';
import UpdateRole from "./pages/UpdateUserRole";
import DeleteUser from "./pages/deleteUser";
import Profile from "./pages/myProfile";
import Login from "./pages/login";
import Signup from "./pages/register";
import MFAPage from "./pages/mfaPage";
import KnowledgeBase from "./pages/KnowledgeBase";
import Ticket from "./pages/ticket";
import TicketsTable from "./pages/TicketsTable";
import RateTicket from "./pages/rateTicket";
import GetUsers from "./pages/getAllUsers";
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
          <Route path="/deleteUser" element={<DeleteUser />} />
          <Route path="/rateTicket" element={<RateTicket />} />
          <Route path="/getUsers" element={<GetUsers />} />
          <Route path="/tickets-dashboard" element={<TicketsTable />} />

      </Routes>
    </>
  );
}

export default App;
