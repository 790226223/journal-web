import React from 'react';
import { connect } from 'react-redux';

class IndexPage extends React.Component {
  render() {
    const {LoginInfo} = this.props
    console.log(LoginInfo);
      return(
        <div>
          <li>index</li>
          <p>welcome {LoginInfo.username}</p>
        </div>
      )
  }
}

function select(state) {
  return {
    LoginInfo: state.LoginInfo
  };
}

IndexPage = connect(select)(IndexPage)

export default IndexPage
