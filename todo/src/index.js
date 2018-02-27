import React from 'react';
import ReactDOM from 'react-dom';
import Main from './scripts/components/Main';
import Footer from './scripts/components/Footer';
import './index.css';
import store from './scripts/store';
import {Provider} from 'react-redux';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <header>React Todo</header>
                <Main />
                <Footer />
            </div>
        );
    };
};

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);