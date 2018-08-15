import React, { Component } from 'react';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap';
import './TagSearch.css';
import SearchIcon from '../../search.png';

class TagSearch extends Component {
  state = {
    query: 'Testing',
    results: [],
    tags: ['some', 'cool', 'tags', 'go', 'here']
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
        <InputGroup className="TagSearch">
          <InputGroupAddon className="SearchIcon" addonType="prepend"><img src={SearchIcon} alt="Magnifying Glass" /></InputGroupAddon>
          <Input className="Search" placeholder="Search" value={this.state.query} onChange={(e) => this.handleInputChange(e)} />
        </InputGroup>

        <div className="TagView">
          {/* {this.state.tags.forEach(tag => (
            <div className={'Tag-' + tag} key={this.props.tags.indexOf(tag)}>
              {tag}
            </div>
          ))} */}
          {this.state.tags.forEach(tag => (
            <div className={'Tag-' + tag} key={this.state.tags.indexOf(tag)}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TagSearch;