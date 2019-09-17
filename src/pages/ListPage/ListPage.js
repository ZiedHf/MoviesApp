import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../../components';
import getData from '../../server';

// TODO: Add search fields
// TODO: Add reset button

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
    };
  }

  componentDidMount() {
    getData('movies').then(movies => this.setState({ movies, loading: false }));
  }

  render() {
    const { movies, loading } = this.state;
    if (loading) return <Loader />;
    return (
      <div>
        {movies.length ? (
          <ul>
            {movies.map(movie => {
              return (
                <li>
                  <Link to={`movies/${movie.id}`}>{movie.title}</Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div>Sorry, there is no movies !</div>
        )}
      </div>
    );
  }
}

export default ListPage;
