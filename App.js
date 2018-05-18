import React, {Component} from 'react';
import {Provider} from 'react-redux'
import configureStore from './configureStore'
import Index from './pages/Index';
import SplashScreen from 'react-native-splash-screen';

const store = configureStore();

export default class App extends Component {

    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return (
            <Provider store={store}>
                <Index/>
            </Provider>
        );
    }
}


