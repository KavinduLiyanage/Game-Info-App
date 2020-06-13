import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

import AddGame from "./components/addGame";
import EditGame from "./components/editGame";
import ListGame from "./components/listGame";

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
              <Route exact path = '/add' component = { AddGame }/>
              <Route path = '/edit/:id' component = { EditGame }/>
              <Route path = '/list' component = { ListGame }/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;
