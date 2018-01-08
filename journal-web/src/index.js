import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './page/login'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class IndexPage extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <LoginPage />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<IndexPage />, document.getElementById('root'));
