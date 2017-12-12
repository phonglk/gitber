import React, { Component } from 'react'

class SearchUser extends Component {
  state = {
    searchTxt: '',
  }
  onTextChange = (e) => {
    this.setState({ searchTxt: e.target.value });
  }
  onSearchClick = () => {
    alert(this.state.searchTxt);
  }
  render () {
    const { searchTxt } = this.state;
    return (
      <div>
        <input type="text" value={searchTxt} onChange={this.onTextChange} />
        <button onClick={this.onSearchClick}>Search</button>
      </div>
    )
  }
}

export default SearchUser