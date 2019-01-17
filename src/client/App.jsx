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
import node from './img/Node.svg';

const PageContainer = styled.div`
  display: flex;
`;

const ContentWrapper = styled.section`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
`;

const img_src = './img/Node.svg';

const HexWindow = styled.div`
  height: 80vh;
  position: absolute;
  z-index: -1;
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
                <ContentWrapper>
                  <HexWindow />
                  <InfoBanner />
                    <Switch>
                        <Route exact path="/" render={(props) => (<ClusterPage/>)} />
                        <Route path="/node" render={(props) => (<NodePage/>)} />
                        <Route path="/pod" render={(props) => (<PodPage/>)} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </ContentWrapper>
              </PageContainer>
              <Link to="/pod">back</Link>
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
