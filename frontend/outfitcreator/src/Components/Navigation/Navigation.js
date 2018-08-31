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

    // this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      collapseActive: false,
      username: ''
    };
    this.user = '';
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);

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

  updateDimensions= () => {
    if (window.innerWidth < 700 && this.state.collapseActive === false) {
      this.setState({ collapseActive: true });
    } else if (window.innerWidth > 699 && this.state.collapseActive === true) {
      this.setState({ collapsed: true, collapseActive: false });
    }
    // if(window.innerWidth < 500) {
    //   this.setState({ width: 450, height: 102 });
    // } else {
    //   let update_width  = window.innerWidth-100;
    //   let update_height = Math.round(update_width/4.4);
    //   this.setState({ width: update_width, height: update_height });
    // }
  }

  toggleNavbar = () => {
    const navMin = document.querySelector('.navigation--minimize');
    const sideNav = document.querySelector('.navigation--pages');
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

  navSettings() {
    window.location = `${ROOT_URL.WEB}/Settings`;
  }

  signOut() {
    localStorage.removeItem('authToken');
    window.location = `${ROOT_URL.WEB}/`;
  }

  render() {
    return (
      this.state.collapseActive ?
      <div className='navigation--container'>
        <div className='navigation--minimize' onClick={this.toggleNavbar}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <Nav className='navigation--pages'>
          <Collapse isOpen={!this.state.collapsed}>
            <NavLink href='/Create'><button className='nav--item'>New Outfit</button></NavLink>
            <NavLink href='/Upload'><button className='nav--item'>Add Item</button></NavLink>
            <NavLink href='/Closet'><button className='nav--item'>My Closet</button></NavLink>
            <NavLink href='/Archive'><button className='nav--item'>Archive</button></NavLink>
          </Collapse>
        </Nav>
        <div className='navigation--topRight'>
          <div onClick={this.navSettings} className='navigation--user'>{this.state.username}</div>
          <div onClick={this.signOut} className='navigation--logout'>logout</div>
        </div>
      </div> 
      :
      <div className='navigation--container'>
      {/* <div className='navigation--dresser'>
        <div className='navigation--minimize' onClick={this.toggleNavbar}>
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
      </div> */}
      <Nav className='navigation--pages'>
        {/* <Collapse isOpen={!this.state.collapsed}> */}
          <NavLink href='/Create'><button className='nav--item'>New Outfit</button></NavLink>
          <NavLink href='/Upload'><button className='nav--item'>Add Item</button></NavLink>
          <NavLink href='/Closet'><button className='nav--item'>My Closet</button></NavLink>
          <NavLink href='/Archive'><button className='nav--item'>Archive</button></NavLink>
        {/* </Collapse> */}
      </Nav>
      <div className='navigation--topRight'>
        <div onClick={this.navSettings} className='navigation--user'>{this.state.username}</div>
        <div onClick={this.signOut} className='navigation--logout'>logout</div>
      </div>
    </div>
    );
  }
}


export default withRouter(Navigation);