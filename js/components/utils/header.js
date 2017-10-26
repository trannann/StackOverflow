import React from 'react';

import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


export default class Header extends React.Component {
  render() {
    return (
        <Navbar inverse>
            <Navbar.Header>
                <Navbar.Brand>
                    <span style={{paddingLeft: '1em'}}><a href="/Patients" style={{ textDecoration: 'none' }}><font color="white">FNO - Urgent</font></a></span>
                </Navbar.Brand>
                <Nav>
                    {/* <LinkContainer to="/Domu">
                        <NavItem eventKey={1}>Domu</NavItem>
                    </LinkContainer> */}
                    <LinkContainer to="/Patients">
                        <NavItem eventKey={2}>Patients</NavItem>
                    </LinkContainer>
                    <LinkContainer to="/Tags">
                        <NavItem eventKey={3}>Tags</NavItem>
                    </LinkContainer>
                </Nav>
                
            </Navbar.Header>
            <Nav pullRight>
                <NavItem eventKey={1} href="/login">Logout</NavItem>
            </Nav>
        </Navbar>
    );
  }
}