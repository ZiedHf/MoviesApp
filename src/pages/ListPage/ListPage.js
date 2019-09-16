import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListPage extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <div>This is the list of movies</div>;
      </div>
    );
  }
}

export default ListPage;
