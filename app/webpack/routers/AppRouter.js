import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import Home from '../components/Home';
import RecipeCreate from '../components/RecipeCreate';
import NotFound from '../components/NotFound';
import SignUp from '../components/SignUp';

const AppRouter = () => (
  <BrowserRouter>
    <Header />
    <Container>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/images/new' component={RecipeCreate} />
        <Route path='/signup' component={SignUp} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default AppRouter;
