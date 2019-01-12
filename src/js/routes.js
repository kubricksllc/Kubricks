import asyncComponent from './AsyncComponent.js';

const NodePage = asyncComponent(() => 
    import('./components/node_page/NodePage.jsx').then(module => module.default)
);

const PodPage = asyncComponent(() => 
    import('./components/pod_page/PodPage.jsx').then(module => module.default)
);

export {
    NodePage,
    PodPage
};