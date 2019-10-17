import React, {Component} from 'react';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import ViewItem from './ViewItem';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css'
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
        <Route exact path="/" component = {Home} />
        <Route path="/view/:id" component = {ViewItem} />
        <Footer />
        </div>
      </Router>
      
      
  
      );
  }
  
}

export default App;
