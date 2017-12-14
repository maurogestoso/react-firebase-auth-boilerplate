import React from 'react';
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Navigation from './Navigation';
import LandingPage from './LandingPage';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForgetPage';
import HomePage from './HomePage';
import AccountPage from './AccountPage';

import * as routes from '../constants/routes';
import { firebase } from '../firebase';

class App extends React.Component {
  state = { authUser: null }

  componentDidMount () {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    })
  }

  render () {
    const { authUser } = this.state;
    return (
      <Router>
        <div>
          <Navigation authUser={authUser} />
          <hr/>
          <Route 
            exact path={routes.LANDING}
            component={() => <LandingPage />}
          />
          <Route 
            exact path={routes.SIGN_UP}
            component={() => <SignUpPage />}
          />
          <Route 
            exact path={routes.SIGN_IN}
            component={() => <SignInPage />}
          />
          <Route 
            exact path={routes.PASSWORD_FORGET}
            component={() => <PasswordForgetPage />}
          />
          <Route 
            exact path={routes.HOME}
            component={() => <HomePage />}
          />
          <Route 
            exact path={routes.ACCOUNT}
            component={() => <AccountPage />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
