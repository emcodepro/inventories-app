import React from "react";
import {Navbar, Container} from 'react-bootstrap';
import logo from '../assets/images/logo.svg';

const AppHeader = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home" className="d-flex align-items-center">
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="Inventories logo"
                    />
                    <span style={{ fontSize: '1rem' }}>Inventories</span>
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default AppHeader;