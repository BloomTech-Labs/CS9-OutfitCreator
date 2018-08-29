import React, { Component } from 'react';
import { Collapse, Nav, NavLink, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { withRouter } from 'react-router';
import './Navigation.css'; 

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    const navMin = document.querySelector('.navigation--minimize');
    const sideNav = document.querySelector('.navigation--sideNav');
    const delay = 200;

    if (this.state.collapsed) {
      navMin.classList.toggle('change');
      sideNav.style.top = '40px';
      setTimeout(() => {
        navMin.classList.toggle('cross');
      }, delay);
    } else {
      navMin.classList.toggle('cross');
      setTimeout(() => {
        sideNav.style.top = '0px';
        navMin.classList.toggle('change');
      }, delay);
    }

    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  signOut = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  }
  
  render() {
    return (
      <div className='navigation--container'>
        <div className='navigation--dresser'>
           <div className='navigation--minimize' onClick={this.toggleNavbar}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
        <Breadcrumb className='navigation--breadCrumbs' tag="nav">
          <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
          <BreadcrumbItem active tag="span">{this.props.location.pathname.slice(1)}</BreadcrumbItem>
        </Breadcrumb>
        <Nav className='navigation--sideNav'>
          <Collapse isOpen={!this.state.collapsed}>
            <NavLink href='/Create' className='Create'>Create</NavLink>
            <NavLink href='/Upload' className='Upload'>Upload</NavLink>
            <NavLink href='/Archive' className='Archive'>Archive</NavLink>
            <NavLink href='/Settings' className='Settings'>Settings</NavLink>
            <NavLink href='/Billing' className='Billing'>Billing</NavLink>
            <NavLink href='/' className='SignOut' onClick={this.signOut}>Sign Out</NavLink>
          </Collapse>
        </Nav>
        { this.props.tokenData() ?
        <div className='navigation--user'>{this.props.tokenData().username}</div>
        : <div className='navigation--user'>...</div> }
      </div>
    );
  }
}


export default withRouter(Navigation);