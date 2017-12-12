import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Input, Form, List } from 'antd';
import { searchUser } from '../actions';

const FormItem = Form.Item;

class SearchUser extends Component {
  state = {
    searchTxt: '',
  }
  onTextChange = (e) => {
    this.setState({ searchTxt: e.target.value });
  }
  onSearchClick = () => {
    const { searchTxt } = this.state;
    if (searchTxt.trim() === '') return;
    this.props.searchUser(searchTxt);
  }
  onUserClick = (username) => {
    this.props.searchUser(username);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.username != this.state.searchTxt) {
      this.setState({ searchTxt: nextProps.username });
    }
  }
  render () {
    const { searchTxt } = this.state;
    const { recentSearches } = this.props;
    return (
      <div className="side-panel">
        <Form layout="inline" onSubmit={this.onSearchClick}>
          <FormItem>
            <Input type="text" value={searchTxt} onChange={this.onTextChange} placeholder="Search User" />
          </FormItem>
          <FormItem>
            <Button onClick={this.onSearchClick}>Search</Button>
          </FormItem>
        </Form>
        {recentSearches.length > 0 && <div>
          <h3>Recent Searches</h3>
            <List
            bordered
            dataSource={recentSearches}
            renderItem={(username) => (
              <List.Item onClick={() => this.onUserClick(username)} key={username}>{username}</List.Item>
            )}
          /></div>
        }
      </div>
    )
  }
}

export default connect(state => {
  return {
    username: state.username,
    recentSearches: state.recentSearches,
  }
}, {
  searchUser,
})(SearchUser)