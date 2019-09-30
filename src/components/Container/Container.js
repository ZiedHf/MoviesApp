import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Container.css';

class Container extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.node,
    ]).isRequired,
  };

  render() {
    const { children } = this.props;
    return <div className="cmp-container">{children}</div>;
  }
}

export default Container;
