import React from 'react';
import { connect } from 'react-redux';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import FontIcon from 'material-ui/FontIcon';
import '../css/index.css';
import RecordPage from './record';
import TypePage from './type';
import UserInfoPage from './user-info';
import loginOperate from '../action/loginAction';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const recentsIcon = <FontIcon className="material-icons">textsms</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">more</FontIcon>;
const nearbyIcon = <FontIcon className="material-icons">mood</FontIcon>;

class IndexPage extends React.Component {

  state = {
    selectedIndex: 0,
    open: false,
  };

  select = (index) => this.setState({selectedIndex: index});

  logoutSubmit = () => {
    this.setState({open: false});
    fetch('/server/user/logout.json', {
      method: 'GET',
      credentials: 'include',
    }).then((response) => {
      response.json().then((data) => {
            console.log(data);
            if(data.code === 'SUCCESS') {
              this.props.dispatch(loginOperate(''));
              this.props.history.push("/");
            } else {
              alert(data.detail)
            }
         });
    }).catch((exception) => {
      console.log(exception);
    })
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {

    let indexBody = <RecordPage />;

    switch (this.state.selectedIndex) {
      case 0:
        indexBody = <RecordPage />;
        break;
      case 1:
        indexBody = <TypePage />;
        break;
      case 2:
        indexBody = <UserInfoPage logoutSubmit={this.handleOpen} />;
        break;
      default:
    }

    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.logoutSubmit}
      />,
      <FlatButton
        label="NO"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return(
      <div className="index-page">
        <div className="index-body">
          {indexBody}
        </div>
        <Dialog
          title="Tip"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Do you really want to logout?
        </Dialog>
        <div className="navigate-bottom">
          <BottomNavigation selectedIndex={this.state.selectedIndex}>
            <BottomNavigationItem
              label="Record"
              icon={recentsIcon}
              onClick={() => this.select(0)}
            />
            <BottomNavigationItem
              label="Type"
              icon={favoritesIcon}
              onClick={() => this.select(1)}
            />
            <BottomNavigationItem
              label="My Info"
              icon={nearbyIcon}
              onClick={() => this.select(2)}
            />
          </BottomNavigation>
        </div>
      </div>
    )
  }
}

IndexPage = connect()(IndexPage)

export default IndexPage
