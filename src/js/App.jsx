import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import MainWindow from './components/container/MainWindow.jsx';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

const ColoredTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: red;
`;

const history = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.state= {
      title: 'Hello Kubricks!'
    }
  }

  componentDidMount() {
    // fetch('http://localhost:3000/posts')
    // .then(response => response.json())
    // .then(json => console.log(json));
  }

  render() {
    return (
      <Router history={history}>
          <div>
              <header className="header">
                  <nav className="navbar container">
                      <div className="navbar-brand">
                          <Link to="/">
                              <span className="navbar-item">Lazy Loading Routes</span>
                          </Link>
                      </div>

                      <div className="navbar-end">
                          <Link to="/maps">
                              <span className="navbar-item">Maps</span>
                          </Link>
                          <Link to="/blog">
                              <span className="navbar-item">Blog</span>
                          </Link>
                      </div>
                  </nav>
              </header>
              <section className="content">
                  <Switch>
                      <Route exact path="/" render={() => (<Home title={this.state.title}/>)}/>
                      <Route path="/node/:id" render={(props) => (<MainWindow nodeID={parseInt(props.match.params.id)}/>)} />
                      {/* add route paths here */}
                      <Route path="*" component={NotFound} />
                  </Switch>
              </section>
          </div>
      </Router>
    );
  }
}

const Home = (props) => (
  <div>
    <ColoredTitle>{props.title}</ColoredTitle>
  </div>
);

const NotFound = () => (
  <div className="">
      <p>404</p>
      <p>Page not found - </p>
  </div>
);

export default App;