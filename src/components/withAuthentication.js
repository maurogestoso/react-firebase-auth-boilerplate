import React from 'react';
import PropTypes from 'prop-types';

import { firebase } from '../firebase';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    state = { authUser: null, loading: true }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser
          ? this.setState(() => ({ authUser, loading: false }))
          : this.setState(() => ({ authUser: null, loading: false }));
      });
    }

    render() {
      const { loading, authUser } = this.state;
      return (
        <div>
          { 
            loading 
              ? <p>Loading...</p> 
              : <Component authUser={this.state.authUser}/> 
          }
        </div>
      );
    }
  }

  return WithAuthentication;
}

export default withAuthentication;
