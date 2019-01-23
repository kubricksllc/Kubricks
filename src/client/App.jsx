import React, { Component } from "react";
import styled from "styled-components";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import HexTitle from "./layout/HexTitle.jsx";
import ClusterPage from "./components/cluster_page/ClusterPage.jsx";
import NodePage from "./components/node_page/NodePage.jsx";
import TrafficPage from "./components/traffic_page/TrafficPage.jsx";
import PodPage from "./components/pod_page/PodPage.jsx";
import ServicesWindow from "./components/services_window/ServicesWindow.jsx";
import InfoBanner from "./layout/InfoBanner.jsx";
import InfoPane from "./components/info_window/InfoPane.jsx";
import Hex from "./img/Node.svg";

const PageContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 70% 30%;
  grid-template-areas:
    "services content"
    "services info";
`;

const ContentWrapper = styled.section`
  grid-area: content;
  display: flex;
  justify-content: center;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const ServicesWrapper = styled.section`
  grid-area: services;
`;
const InfoWrapper = styled.section`
  grid-area: info;
  border-top: 1px solid #d9d9d9;
  background-color: #262626;
  color: white;
`;

const history = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.state = {
      servicesWindowOpen: true
    };
    this.toggleServicesWindow = this.toggleServicesWindow.bind(this);
  }

  toggleServicesWindow() {
    const toggleVal = !this.state.servicesWindowOpen;
    this.setState({ servicesWindowOpen: toggleVal });
  }

  render() {
    return (
      <Router history={history}>
        <PageContainer>
          <ServicesWrapper>
            <ServicesWindow open={this.state.servicesOpen} />
            {/* <button onClick={() => this.toggleServicesWindow()}>Toggle Me</button>
          <Link to="/pod">back</Link> */}
          </ServicesWrapper>
          <ContentWrapper>
            <InfoBanner />
            <Switch>
              <Route exact path="/" render={props => <ClusterPage />} />
              <Route path="/node" render={props => <NodePage />} />
              <Route path="/traffic" render={props => <TrafficPage />} />
              <Route path="/pod" render={props => <PodPage />} />
              <Route path="*" component={NotFound} />
            </Switch>
          </ContentWrapper>
          <InfoWrapper>
            <InfoPane />
          </InfoWrapper>
        </PageContainer>
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
