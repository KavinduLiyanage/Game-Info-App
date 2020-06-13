import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

class App extends Component{

  render() {
    return (
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <Link to={'/'} className="navbar-brand">React crud</Link>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link to={'/'} className="nav-link">Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/add'} className="nav-link">Create</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/list'} className="nav-link">Product List</Link>
                  </li>
                </ul>
              </div>
            </nav>

            <Switch>
              <Route exact path = '/add' component = { AddProduct }/>
              <Route path = '/edit/:id' component = { EditProduct }/>
              <Route path = '/list' component = { ListProduct }/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
