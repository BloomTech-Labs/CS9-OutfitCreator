import React, { Component } from 'react';
import { CardImg, Button, FormGroup, Input } from 'reactstrap';
import TagSearch from './TagSearch';
import './Upload.css';

class Upload extends Component {


  render () {
    return (
      <div className='UploadPage'>
        <div className='UploadColumns'>
          <div className='UploadLeft'>
            <CardImg className='UploadImage' 
              src='https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'
              alt='Upload Image Thumbnail' />
            <Button className='UploadButton'>Upload</Button>
            <FormGroup>
              <Input id='ClothingName' type='text' placeholder='Clothing Name' autoComplete='off' />
            </FormGroup>
            <FormGroup>
              <Input id='SelectType' type='select' name='select'>
                <option>Top</option>
                <option>Bottom</option>
                <option>Shoes</option>
              </Input>
            </FormGroup>
          </div>

          <div className='UploadRight'>
            <TagSearch />
            
          </div>
        </div>

        <Button className='SaveButton'>Save</Button>
      </div>
    );
  }
}

export default Upload;