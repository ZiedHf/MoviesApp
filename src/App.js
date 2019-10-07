import React, { Component } from 'react';
// Proptypes
import PropTypes from 'prop-types';
// Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
// Actions
import { incrementCount, getThemes, onChangeTheme } from './Actions';
// Component
import { HelloPage, ListPage, ErrorPage, MoviePage } from './pages';
import { Menu, Loader, Button } from './components';
// API
// import getData from './server';
import './App.css';

class App extends Component {
  static propTypes = {
    count: PropTypes.number,
    dispatch: PropTypes.func,
    themes: PropTypes.array,
    selectedTheme: PropTypes.number,
  };

  state = {
    loading: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getThemes());
  }

  componentDidUpdate(prevProps) {
    const { count: prevCount, themes: prevThemes } = prevProps;
    const { count, themes } = this.props;
    if (themes.length && !prevThemes.length) this.setState({ loading: false });
    if (themes.length && prevCount !== count) this.onChangeTheme();
  }

  onChangeTheme = () => {
    const { dispatch } = this.props;
    dispatch(onChangeTheme());
    /* this.setState(prevState => ({
      selectedTheme: prevState.selectedTheme === 0 ? 1 : 0,
    })); */
  };

  increment = () => {
    const { dispatch } = this.props;
    dispatch(incrementCount());
  };

  render() {
    const { loading } = this.state;
    const { count, themes, selectedTheme } = this.props;

    if (loading) return <Loader />;
    const theme = themes[selectedTheme];
    return (
      <div style={theme.root}>
        <Router>
          <Menu />
          <Switch>
            <Route path="/" exact>
              <HelloPage theme={theme} />
            </Route>
            <Route path="/movies/:id">
              <MoviePage theme={theme} />
            </Route>
            <Route path="/movies">
              <ListPage theme={theme} />
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

const mapStateToProps = ({ count, themes, selectedTheme }) => ({
  count,
  themes,
  selectedTheme,
});

export default connect(mapStateToProps)(App);
