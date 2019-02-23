import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Auth from './components/auth';
import Loading from './components/auth/loading';
import Home from './components/home';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGESENDERID
}
firebase.initializeApp(config);

const router = (
    <Router>
        <div>
            <Route exact path="/" component={Loading} />
            <Route path="/home" component={Home} />
            <Route path="/auth" component={Auth} />
        </div>
    </Router>
);

ReactDOM.render(router, document.getElementById('root'));
