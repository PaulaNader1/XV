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
        <Link to="/homeadmin">Home       .</Link>  
      </Nav.Item>
      <Nav.Item>
        <Link to="/update-role">update role       .</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/deleteUser">Delete User     .</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to="/getUsers">getUsers       .</Link>
      </Nav.Item>
    </Nav>

    </Container>
    </Navbar>
  );
}
