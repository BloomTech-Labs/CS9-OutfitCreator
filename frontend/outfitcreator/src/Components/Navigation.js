import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router';
import axios from 'axios';
import { ROOT_URL } from '../config';
import './Navigation.css';

class Navigation extends Component {
  signOut = () => {
    axios.get(`${ROOT_URL.API}/local-auth/logout`)
      .then(res => {
        localStorage.removeItem('authToken');
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
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
        <NavLink href='/' className='SignOut' onClick={this.signOut}>Sign Out</NavLink>
      </div>
    );
  }
}


export default withRouter(Navigation);