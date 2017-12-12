import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Input, Form, List } from 'antd';
import { searchOrgs, searchUser } from '../actions';

const FormItem = Form.Item

class SearchOrgs extends Component {
  state = {
    searchTxt: '',
  }
  onTextChange = (e) => {
    this.setState({ searchTxt: e.target.value });
  }
  onSearchClick = () => {
    const { searchTxt } = this.state;
    if (searchTxt.trim() === '') return;
    this.props.searchOrgs(searchTxt);
  }
  onUserClick = (username) => {
    this.props.searchUser(username);
  }
  render () {
    const { searchTxt } = this.state;
    const { users } = this.props;
    return (
      <div className="side-panel">
        <Form layout="inline" onSubmit={this.onSearchClick}>
          <FormItem>
            <Input type="text" value={searchTxt} onChange={this.onTextChange} placeholder="Search Organisation" />
          </FormItem>
          <FormItem>
            <Button onClick={this.onSearchClick}>Search</Button>
          </FormItem>
        </Form>
        {users.length > 0 && <List
          bordered
          dataSource={users}
          renderItem={({ username }) => (
            <List.Item onClick={() => this.onUserClick(username)} key={username}>{username}</List.Item>
          )}
        />}
      </div>
    )
  }
}

export default connect(state => ({
  users: state.orgUsers,
}), {
  searchOrgs,
  searchUser,
})(SearchOrgs)