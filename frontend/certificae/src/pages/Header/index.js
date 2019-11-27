import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const Header = () => (
    <div className="navbar">
       <Navbar.Brand href="#home" className="links_">Certificaê</Navbar.Brand>
        
        
        <Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button className="search_button">Search</Button>
            </Form> 
        </Nav>

        <Nav className="justify-content-end">
            <Nav.Link href="#sobre" className="links_">SOBRE</Nav.Link>
            <Nav.Link href="#entrar" className="links_">ENTRAR</Nav.Link>
            <Nav.Link href="#registrar" className="links_">REGISTRAR</Nav.Link>
        </Nav>
            
    </div>
);

export default Header;