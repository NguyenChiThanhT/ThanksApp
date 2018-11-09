import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './src/redux/Store';
import Routers from './src/routers/Routers';
export default class App extends Component<Props> {
    render() {
        return(
            <Provider store={store}>
                <Routers />
            </Provider>
        );
    }
}
