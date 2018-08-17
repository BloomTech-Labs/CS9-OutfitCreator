import React, { Component } from 'react';
import axios from 'axios';
import { CardImg, Button, FormGroup, Input } from 'reactstrap';
import TagSearch from './TagSearch';
import './Upload.css';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      query: '',
      results: [],
      tags: ['some', 'cool', 'tags', 'go', 'here', 'testing', 'wrap']
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

  updateState = (state) => {
    this.setState(state);
  }

  render() {
    return (
      <div className='UploadPage'>
        <div className='UploadColumns'>
          <div className="UploadLeft">
            {this.state.image ?
              <CardImg className="UploadImage"
                src={this.state.image}
                alt="Upload Image Thumbnail" /> :
              <CardImg className="UploadImage"
                src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                alt="Upload Image Thumbnail" />}
            <Button className="UploadButton">Upload</Button>
            <FormGroup>
              <Input type='file' name='clothing' id='image--upload' onChange={this.fileChanged} />
              <br />
              <Input type="text" name="name" id="ClothingName" placeholder="Clothing Name" autoComplete='off' />
            </FormGroup>
            <FormGroup>
              <Input id='SelectType' type='select' name='select'>
                <option>Top</option>
                <option>Bottom</option>
                <option>Shoes</option>
              </Input>
            </FormGroup>
          </div>

          <div className="UploadRight">
            <TagSearch state={this.state} updateState={this.updateState} />

          </div>
        </div>

        <Button className="SaveButton" onClick={this.handleSubmit}>Save</Button>

      </div>
    );
  }
}

export default Upload;