import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Router
import { withRouter } from 'react-router';
// API
import getData from '../../server';
// Component
import { Loader, Card, Button } from '../../components';

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
      loading: true,
      togglerHideAll: false,
    };
  }

  componentDidMount() {
    getData('movies').then(movies => this.setState({ movies, loading: false }));
  }

  hideAllToggler = () => {
    this.setState(prevState => ({
      togglerHideAll: !prevState.togglerHideAll,
    }));
  };

  render() {
    const { movies, loading, togglerHideAll } = this.state;
    const { history } = this.props;
    if (loading) return <Loader />;
    return (
      <div>
        <div className="configs">
          <Button label="Hide All Details" onClick={this.hideAllToggler} />
        </div>
        {movies.length ? (
          <ul className="moviesListContainer">
            {movies.map(movie => (
              <li>
                <Card
                  key={movie.id}
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
