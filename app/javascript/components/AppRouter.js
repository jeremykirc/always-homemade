import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../components/Header.js.erb';
import Home from '../components/Home';
import ImageUpload from '../components/ImageUpload';
import NotFound from '../components/NotFound';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/images/new' component={ImageUpload} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
