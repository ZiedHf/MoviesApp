import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Helpers
import isEmpty from 'lodash/isEmpty';
// API
import getData from '../../server';
// Components
import { Loader } from '../../components';
// CSS
import './MoviePage.css';

class MoviePage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
  };

  errorText = 'Sorry, it looks like there is a problem !';

  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    // Get the ID from the path
    const { match } = this.props;
    const id = match && match.params && match.params.id;
    // Send a request to the API
    getData(`movies/${id}`)
      .then(movie => {
        const newState = { loading: false };
        if (isEmpty(movie)) {
          newState.error = true;
        } else {
          newState.error = false;
          newState.movie = movie;
        }
        this.setState(newState);
      })
      .catch(() => {
        this.setState({ loading: false, error: true, movie: null });
      });
  }

  render() {
    const { movie, loading, error } = this.state;
    if (loading) return <Loader />;
    if (error || isEmpty(movie)) return <div>{this.errorText}</div>;
    const { title, year, genres, cast } = movie;
    return (
      <div className="container">
        <div>title : {title || '-'}</div>
        <div>Year : {year || '-'}</div>
        <div>Genres : {genres.length ? genres.join(', ') : '-'}</div>
        <div>Cast : {cast.length ? cast.join(', ') : '-'}</div>
      </div>
    );
  }
}

export default MoviePage;
