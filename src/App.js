import React, { Component } from 'react';

import logo from './logo.svg';
import SearchUser from './components/SearchUser';
import SearchOrgs from './components/SearchOrgs';
import UserBio from './components/UserBio';

class App extends Component {
  render() {
    return (
      <div id="app">
        <header>
          <h2>Gitber</h2>
        </header>
        <div id="content">
          <div className="left-side">
            <SearchUser />
            <SearchOrgs />
            <UserBio />
          </div>
          <div className="right-side">
            right
          </div>
        </div>
        <footer>React Version</footer>
      </div>
    );
  }
}

export default App;
