import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  static propTypes = {
    value: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    type: 'text',
  };

  render() {
    const { label, type, value, onChange, ...rest } = this.props;
    return (
      <div>
        {label ? (
          <>
            <span>{label}</span>{' '}
          </>
        ) : null}
        <input type={type} value={value} onChange={onChange} {...rest} />
      </div>
    );
  }
}

export default Input;
