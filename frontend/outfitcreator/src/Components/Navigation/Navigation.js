import React, { Component } from 'react';
import axios from 'axios';
import { Collapse, Nav, NavLink, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { withRouter } from 'react-router';
import './Navigation.css';

import { ROOT_URL } from '../../config';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      user: '',
    };
    this.user = '';
  }

  componentDidMount() {
    const userID = this.props.tokenData().sub;
    console.log(userID)
    axios.get(`${ROOT_URL.API}/user/info/${userID}`)
      .then(response => {
        console.log(response);
        this.user = response.data.local.username;
      })
      .catch(err => {
        console.log(err);
      })
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
    console.log(this.props)
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
            <NavLink href='/Closet' className='Closet'>My Closet</NavLink>
            <NavLink href='/Archive' className='Archive'>Archive</NavLink>
            <NavLink href='/Settings' className='Settings'>Settings</NavLink>
            <NavLink href='/Billing' className='Billing'>Billing</NavLink>
            <NavLink href='/' className='SignOut' onClick={this.signOut}>Sign Out</NavLink>
          </Collapse>
        </Nav>
        {this.props.username ?
          <div className='navigation--user'>{this.props.username}</div>
          : <div className='navigation--user'>...</div>}
      </div>
    );
  }
}


export default withRouter(Navigation);