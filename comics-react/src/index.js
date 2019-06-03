import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'font-awesome/css/font-awesome.min.css';
import 'font-awesome/less/font-awesome.less';

import { Router } from 'react-router-dom';
import createBrowserHistory from "history/createBrowserHistory";


const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
