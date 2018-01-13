import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './page/login'
import Info from './page/index'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import store from './redux/store'
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'

console.log(store.getState().LoginInfo);

const ThisRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
        return (
          store.getState().LoginInfo.username === '' ?
          <Redirect to={{
            pathname: '/login.html',
            state: { from: props.location }
          }}/>
          :
          <Component {...props}/>
        )
    }}/>
  )
}

class IndexPage extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
            <Router>
              <div>
                <ThisRoute exact path="/" component={Info} />
                <Route path="/login.html" component={LoginPage}/>
                <Route path="/info.html" component={Info}/>
              </div>
            </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<IndexPage />, document.getElementById('root'));
