import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Container extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.node,
    ]),
  };

  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

export default Container;
