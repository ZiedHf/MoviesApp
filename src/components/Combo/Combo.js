import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Combo extends Component {
  static propTypes = {
    value: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    label: PropTypes.string,
  };

  render() {
    const { label, value, options, onChange } = this.props;
    return (
      <div>
        <span>{label}</span>{' '}
        <select value={value} onChange={onChange}>
          <option value="">Please select an option ..</option>
          {Array.isArray(options) &&
            options.map((option, key) => <option key={key}>{option}</option>)}
        </select>
      </div>
    );
  }
}

export default Combo;
