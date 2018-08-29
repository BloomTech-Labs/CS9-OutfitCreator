import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { ROOT_URL } from '../../config';
import axios from 'axios';
import './Settings.css';

class Settings extends Component {
    state = { 
        oldPassword: '',
        newPassword: ''
    }

    componentDidMount() {
      const userID = this.props.tokenData().sub;
      const authToken = localStorage.getItem('authToken');
      const requestOptions = {
          headers: { Authorization: authToken }
      }

      axios.get(`${ROOT_URL.API}/user/info/${userID}`, requestOptions)
          .then(res => {
              this.setState(res.data);
          })
          .catch(err => {
            console.log(err);
          });
    }

    updateUserInfo = () => {
        const userID = this.props.tokenData().sub;
        const authToken = localStorage.getItem('authToken');
        const requestOptions = {
            headers: {
                Authorization: authToken
            }
        }

        axios.post(`${ROOT_URL.API}/user/info/${userID}`, this.state, requestOptions)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    changePassword() {

    }

    handleInputChange = (e) => {
        if (['rEmails', 'rTexts'].includes(e.target.name)) {
          this.setState({ [e.target.name]: e.target.checked });
        } else this.setState({ [e.target.name]: e.target.value });
    }
    
    render() {
      return this.state.local ?
            <div className="settingsContainer">
                <Form>
                  <FormGroup row>
                      <Label for="userEmail" sm={4}>Email:</Label>
                      <Col sm={8}>
                          <Input 
                              type="email" 
                              name="email" 
                              id="userEmail" 
                              placeholder="user@gmail.com"
                              value={this.state.local.email}
                              onChange={this.handleInputChange}
                          />
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Label for="userPhone" sm={4}>Phone:</Label>
                      <Col sm={8}>
                          <Input 
                              type="text" 
                              name="phone" 
                              id="userPhone" 
                              placeholder="555-789-1234"
                              value={this.state.phone}
                              onChange={this.handleInputChange}
                          />
                      </Col>
                  </FormGroup>
                  <FormGroup check inline>
                      <Label check>
                          <Input 
                              type="checkbox"
                              name="rEmails"
                              checked={this.state.rEmails}
                              onClick={this.handleInputChange}
                          />
                          Emails?
                      </Label>
                  </FormGroup>
                  <FormGroup check inline>
                      <Label check>
                          <Input 
                              type="checkbox"
                              name="rTexts"
                              checked={this.state.rTexts}
                              onClick={this.handleInputChange}
                          />
                          Texts?
                      </Label>
                  </FormGroup>
                  <FormGroup row>
                      <Label for="userOldPassword" sm={5}>Old Password</Label>
                      <Col sm={7}>
                          <Input 
                              type="password" 
                              name="oldPassword" 
                              id="userOldPassword" 
                              placeholder="Enter old password"
                              value={this.state.oldPassword}
                              onChange={this.handleInputChange} 
                          />
                      </Col>
                  </FormGroup>
                  <FormGroup row>
                      <Label for="usernewPassword" sm={5}>New Password</Label>
                      <Col sm={7}>
                          <Input 
                              type="password" 
                              name="newPassword" 
                              id="userNewPassword" 
                              placeholder="Enter new password"
                              value={this.state.newPassword}
                              onChange={this.handleInputChange} 
                          />
                      </Col>
                  </FormGroup>
                  <FormGroup check row>
                      <Col sm={{ size: 10, offset: 2 }}>
                          <Button onClick={this.updateUserInfo}>Save</Button>
                      </Col>
                    </FormGroup>
                </Form>
            </div>
        : <div>Loading...</div> ;
    }
};

export default Settings;