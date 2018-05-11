import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Home from './pages/Home';
import Details from './pages/Details';
import Graph from './pages/Graph';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const Navigator = createStackNavigator({
        Home: {
            screen: Home
        },
        Details: {
            screen: Details,
        },
        Graph: {
            screen: Graph,
        },
    },
    {
        initialRouteName: 'Home',
    }
);

export default Index = () => {

    const store = createStore(reducers, applyMiddleware(thunk));
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    );
}


