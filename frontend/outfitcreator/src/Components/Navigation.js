import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import { withRouter } from 'react-router';
import { ROOT_URL } from '../config';
import './Navigation.css';

class Navigation extends Component {
  signOut = () => {
    localStorage.removeItem('authToken');
    window.location = `${ROOT_URL.WEB}/`;
  }
  
  render() {
    return (
      <div className='Navigation'>
        <div className='BreadCrumbs'>
          <a href='/' className='Home'>Home</a> > {this.props.location.pathname.slice(1)}
        </div>
        <Nav vertical className='SideNav'>
          <NavItem>
            <NavLink href='/Create' className='Create'>Create</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/Upload' className='Upload'>Upload</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/Archive' className='Archive'>Archive</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/Settings' className='Settings'>Settings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/Billing' className='Billing'>Billing</NavLink>
          </NavItem>
        </Nav>
        <Button className='SignOut' onClick={this.signOut}>Sign Out</Button>
      </div>
    );
  }
}


export default withRouter(Navigation);