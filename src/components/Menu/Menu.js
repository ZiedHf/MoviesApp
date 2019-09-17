import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

class Menu extends Component {
  render() {
    return (
      <ul className="menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/movies">Movies List</Link>
        </li>
        <li>
          <Link to="/about-us">About Us</Link>
        </li>
      </ul>
    );
  }
}

export default Menu;
