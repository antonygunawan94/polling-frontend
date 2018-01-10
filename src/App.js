import React, { Component } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom'
import {
  Switch,
  Route
} from 'react-router'
import { ToastContainer } from "react-toastify";
import Home from './components/Home';
import PollingCreate from './components/PollingCreate';
import PollingDetail from './components/PollingDetail';
import PollingAnswer from "./components/PollingAnswer";
import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/polling/create" component={PollingCreate}/>
            <Route exact path="/polling/:id" component={PollingDetail}/>
            <Route exact path="/polling/answer/:username/:id" component={PollingAnswer}/>
          </Switch>
        </Router>
        <ToastContainer />
      </div>

    );
  }
}

export default App;
