import React from 'react';
import {Provider} from 'react-redux'
import configureStore from './configureStore'
import Index from './pages/Index';

const store = configureStore();

export default App = () => {
    return (
        <Provider store={store}>
            <Index />
        </Provider>
    );
}


