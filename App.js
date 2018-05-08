import React from 'react';
import {createStackNavigator} from 'react-navigation';
import Home from './pages/Home';
import Details from './pages/Details';
import Graph from './pages/Graph';


export default createStackNavigator({
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

