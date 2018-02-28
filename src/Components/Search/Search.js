import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    });
    console.log(this.state.inputValue);
  }

  handleSubmit(props) {
    this.props.findWeather(this.state.inputValue);
    this.setState({inputValue: ''});
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {
    return (
      <div className='search'>
        <span>
          <input
            type='text'
            id='search'
            placeholder='Enter city name or zip'
            value={this.state.inputValue}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <button
            className='btn'
            onClick={this.handleSubmit}
          >
            Get Weather
          </button>
        </span>
        <p>{this.props.error}</p>
      </div>
    )
  }
}

export default Search;
