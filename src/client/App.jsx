import React, { Component } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import path from 'path';
import createBrowserHistory from "history/createBrowserHistory";
import HexTitle from "./layout/HexTitle.jsx";
import ClusterPage from "./components/cluster_page/ClusterPage.jsx";
import NodePage from "./components/node_page/NodePage.jsx";
import PodPage from "./components/pod_page/PodPage.jsx";
import ServicesWindow from "./components/services_window/ServicesWindow.jsx";
import InfoBanner from "./layout/InfoBanner.jsx";

const PageContainer = styled.div`
  display: flex;
`;

const ContentWrapper = styled.section`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
`
const HexWindow = styled.img`
  height: 80vh;
  position: absolute;
  z-index: -1;
`

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
                <ContentWrapper>
                  <HexWindow src={path.resolve(__dirname, "./img/Node.svg")}/>
                  <InfoBanner />
                    <Switch>
                        <Route exact path="/" render={() => (<Home title={this.state.title}/>)}/>
                        <Route path="/cluster/:id" render={(props) => (<ClusterPage clusterID={parseInt(props.match.params.id)}/>)} />
                        <Route path="/node/:id" render={(props) => (<NodePage nodeID={parseInt(props.match.params.id)}/>)} />
                        <Route path="/pod/:id" render={(props) => (<PodPage podID={parseInt(props.match.params.id)}/>)} />
                        {/* add route paths here */}
                        <Route path="*" component={NotFound} />
                    </Switch>
                </ContentWrapper>
              </PageContainer>
          </div>
      </Router>
    );
  }
}

// TODO: remove later
const Home = props => (
  <div>
  </div>
);

const NotFound = () => (
  <div className="">
    <p>404</p>
    <p>Page not found - </p>
  </div>
);

export default App;
