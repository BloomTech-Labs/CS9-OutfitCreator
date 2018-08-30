import React, { Component } from 'react';
import {
  Collapse,
  Nav,
  NavLink,
  //  Breadcrumb, 
  // BreadcrumbItem
} from 'reactstrap';
import { withRouter } from 'react-router';
import { ROOT_URL } from '../../config.js';
import axios from 'axios';
import './Navigation.css';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      username: ''
    };
    this.user = '';
  }

  componentDidMount() {
    const token = this.props.tokenData();

    if (token) {
      const userID = token.sub;
      const authToken = localStorage.getItem('authToken');
      const requestOptions = {
        headers: { Authorization: authToken }
      }

      axios.get(`${ROOT_URL.API}/user/info/${userID}`, requestOptions)
        .then(res => {
          this.setState({ username: res.data.local.username });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  toggleNavbar() {
    const navMin = document.querySelector('.navigation--minimize');
    const sideNav = document.querySelector('.navigation--sideNav');
    const delay = 250;

    if (this.state.collapsed) {
      navMin.classList.toggle('change');
      sideNav.classList.toggle('sideNav--expanded');
      setTimeout(() => {
        navMin.classList.toggle('cross');
      }, delay);
    } else {
      navMin.classList.toggle('cross');
      setTimeout(() => {
        sideNav.classList.toggle('sideNav--expanded');
        navMin.classList.toggle('change');
      }, delay);
    }

    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  signOut = () => {
    localStorage.removeItem('authToken');
    window.location = `${ROOT_URL.WEB}/`;
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
        <Nav className='navigation--sideNav'>
          <Collapse isOpen={!this.state.collapsed}>
            <NavLink href='/Create'><button className='nav--item'>New Outfit</button></NavLink>
            <NavLink href='/Upload'><button className='nav--item'>Add Item</button></NavLink>
            <NavLink href='/Closet'><button className='nav--item'>My Closet</button></NavLink>
            <NavLink href='/Archive'><button className='nav--item'>Archive</button></NavLink>
            <NavLink href='/Settings'><button className='nav--item'>Settings</button></NavLink>
            <NavLink href='/Billing'><button className='nav--item'>Billing</button></NavLink>
          </Collapse>
        </Nav>
        <div className='navigation--topRight'>
          <div className='navigation--user'>{this.state.username}</div>
          <div onClick={this.signOut} className='navigation--logout'>logout</div>
        </div>
      </div>
    );
  }
}


export default withRouter(Navigation);