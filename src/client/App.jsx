import React, { Component } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import HexTitle from "./layout/HexTitle.jsx";
import ClusterPage from "./components/cluster_page/ClusterPage.jsx";
import NodePage from "./components/node_page/NodePage.jsx";
import PodPage from "./components/pod_page/PodPage.jsx";
import ServicesWindow from "./components/services_window/ServicesWindow.jsx";
import InfoBanner from "./layout/InfoBanner.jsx";
import Hex from "./img/Node.svg";

const PageContainer = styled.div`
  display: flex;
`;

const ContentWrapper = styled.section`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  background: url(${Hex});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const history = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "Hello Kubricks!"
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Router history={history}>
        <div>
          <PageContainer>
            <ServicesWindow />
              <Switch>
                <Route exact path="/" render={props => <ClusterPage />} />
                <Route path="/node" render={props => <NodePage />} />
                <Route path="/pod" render={props => <PodPage />} />
                <Route path="*" component={NotFound} />
              </Switch>
          </PageContainer>
          <Link to="/">back</Link>
        </div>
      </Router>
    );
  }
}

const NotFound = () => (
  <div className="">
    <p>404</p>
    <p>Page not found - </p>
  </div>
);

export default App;
