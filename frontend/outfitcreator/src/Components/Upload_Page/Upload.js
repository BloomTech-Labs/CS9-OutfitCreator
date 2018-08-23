import React, { Component } from 'react';
import axios from 'axios';
import { CardImg, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import TagSearch from './TagSearch';
import './Upload.css';

class Upload extends Component {
      constructor(props) {
        super(props);
        this.state = {
            image: '',
            // pairWith: [], // currently not used
            name: '',
            search: '',
            tags: [],
            type: 'top'
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
        axios.post(`${process.env.SERVER || 'http://localhost:5000'}/items`, {
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

    saveItem = e => {
        e.preventDefault();
        const { name, image, tags, type } = this.state;

        axios.post(`${process.env.SERVER || 'http://localhost:5000'}/items`, {
            name, image, tags, type
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
        
        this.setState({ image: '', name: '', tags: [], type: 'top' });
    }

    handleInputChange = e => {
      e.target.type === 'select-one' ? 
          this.setState({ [e.target.name]: e.target.value.toLowerCase() }) :
          this.setState({ [e.target.name]: e.target.value });
    }

    passState = state => {
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
                    <FormGroup>
                        <Input 
                            type='file' 
                            name='clothing' 
                            id='image--upload' 
                            onChange={this.fileChanged}
                            className='inputfile'
                        />
                        <Label htmlFor='image--upload'>Upload</Label>
                        <br />
                        <Input 
                            type="text" 
                            name="name" 
                            className="upload--name" 
                            placeholder="Clothing Name" 
                            autoComplete='off'
                            onChange={this.handleInputChange} 
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            className='upload--select'
                            type='select' 
                            name='type'
                            onChange={this.handleInputChange}>
                            <option>Top</option>
                            <option>Bottom</option>
                            <option>Shoes</option>
                        </Input>
                    </FormGroup>
                </div>
                <div className="column--right">
                    <TagSearch 
                        state={this.state} 
                        passState={this.passState} 
                    />
                    <Label>Pair With:</Label>
                    <Form className='upload--pairWith'>
                        <FormGroup check>
                            <Label check>
                              <Input 
                                  type='checkbox' 
                                  id='upload--topsCheckbox'
                                  name='tops'
                                  onChange={this.testInput}
                              />
                              Tops
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input 
                                    type='checkbox' 
                                    id='upload--bottomsCheckbox'
                                    name='bottom'
                                    onChange={this.testInput}
                                />
                                Bottoms
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input 
                                    type='checkbox' 
                                    id='upload--shoesCheckbox'
                                    name='shoes'
                                    onChange={this.testInput} 
                                />
                                Shoes
                            </Label>
                        </FormGroup>
                    </Form>
                </div>
            </div>
            <Button className="upload--save" onClick={this.saveItem}>Save</Button>
        </div>
      );
    }
}

export default Upload;