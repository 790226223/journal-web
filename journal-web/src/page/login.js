import React from 'react';
import '../css/login.css'
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class LoginPage extends React.Component {

  render() {
    return(
      <div>
        <div className="loginPage">
          <div>
            <Grid>
              <Row>
                <Col xs={1} />
                <Col xs={10}>
                  <div className="loginInfo">
                    <div>
                      <div className="title">
                        <a>JOURNAL</a>
                      </div>
                      <hr/>
                      <br/>
                      <TextField fullWidth={true} hintText="username" />
                      <br/>
                      <TextField fullWidth={true} hintText="password" type="password" />
                      <br/>
                      <div className="button">
                        <RaisedButton fullWidth={true} label="log in" />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={1} />
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
