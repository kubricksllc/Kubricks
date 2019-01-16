import React, { Component } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import HexTitle from "./layout/HexTitle.jsx";
import ClusterPage from "./components/cluster_page/ClusterPage.jsx";
import NodePage from "./components/node_page/NodePage.jsx";
import PodPage from "./components/pod_page/PodPage.jsx";
import ServicesWindow from "./components/services_window/ServicesWindow.jsx";

const PageContainer = styled.div`
  display: flex;
`;

const ColoredTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: red;
`;

const history = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "Hello Kubricks!"
    };
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
                  <HexTitle title={this.state.title}></HexTitle>
              </header>
              <PageContainer >
              <ServicesWindow />
              <section className="content">
                  <Switch>
                      <Route exact path="/" render={() => (<Home title={this.state.title}/>)}/>
                      <Route path="/cluster/:id" render={(props) => (<ClusterPage clusterID={parseInt(props.match.params.id)}/>)} />
                      <Route path="/node/:id" render={(props) => (<NodePage nodeID={parseInt(props.match.params.id)}/>)} />
                      <Route path="/pod/:id" render={(props) => (<PodPage podID={parseInt(props.match.params.id)}/>)} />
                      {/* add route paths here */}
                      <Route path="*" component={NotFound} />
                  </Switch>
              </section>
              </PageContainer>
          </div>
      </Router>
    );
  }
}

// TODO: remove later
const Home = props => (
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
