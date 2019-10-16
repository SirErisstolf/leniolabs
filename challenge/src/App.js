import React, {Component} from 'react';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';

import './App.scss';
import {
  BrowserRouter as Router,
//  Switch,
  Route,
//  Link
} from "react-router-dom";

class App extends Component {
  render(){
    return (
      <Router>
        <div>
        <Header />
        <Route path="/" component = {Home} />
        <Footer />
        </div>
      </Router>
      
      
  
      );
  }
  
}

export default App;
