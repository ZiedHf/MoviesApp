import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Router
import { withRouter } from 'react-router';
// Helpers
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

import { removeDuplicates } from '../../utils';
// API
import getData from '../../server';
// Component
import {
  Loader,
  Card,
  Button,
  Container,
  Combo,
  Input,
} from '../../components';

// CSS
import './ListPage.css';
// TODO: Add search fields
// TODO: Add reset button

class ListPage extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      cast: [],
      genres: [],
      loading: true,
      togglerHideAll: false,
      filters: {},
    };
  }

  componentDidMount() {
    getData('movies').then(movies => {
      const cast = removeDuplicates(
        movies.map(movie => movie.cast).flat(),
      ).sort();
      const genres = removeDuplicates(
        movies.map(movie => movie.genres).flat(),
      ).sort();
      this.setState({ movies, cast, genres, loading: false });
    });
  }

  hideAllToggler = () => {
    this.setState(prevState => ({
      togglerHideAll: !prevState.togglerHideAll,
    }));
  };

  onChangeFilter = (e, filter) => {
    const newValue = get(e, 'target.value');
    this.setState(prevState => {
      const filters = cloneDeep(prevState.filters);
      filters[filter] = newValue;
      return { filters };
    });
  };

  resetFilters = () => this.setState({ filters: {} });

  render() {
    const {
      movies,
      loading,
      togglerHideAll,
      cast,
      genres,
      filters: { filterCast, filterGenres, filterTitle },
    } = this.state;
    const { history } = this.props;
    if (loading) return <Loader />;
    const moviesToDisplay = movies.filter(movie => {
      if (filterCast && !movie.cast.includes(filterCast)) return false;
      if (filterGenres && !movie.genres.includes(filterGenres)) return false;
      if (
        filterTitle &&
        !movie.title.toLowerCase().includes(filterTitle.toLowerCase())
      )
        return false;
      return true;
    });
    return (
      <div>
        <Container>
          <div className="configs">
            <Button label="Hide All Details" onClick={this.hideAllToggler} />
            <Button label="Reset Filters" onClick={this.resetFilters} />
          </div>
          <div className="filters">
            <Input
              label="Title"
              value={filterTitle || ''}
              onChange={e => this.onChangeFilter(e, 'filterTitle')}
            />
            <Combo
              label="Cast"
              options={cast}
              onChange={e => this.onChangeFilter(e, 'filterCast')}
              value={filterCast || ''}
            />
            <Combo
              label="Genres"
              options={genres}
              onChange={e => this.onChangeFilter(e, 'filterGenres')}
              value={filterGenres || ''}
            />
          </div>
        </Container>
        {moviesToDisplay.length ? (
          <ul className="moviesListContainer">
            {moviesToDisplay.map(movie => (
              <li key={movie.id}>
                <Card
                  title={movie.title}
                  description={movie.description}
                  id={movie.id}
                  year={movie.year}
                  toggler={togglerHideAll}
                  onOpenPage={() => history.push(`/movies/${movie.id}`)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div>Sorry, there is no movies !</div>
        )}
      </div>
    );
  }
}

export default withRouter(ListPage);
