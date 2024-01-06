// import '../public/styles/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import GenerateAnalytics from "./pages/analytics";
import DeleteUser from "./pages/deleteUser";
import GenerateReport from "./pages/generateReport";
import GetUsers from "./pages/getAllUsers";
import HomeAdmin from './pages/HomeAdmin';
import HomeAgent from "./pages/HomeAgent";
import HomeManager from "./pages/HomeManager";
import Homepage from "./pages/HomePage";
import KnowledgeBase from "./pages/KnowledgeBase";
import Login from "./pages/login";
import MFAPage from "./pages/mfaPage";
import Profile from "./pages/myProfile";
import RateTicket from "./pages/rateTicket";
import TicketsTable from "./pages/TicketsDashboard";
import Signup from "./pages/register";
import Ticket from "./pages/ticket";
import UpdateRole from "./pages/UpdateUserRole";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
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
        <Route path="/generateReport" element={<GenerateReport />} />
        <Route path="/generateAnalytics" element={<GenerateAnalytics />} />
        <Route path="/homemanager" element={<HomeManager />} />
        <Route path="/ticketsdashboard" element={<TicketsTable />} />
        <Route path="/homeagent" element={<HomeAgent />} />
      </Routes>

    </>
  );
}

export default App;