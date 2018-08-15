import React, { Component } from 'react';
import { Input, InputGroup, InputGroupAddon, Form, FormGroup, Label } from 'reactstrap';
import './TagSearch.css';
import SearchIcon from '../../search.png';

class TagSearch extends Component {
  state = {
    query: '',
    results: [],
    tags: ['some', 'cool', 'tags', 'go', 'here', 'testing', 'wrap']
  }

  addTag = () => {
    
  }

  removeTag = () => {

  }

  getTags = () => {
    // Axios call
  }

  handleInputChange = (e) => {
    this.setState({ query: e.target.value });
  }

  render () {
    return (
      <div>
        <InputGroup className='TagSearch'>
          <InputGroupAddon className='SearchIcon' addonType='prepend'><img src={SearchIcon} alt='Magnifying Glass' /></InputGroupAddon>
          <Input className='Search' placeholder='Search' value={this.state.query} onChange={(e) => this.handleInputChange(e)} />
        </InputGroup>

        {/* Display tag text for each tag in state */}
        <div className='TagView'>
          {this.state.tags.map(tag => (
            <div className={'Tag ' + tag} key={this.state.tags.indexOf(tag)}>
              <span className='DeleteTag'>x</span>{tag}
            </div>
          ))}
        </div>

        <Label>Pair With:</Label>
        <Form className="PairWith">
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />
              Bottoms
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />
              Tops
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="checkbox" />
              Shoes
            </Label>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default TagSearch;