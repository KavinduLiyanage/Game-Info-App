import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

import AddGame from "./components/addGame";
import EditGame from "./components/editGame";
import Home from "./components/Home";
import ManageGames from "./components/manageGames";

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
                    <Link to={'/manage'} className="nav-link">Product List</Link>
                  </li>
                </ul>
              </div>
            </nav>

            <Switch>
              <Route exact path = '/add' component = { AddGame }/>
              <Route exact path = '/edit/:id' component = { EditGame }/>
              <Route exact path = '/' component = { Home }/>
              <Route exact path = '/manage' component = { ManageGames }/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
