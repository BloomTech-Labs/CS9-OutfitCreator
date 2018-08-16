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

  addTag = (e) => {
    const { query, results, tags } = this.state;
    if(e.key === 'Enter' && !tags.includes(query)){
      tags.push(query);

      this.setState({ query: '', results: results, tags: tags });
    }
  }

  removeTag = (e) => {
    const newState = { ...this.state };
    newState.tags = newState.tags.filter(tag => tag !== e.target.nextElementSibling.innerHTML);
    this.setState({ ...newState });
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
          <Input className='Search' placeholder='Search' value={this.state.query} onChange={this.handleInputChange} onKeyPress={this.addTag} />
        </InputGroup>

        {/* Display tag text for each tag in state */}
        <div className='TagView'>
          {this.state.tags.map(tag => (
            <div className={'Tag ' + tag} key={this.state.tags.indexOf(tag)}>
              <span className='DeleteTag' onClick={this.removeTag}>x</span>
              <span>{tag}</span>
            </div>
          ))}
        </div>

        <Label>Pair With:</Label>
        <Form className='PairWith'>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' id='TopsCheckbox'/>
              Tops
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' id='BottomsCheckbox' />
              Bottoms
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type='checkbox' id='ShoesCheckbox' />
              Shoes
            </Label>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default TagSearch;