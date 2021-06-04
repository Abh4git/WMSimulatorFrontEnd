//Router for supporting multiple routes
import {BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Component } from 'react';

//Custom imports as part of Assessmake21
import Login from './components/screens/login';



import './App.scss';

class App extends Component {

  constructor() {
    super()
    this.state = {
      user: null
    }
  }

  setAppState = (newState, cb = null) => {
    this.setState({newState}, !!cb ? cb : null)
  }

  render() {
    return (
      <Router>
        <Route path="/" exact component={() => <Login setAppState={this.setAppState} />}/>
        <Redirect from="*" to="/" />
      </Router>
    );
  }
}

export default App;
