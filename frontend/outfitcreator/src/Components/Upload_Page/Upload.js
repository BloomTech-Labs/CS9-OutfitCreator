import React, { Component } from 'react';
import axios from 'axios';
import { CardImg, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import TagSearch from './TagSearch';
import './Upload.css';


// TO DO
// Refactor so that every input has its respective name
// Create universal event listener for all fields that set state
// Make axios calls with state


class Upload extends Component {
      constructor(props) {
        super(props);
        this.state = { // image, name, type, search, tags, pairWith
            image: '',
            pairWith: [],
            name: '',
            search: '',
            tags: ['some', 'cool', 'tags', 'go', 'here', 'testing', 'wrap'],
            type: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.image);
        // this.setState({ image: URL.createObjectURL(event.target.files[0])});
        // const formData = new FormData({
        //   name: 'myImage',
        //   image: this.state.image,
        //   imageName: 'image name here'
        // });
        // formData.name = 'myImage';
        // formData.image = this.state.image;
        // formData.imageName = 'image name';
        // console.log(formData);
        axios.post('http://localhost:5000/item', {
            // user: 'jekm321',
            name: 'jekms\'s test',
            image: this.state.image,
            type: 'top',
        })
          .then(response => {
              console.log(response);
          })
          .catch(err => {
              console.log(err);
          });
      }

    fileChanged = event => {
        console.log(event.target.files);
        // this.setState({ image: event.target.files[0] });
        this.setState({ image: URL.createObjectURL(event.target.files[0]) });
    }


    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    updateState = state => {
        this.setState(state);
    }

    render() {
      return (
        <div className='container--upload'>
            <div className='upload--columns'>
                <div className="column--left">
                    {this.state.image ?
                        <CardImg 
                            className="upload--image"
                            src={this.state.image}
                            alt="Upload Image Thumbnail" 
                        /> :
                        <CardImg 
                            className="upload--image"
                            src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                            alt="Upload Image Thumbnail" 
                        />
                    }
                    <Button className="upload--button">Upload</Button>
                    <FormGroup>
                        <Input 
                            type='file' 
                            name='clothing' 
                            id='image--upload' 
                            onChange={this.fileChanged} 
                        />
                        <br />
                        <Input 
                            type="text" 
                            name="name" 
                            className="upload--name" 
                            placeholder="Clothing Name" 
                            autoComplete='off' 
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input className='upload--select' type='select' name='select'>
                            <option>Top</option>
                            <option>Bottom</option>
                            <option>Shoes</option>
                        </Input>
                    </FormGroup>
                </div>

                <div className="column--right">
                    <TagSearch 
                        state={this.state} 
                        updateState={this.updateState} 
                    />
                    <Label>Pair With:</Label>
                    <Form className='upload--pairWith'>
                        <FormGroup check>
                            <Label check>
                              <Input 
                                  type='checkbox' 
                                  id='upload--topsCheckbox'
                              />
                              Tops
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input 
                                    type='checkbox' 
                                    id='upload--bottomsCheckbox' 
                                />
                                Bottoms
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input 
                                    type='checkbox' 
                                    id='upload--shoesCheckbox' 
                                />
                                Shoes
                            </Label>
                        </FormGroup>
                    </Form>
                </div>
            </div>

            <Button className="upload--save" onClick={this.handleSubmit}>Save</Button>
        </div>
      );
    }
}

export default Upload;