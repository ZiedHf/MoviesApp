import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HelloPage, ListPage, ErrorPage, MoviePage } from './pages';
import { Menu } from './components';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Menu />
        <Switch>
          <Route path="/" exact component={HelloPage} />
          <Route path="/movies/:id" component={MoviePage} />
          <Route path="/movies" component={ListPage} />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
