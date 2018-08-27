import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { withRouter } from 'react-router';
import { ROOT_URL } from '../../config';
import './Navigation.css';

class Navigation extends Component {
  signOut = () => {
    localStorage.removeItem('authToken');
  }
  
  render() {
    return (
      <div className='Navigation'>
        <Breadcrumb className='BreadCrumbs' tag="nav">
          <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
          <BreadcrumbItem active tag="span">{this.props.location.pathname.slice(1)}</BreadcrumbItem>
        </Breadcrumb>
        <Nav className='SideNav'>
          <NavLink href='/Create' className='Create'>Create</NavLink>
          <NavLink href='/Upload' className='Upload'>Upload</NavLink>
          <NavLink href='/Archive' className='Archive'>Archive</NavLink>
          <NavLink href='/Settings' className='Settings'>Settings</NavLink>
          <NavLink href='/Billing' className='Billing'>Billing</NavLink>
          <NavLink href='/' className='SignOut' onClick={this.signOut}>Sign Out</NavLink>
        </Nav>
      </div>
    );
  }
}


export default withRouter(Navigation);