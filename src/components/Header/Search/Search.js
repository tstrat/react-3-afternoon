import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(){
    super();
    this.state = {
      input:''
    };

    this.updateInput = this.updateInput.bind(this);
  }

  updateInput = e => {
    this.setState({ input : e.target.value })
    this.props.searchFn(e.target.value);
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" value={this.state.input} onChange={this.updateInput} />

          <SearchIcon id="Search__icon" />
        </div>
        
      </section>
    )
  }
}