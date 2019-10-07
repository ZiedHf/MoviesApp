import React, { Component } from 'react';
// Proptypes
import PropTypes from 'prop-types';
// Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
// Actions
import { incrementCount } from './Actions';
// Component
import { HelloPage, ListPage, ErrorPage, MoviePage } from './pages';
import { Menu, Loader, Button } from './components';
// API
import getData from './server';
import './App.css';

class App extends Component {
  static propTypes = {
    count: PropTypes.number,
    dispatch: PropTypes.func,
  };

  state = {
    themes: [],
    selectedTheme: 0,
    loading: true,
  };

  componentDidMount() {
    getData('themes').then(themes => {
      this.setState({ themes, loading: false });
    });
  }

  componentDidUpdate(prevProps) {
    const { count: prevCount } = prevProps;
    const { count } = this.props;
    const { themes } = this.state;
    if (themes.length && prevCount !== count) this.onChangeTheme();
  }

  onChangeTheme = () => {
    this.setState(prevState => ({
      selectedTheme: prevState.selectedTheme === 0 ? 1 : 0,
    }));
  };

  increment = () => {
    const { dispatch } = this.props;
    dispatch(incrementCount());
  };

  render() {
    const { themes, selectedTheme, loading } = this.state;
    const { count } = this.props;

    if (loading) return <Loader />;
    const theme = themes[selectedTheme];
    return (
      <div style={theme.root}>
        <Router>
          <Menu />
          <Switch>
            <Route path="/" exact>
              <HelloPage theme={theme} onChangeTheme={this.onChangeTheme} />
            </Route>
            <Route path="/movies/:id">
              <MoviePage theme={theme} />
            </Route>
            <Route path="/movies">
              <ListPage theme={theme} onChangeTheme={this.onChangeTheme} />
            </Route>
            <Route component={ErrorPage} />
          </Switch>
          <div>
            From Redux Store : {count}
            <Button label="Increment" onClick={this.increment} />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ count }) => ({
  count,
});

export default connect(mapStateToProps)(App);
