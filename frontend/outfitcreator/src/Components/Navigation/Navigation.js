import React, { Component } from 'react';
import axios from 'axios';
import { Collapse, Nav, NavLink, Breadcrumb, BreadcrumbItem } from 'reactstrap';
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
              console.log(res.data);
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
      sideNav.style.marginTop = '-3px';
      setTimeout(() => {
        navMin.classList.toggle('cross');
      }, delay);
    } else {
      navMin.classList.toggle('cross');
      setTimeout(() => {
        sideNav.style.marginTop = '-6px';
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
        <Nav className='navigation--sideNav'>
          <Collapse isOpen={!this.state.collapsed}>
            <NavLink href='/Create' className='Create'>Create Outfit</NavLink>
            <NavLink href='/Upload' className='Upload'>Upload Item</NavLink>
            <NavLink href='/Closet' className='Closet'>My Closet</NavLink>
            <NavLink href='/Archive' className='Archive'>Archive</NavLink>
            <NavLink href='/Settings' className='Settings'>Settings</NavLink>
            <NavLink href='/Billing' className='Billing'>Billing</NavLink>
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