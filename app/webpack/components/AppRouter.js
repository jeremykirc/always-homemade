import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from '../components/Header';
import Home from '../components/Home';
import ImageUpload from '../components/ImageUpload';
import NotFound from '../components/NotFound';

const AppRouter = () => (
  <BrowserRouter>
    <Header />
    <Container>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/images/new' component={ImageUpload} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default AppRouter;
