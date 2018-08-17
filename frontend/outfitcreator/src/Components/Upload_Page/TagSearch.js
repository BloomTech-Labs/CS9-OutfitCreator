import React, { Component } from 'react';
import { Input, InputGroup, InputGroupAddon,  } from 'reactstrap';
import './TagSearch.css';
import SearchIcon from '../../search.png';

class TagSearch extends Component {
    constructor(props) {
        super();

        console.log(props);
    }

    addTag = (e) => {
        const newState = { ...this.props.state };
        if(e.key === 'Enter' && !newState.tags.includes(newState.query)){
            newState.tags.push(newState.query);
            newState.query = '';
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
          <div className='container--tagSearch'>
            <InputGroup>
                <InputGroupAddon className='tagSearch--icon' addonType='prepend'><img src={SearchIcon} alt='Magnifying Glass' /></InputGroupAddon>
                <Input className='tagSearch--input' type='text' placeholder='Search' value={this.props.state.query} onChange={this.handleInputChange} onKeyPress={this.addTag} />
            </InputGroup>

            {/* Display tag text for each tag in state */}
            <div className='tagSearch--view'>
                {this.props.state.tags.map(tag => (
                    <div className={'tagSearch--tag ' + tag} key={this.props.state.tags.indexOf(tag)}>
                        <span className='tagSearch--delete' onClick={this.removeTag}>x</span>
                        <span>{tag}</span>
                    </div>
                ))}
            </div>
          </div>
        );
    }
}

export default TagSearch;