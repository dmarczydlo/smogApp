import React from 'react';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Index from './pages/Index';

export default App = () => {

    const store = createStore(reducers, applyMiddleware(thunk));
    return (
        <Provider store={store}>
            <Index />
        </Provider>
    );
}


