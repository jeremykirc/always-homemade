import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import Home from '../components/Home';
import RecipeForm from '../components/RecipeForm';
import NotFound from '../components/NotFound';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import { authenticateSession, logout } from '../api/v1/users';
import { setSession } from '../actions/session';
import { FormContext } from '../context/form-context';

const AppRouter = ({ session, setSession }) => {
  const authenticityToken = useContext(FormContext);

  useEffect(() => {
    authenticateSession()
    .then(resp => setSession(resp.data))
    .catch(error => console.error(error))
  }, []);

  const setSessionAndRedirect = (data) => {
    setSession(data);
    location.href = '/';
  }

  const handleLogout = () => {
    logout({ authenticity_token: authenticityToken })
    .then(resp => setSessionAndRedirect(resp.data))
    .catch(error => console.error(error))
  }
  
  return (
    <BrowserRouter>
      <Header loggedIn={session.loggedIn} />
      <Container>
      { session.loggedIn ?
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/recipes/new' component={RecipeForm} />
          <Route path='/logout' render={handleLogout} />
          <Route component={NotFound} />
        </Switch>
        :
        <Switch>
          <Route path={['/', '/login']} exact render={() => <Login setSessionAndRedirect={setSessionAndRedirect} />} />
          <Route path='/sign_up' render={() => <SignUp setSessionAndRedirect={setSessionAndRedirect} />} />
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
  setSession: (user) => { dispatch(setSession(user)); }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
