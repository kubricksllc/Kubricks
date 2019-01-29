import React, { Component } from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import ClusterPage from './components/cluster_page/ClusterPage.jsx';
import NodePage from './components/node_page/NodePage.jsx';
import TrafficPage from './components/traffic_page/TrafficPage.jsx';
import ServicesWindow from './components/services_window/ServicesWindow.jsx';
import InfoBanner from './layout/InfoBanner.jsx';
import InfoPane from './components/info_window/InfoPane.jsx';
import ReactDOM from 'react-dom';

const PageContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: 70% 30%;
  grid-template-areas:
    'services content'
    'services info';
`;

const ContentWrapper = styled.section`
  grid-area: content;
  display: flex;
  justify-content: center;
  background-color: #d6d6d6;
`;

const ServicesWrapper = styled.section`
  grid-area: services;
  border-right: 2px solid #1a1a1a;
  background-color: #212121;
  color: white;
`;
const InfoWrapper = styled.section`
  grid-area: info;
  padding-left: 1em;
  border-top: 1px solid #d9d9d9;
  background-color: #272822;
  color: white;
`;

const history = createBrowserHistory();
history.push('/');

class App extends Component {
  constructor() {
    super();
    //The initial dimensions of the Wrapper
    const initialWrapper = {
      width: window.screen.width * 0.8,
      height: window.screen.height * 0.7
    };

    this.state = {
      servicesWindowOpen: true,
      initialWrapper: initialWrapper,
      wrapper: initialWrapper,
      infoWindowHeight: window.screen.height * 0.3
    };
    this.toggleServicesWindow = this.toggleServicesWindow.bind(this);
  }

  updateDimensions(e) {
    const wrapperDOM = ReactDOM.findDOMNode(this.refs.contentWrapper);
    const infoWindowDOM = ReactDOM.findDOMNode(this.refs.infoWrapper);
    this.setState({
      wrapper: {
        width: wrapperDOM.offsetWidth,
        height: wrapperDOM.offsetHeight
      },
      infoWindowHeight: infoWindowDOM.offsetHeight
    });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
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
          <ContentWrapper ref="contentWrapper">
            {/* <InfoBanner /> */}
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <ClusterPage
                    width={this.state.wrapper.width}
                    height={this.state.wrapper.height}
                    initialWrapper={this.state.initialWrapper}
                  />
                )}
              />
              <Route path="/node" render={props => <NodePage />} />
              <Route
                path="/traffic"
                render={props => (
                  <TrafficPage
                    width={this.state.wrapper.width}
                    height={this.state.wrapper.height}
                  />
                )}
              />
              <Route path="/pod" render={props => <PodPage />} />
              <Route path="*" component={NotFound} />
            </Switch>
          </ContentWrapper>
          <InfoWrapper ref="infoWrapper">
            <InfoPane infoWindowHeight={this.state.infoWindowHeight} />
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
