import React, { Component } from 'react';
import PropTypes from 'prop-types';
// CSS
import './Button.css';

class Button extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['default', 'danger', 'success', 'disabled']),
    label: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
  };

  static defaultProps = {
    type: 'default',
  };

  render() {
    const { label, onClick, style, type } = this.props;
    const isDisabled = type === 'disabled';
    return (
      <button
        type="button"
        onClick={!isDisabled && onClick}
        style={style}
        className={type}
      >
        {label}
      </button>
    );
  }
}

export default Button;
