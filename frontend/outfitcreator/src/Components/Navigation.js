import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './Navigation.css';

class Navigation extends Component {
  render() {
    return (
      <div className="Navigation">
        <Nav vertical className="SideNav">
          <NavItem>
            <NavLink href="/Create" className="Create">Create</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Upload" className="Upload">Upload</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Archive" className="Archive">Archive</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Settings" className="Settings">Settings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Billing" className="Billing">Billing</NavLink>
          </NavItem>
        </Nav>
        <NavLink href="/Landing" className="SignOut">Sign Out</NavLink>
      </div>
    );
  }
}

export default Navigation;