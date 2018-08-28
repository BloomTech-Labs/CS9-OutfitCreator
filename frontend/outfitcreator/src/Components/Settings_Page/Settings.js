import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { ROOT_URL } from '../../config';
import axios from 'axios';
import './Settings.css';

class Settings extends Component {
    render() {
        return (
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
                              value={ this.state ? this.state.email : '' }
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
                              value={ this.state ? this.state.phone : '' }
                              onChange={this.handleInputChange}
                          />
                      </Col>
                  </FormGroup>
                  <FormGroup check inline>
                      <Label check>
                          <Input 
                              type="checkbox"
                              name="rEmails"
                              checked={this.state ? this.state.rEmails : false }
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
                              checked={this.state ? this.state.rTexts : false }
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
                              onChange={this.handleInputChange} 
                          />
                      </Col>
                  </FormGroup>
                  <FormGroup check row>
                      <Col sm={{ size: 10, offset: 2 }}>
                          <Button>Save</Button>
                      </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
};

export default Settings;