import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import '../css/index.css';

class UserInfoPage extends React.Component {

  render() {

    const {LoginInfo} = this.props

    return (
      <div className="user-info-main-body">
        <Grid>
          <Row>
            <Col xs={2} />
            <Col xs={8}>
              <Paper zDepth={1} >
                <List>
                  <ListItem primaryText={LoginInfo.username} leftIcon={<FontIcon className="material-icons">face</FontIcon>} />
                </List>
              </Paper>
            </Col>
            <Col xs={2} />
          </Row>
          <br />
          <Row>
            <Col xs={2} />
            <Col xs={8}>
              <RaisedButton label="Log Out" fullWidth="true" onClick={this.props.logoutSubmit} />
            </Col>
            <Col xs={2} />
          </Row>
        </Grid>
      </div>
    )
  }
}

function select(state) {
  return {
    LoginInfo: state.LoginInfo
  };
}

UserInfoPage = connect(select)(UserInfoPage)

export default UserInfoPage
