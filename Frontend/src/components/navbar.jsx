import { Link, Route, Routes } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
export default function AppNavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
    <Nav>
      <Nav.Item>
        <Link to="/home">Home      .</Link>  
      </Nav.Item>
      <Nav.Item>
        <Link to="/KnowledgeBase">KnowledgeBase       .</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/ticket">Tickets       .</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/profile">My Profile       .</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/rateTicket">Rate Ticket       .</Link>
      </Nav.Item>
    </Nav>

    </Container>
    </Navbar>
  );
}
