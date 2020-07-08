import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import Home from '../components/Home';
import RecipeForm from '../components/RecipeForm';
import NotFound from '../components/NotFound';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import { authenticateSession } from '../api/v1/users';
import { setSession } from '../actions/session';

const AppRouter = ({ session, setSession }) => {
  useEffect(() => {
    authenticateSession()
    .then((response) => { setSession(response.data); })
    .catch(() => { })
  }, []);
  
  return (
    <BrowserRouter>
      <Header loggedIn={session.loggedIn} />
      <Container>
      { session.loggedIn ?
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/recipes/new' component={RecipeForm} />
          <Route path='/sign_out' />
          <Route component={NotFound} />
        </Switch>
        :
        <Switch>
          <Route path='/' component={SignIn} exact />
          <Route path='/sign_up' component={SignUp} />
          <Route path='/sign_in' component={SignIn} />
          <Route component={NotFound} />
        </Switch>
      }
      </Container>
    </BrowserRouter>
  )
};

const mapStateToProps = (state) => ({
  session: state.session
});

const mapDispatchToProps = (dispatch) => ({
  setSession: (user) => { dispatch(setSession(user)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
