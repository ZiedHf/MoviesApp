import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Helpers
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
// Components
import Button from '../Button/Button';
// CSS
import './Card.css';

const btnStyle = {
  maxHeight: '40px',
};

class Card extends Component {
  static propTypes = {
    title: PropTypes.string,
    year: PropTypes.string,
    description: PropTypes.string,
    history: PropTypes.object,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    toggler: PropTypes.bool,
    onOpenPage: PropTypes.func,
  };

  defaultProps = {
    toggler: false,
  };

  state = {
    showDetails: false,
  };

  componentDidUpdate(prevProps) {
    const { toggler } = this.props;
    const { toggler: prevToggler } = prevProps;
    const { showDetails } = this.state;
    if (showDetails && toggler !== prevToggler)
      this.setState({ showDetails: false });
  }

  toggleShowDetails = () => {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails,
    }));
  };

  openMovie = () => {
    const { history, id } = this.props;
    history.push(`movies/${id}`);
  };

  render() {
    const { showDetails } = this.state;
    const { title, year, description, onOpenPage } = this.props;
    const showDescBtn = isString(description);
    const showOpenMovieBtn = isFunction(onOpenPage);
    return (
      <div className="card">
        <div className="header">
          <span className="title">{title}</span>
          {year ? <span className="year">{` (${year})`}</span> : null}
        </div>
        {showDetails ? <div>{description}</div> : null}
        <div className="footer">
          {showDescBtn ? (
            <Button
              label={showDetails ? 'Hide Details' : 'Show Details'}
              onClick={this.toggleShowDetails}
              style={btnStyle}
            />
          ) : null}
          {showOpenMovieBtn ? (
            <Button
              label="Open Movie Page"
              onClick={onOpenPage}
              style={btnStyle}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Card;
