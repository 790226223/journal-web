import React from 'react';
import '../css/login.css'
import { Grid, Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import 'isomorphic-fetch';
import loginOperate from '../action/loginAction';

const styles = {
  snakeBody : {
    background: '#EEE',
    textAlign: 'center',
  },
  snakeContent : {
    color: '#666',
  },
};
class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username:'',
      pwd:'',
      open:false,
      msg:'login success',
    };
  }

  loginSubmit() {
    fetch('/server/user/login.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: this.state.username,
        pwd: this.state.pwd,
      }),
    }).then((response) => {
      response.json().then((data) => {
            console.log(data);
            if(data.code === 'SUCCESS') {
              this.setState({
                open: true,
              });
              this.props.dispatch(loginOperate(data.detail));
              this.props.history.push("/");
            } else {
              alert(data.detail)
            }
         });
    }).catch((exception) => {
      console.log(exception);
    })
  }

  handleChangeUsername(e, newValue) {
    this.setState({username:newValue})
  }

  handleChangePwd(e, newValue) {
    this.setState({pwd:newValue})
  }

  handleRequestClose () {
    this.setState({
      open: false,
    });
  };

  render() {
    const {LoginInfo} = this.props
    console.log(LoginInfo);
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
                      <TextField onChange={(e, newValue) => this.handleChangeUsername(e, newValue)} fullWidth={true} hintText="username" />
                      <br/>
                      <TextField onChange={(e, newValue) => this.handleChangePwd(e, newValue)} fullWidth={true} hintText="password" type="password" />
                      <br/>
                      <div className="button">
                        <RaisedButton fullWidth={true} onClick={() => this.loginSubmit()} label="log in" />
                        <Snackbar
                          open={this.state.open}
                          message={this.state.msg}
                          autoHideDuration={2000}
                          onRequestClose={() => this.handleRequestClose()}
                          bodyStyle={styles.snakeBody}
                          contentStyle={styles.snakeContent}
                        />
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

function select(state) {
  return {
    LoginInfo: state.LoginInfo
  };
}

LoginPage = connect(select)(LoginPage)

export default LoginPage
