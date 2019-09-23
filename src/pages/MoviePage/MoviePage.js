import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
// Helpers
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import get from 'lodash/get';
// API
import getData from '../../server';
// Components
import { Loader, Button } from '../../components';
// CSS
import './MoviePage.css';

class MoviePage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  errorText = 'Sorry, it looks like there is a problem !';

  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      loading: true,
      error: false,
      nextExist: false,
      prevExist: false,
    };
  }

  componentDidMount() {
    this.refreshMovie();
  }

  componentDidUpdate(prevProps) {
    const prevId = get(prevProps, 'match.params.id');
    const id = get(this.props, 'match.params.id');
    if (prevId && id && prevId !== id) {
      this.refreshMovie();
    }
  }

  refreshMovie = () => {
    // Get the ID from the path
    const { match } = this.props;
    const id = match && match.params && match.params.id;
    // Send a request to the API
    const newState = { loading: false };

    // Main request
    const call1 = getData(`movies/${id}`);

    // Is previous exists
    const call2 = getData(`movies/${+id - 1}`);

    // Is next exists
    const call3 = getData(`movies/${+id + 1}`);

    const promises = [call1, call2, call3];
    Promise.all(promises)
      .then(data => {
        const [mainMovie, prevMovie, nextMovie] = data;
        // Main movie
        if (isEmpty(mainMovie)) {
          newState.error = true;
        } else {
          newState.error = false;
          newState.movie = mainMovie;
        }
        // Previous movie
        newState.prevExist = isObject(prevMovie) && !isEmpty(prevMovie);
        // Next Movie
        newState.nextExist = isObject(nextMovie) && !isEmpty(nextMovie);
        // Setting the state here
        this.setState(newState);
      })
      .catch(() => {
        newState.error = true;
        newState.movie = null;
        this.setState(newState);
      });
  };

  navigate = navigateTo => {
    const {
      history: { push },
      match: {
        params: { id },
      },
    } = this.props;
    // Show the loader
    this.setState({ loading: true });
    switch (navigateTo) {
      case 'prev':
        push(`/movies/${+id - 1}`);
        break;
      case 'next':
        push(`/movies/${+id + 1}`);
        break;
      default: {
        console.warn('Unknown navigaion type ');
      }
    }
  };

  render() {
    const { movie, loading, error, prevExist, nextExist } = this.state;
    if (loading) return <Loader />;
    if (error || isEmpty(movie)) return <div>{this.errorText}</div>;
    const { title, year, genres, cast } = movie;
    return (
      <div className="container">
        <div className="movie">
          <div>title : {title || '-'}</div>
          <div>Year : {year || '-'}</div>
          <div>Genres : {genres.length ? genres.join(', ') : '-'}</div>
          <div>Cast : {cast.length ? cast.join(', ') : '-'}</div>
        </div>
        <div className="navigation">
          <Button
            type={prevExist ? 'default' : 'disabled'}
            label="Previous"
            onClick={() => this.navigate('prev')}
          />
          <Button
            type={nextExist ? 'default' : 'disabled'}
            label="Next"
            onClick={() => this.navigate('next')}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(MoviePage);
