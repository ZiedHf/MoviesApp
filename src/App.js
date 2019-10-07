import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HelloPage, ListPage, ErrorPage, MoviePage } from './pages';
import { Menu, Loader } from './components';
// API
import getData from './server';
import './App.css';

class App extends Component {
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

  onChangeTheme = () => {
    this.setState(prevState => ({
      selectedTheme: prevState.selectedTheme === 0 ? 1 : 0,
    }));
  };

  render() {
    const { themes, selectedTheme, loading } = this.state;
    console.log(themes, selectedTheme);
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
        </Router>
      </div>
    );
  }
}

export default App;
