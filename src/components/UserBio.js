import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { Button, Input, Form, List } from 'antd';

class UserBio extends PureComponent {
  render () {
    const { bio: user } = this.props;
    if (user === null) return <div></div>
    return (
      <div className="side-panel" style={{ position: 'relative'}}>
        <div id="userData" className="searched white">
        <p style={{padding:'5px 10px', borderBottom: '1px solid #ccc'}} className="lead blue">User Bio</p>
        {user.username && <div className="row-fluid">
            <div className="span12" style={{paddingLeft: '10px', paddingRight: '100px'}}>
                {user.name && <p><strong>Name:</strong> {user.name} </p>}
                <p><strong>Username:</strong> {user.username}</p>
                {user.company && <p><strong>Company:</strong> {user.company} </p>}
                <p><strong>Repos:</strong> {user.repos}</p>
                <p><strong>Followers:</strong> {user.followers}</p>
                <p><strong>Joined on:</strong> {user.joined}</p>
            </div>
            <img className="avatar img-polaroid" src={user.avatar} />
        </div>}
        <div className="row-fluid visible-phone phoneButtons">
            {user.email && <div className="phone-button">
                <a className="btn btn-primary btn-large" href={`mailto:${user.email}`}><i className="icon-envelope-alt icon-4x"></i></a>
            </div>}
            {user.blog && <div className="phone-button">
                <a className="btn btn-warning btn-large" href={user.blog} target="_blank"><i className="icon-comments icon-4x"></i></a>
            </div>}
            {user.location && <div className="phone-button">
                <a className="btn btn-danger btn-large" href={`https://www.google.com/maps/search/${user.location}`} target="_blank"><i className="icon-map-marker icon-4x"></i></a>
            </div>}
            {user.hireable && <div className="phone-button">
                <a className="btn btn-inverse btn-large" href={user.blog} target="_blank"><i className="icon-suitcase icon-4x"></i></a>
            </div>}
        </div>
        <div className="row-fluid hidden-phone" style={{position: 'absolute', marginTop: '10px', overflow:'hidden'}}>
            {user.email && <div className="span3">
                <div className="ribbon emailTag" style={{position:'relative'}}>
                    <a href={`mailto:${user.email}`}>
                      <img src="images/small-fork.png" />
                        <span className="bioDropdown">
                          <p className="lead" style={{color:'#fff'}}>Email</p>
                          <i className="icon-envelope-alt icon-2x"></i></span></a>
                </div>
            </div>}
            {user.blog && <div className="span3">
                <div className="ribbon blogtag" style={{position:'relative'}}>
                    <a href={user.blog} target="_blank"><img src="images/small-fork.png" /><span className="bioDropdown"><p className="lead" style={{color:'#fff'}}>Blog</p><i className="icon-comments icon-2x"></i></span></a>
                </div>
            </div>}
            {user.location && <div className="span3">
                <div className="ribbon localeTag" style={{position:'relative'}}>
                    <a href={`https://www.google.com/maps/search/${user.location}`} target="_blank"><img src="images/small-fork.png" /><span className="bioDropdown"><p className="lead" style={{color:'#fff'}}>Locale</p><i className="icon-map-marker icon-2x"></i></span></a>
                </div>
            </div>}
            {user.hireable && <div className="span3">
                <div className="ribbon hireTag" style={{position:'relative'}}>
                    <a href={user.blog} target="_blank"><img src="images/small-fork.png" /><span className="bioDropdown"><p className="lead"  style={{color:'#fff'}}>Hire</p><i className="icon-suitcase icon-2x"></i></span></a>
                </div>
            </div>}
        </div>
      </div>
      </div>
    )
  }
}

export default connect(state => {
  return {
    bio: state.bio,
  }
})(UserBio)