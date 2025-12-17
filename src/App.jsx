import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import './App.css';
import ShowMessage from "./Components/ShowMessage.jsx";
import CreateMessage from "./Components/CreateMessage.jsx";
import { Navbar, Nav, Container } from "react-bootstrap";

function App() {
    return (
        <BrowserRouter>
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 rounded">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        Secret-Message
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Create</Nav.Link>
                            <Nav.Link as={Link} to="/show">Show</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<CreateMessage />} />
                <Route path="/show/:uuid" element={<ShowMessage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;