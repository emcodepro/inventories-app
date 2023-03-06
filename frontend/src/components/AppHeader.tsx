import React from "react";
import {Navbar, Container} from 'react-bootstrap';
import logo from '../assets/images/logo.svg';
import {Link} from 'react-router-dom';

const AppHeader = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link to="/" className="d-flex align-items-center text-decoration-none text-black">
                    <img
                        src={logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="Inventories logo"
                    />
                    <span style={{ fontSize: '1rem' }}>Inventories</span>
                </Link>
            </Container>
        </Navbar>
    );
}

export default AppHeader;