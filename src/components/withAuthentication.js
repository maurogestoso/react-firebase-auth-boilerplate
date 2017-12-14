import React from 'react';
import PropTypes from 'prop-types';

import { firebase } from '../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    state = { authUser: null }

    static childContextTypes = {
      authUser: PropTypes.object,
    }

    getChildContext() {
      return {
        authUser: this.state.authUser,
      };
    }
    
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser }))
          : this.setState(() => ({ authUser: null }));
      });
    }

    render() {
      return (
        <Component />
      );
    }
  }

  return WithAuthentication;
}

export default withAuthentication;
