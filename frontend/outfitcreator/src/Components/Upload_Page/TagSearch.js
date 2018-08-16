import React, { Component } from 'react';
import { Input, InputGroup, InputGroupAddon, Form, FormGroup, Label } from 'reactstrap';
import './TagSearch.css';
import SearchIcon from '../../search.png';

class TagSearch extends Component {
  constructor(props) {
    super();
  }

  addTag = (e) => {
    const newState = { ...this.props.state };
    if(e.key === 'Enter' && !newState.tags.includes(newState.query)){
      newState.tags.push(newState.query);
      this.props.updateState(newState);
    }
  }

  removeTag = (e) => {
    const newState = { ...this.props.state };
    newState.tags = newState.tags.filter(tag => tag !== e.target.nextElementSibling.innerHTML);
    this.props.updateState(newState);
  }

  getTags = () => {
    // Axios call
  }

  handleInputChange = (e) => {
    const newState = { ...this.props.state };
    newState.query = e.target.value;
    this.props.updateState(newState);
  }

  render () {
    return (
      <div>
        <InputGroup className='TagSearch'>
          <InputGroupAddon className='SearchIcon' addonType='prepend'><img src={SearchIcon} alt='Magnifying Glass' /></InputGroupAddon>
          <Input className='Search' type='text' placeholder='Search' value={this.props.state.query} onChange={this.handleInputChange} onKeyPress={this.addTag} />
        </InputGroup>

        {/* Display tag text for each tag in state */}
        <div className='TagView'>
          {this.props.state.tags.map(tag => (
            <div className={'Tag ' + tag} key={this.props.state.tags.indexOf(tag)}>
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