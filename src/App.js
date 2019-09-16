import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HelloPage, ListPage } from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" exact component={HelloPage} />
      <Route path="/list" exact component={ListPage} />
    </Router>
  );
}

export default App;
