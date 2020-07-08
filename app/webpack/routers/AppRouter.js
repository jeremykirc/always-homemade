import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import Home from '../components/Home';
import RecipeForm from '../components/RecipeForm';
import NotFound from '../components/NotFound';

const AppRouter = () => (
  <BrowserRouter>
    <Header />
    <Container>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/recipes/new' component={RecipeForm} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default AppRouter;
