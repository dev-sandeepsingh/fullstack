import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Table from "./components/table.js";
import Sidebar from "./components/sidebar.js";
import Documents from "./components/documents.js";
import Projects from "./components/projects.js";
import Reports from "./components/reports.js";
import Teams from "./components/teams.js";
import Calender from "./components/calender.js";


import './styles/app.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }



  componentDidMount() {
    fetch('http://localhost:8080/firestore/firestoreUsers')
      .then(res => res.json())
      .then(json => json.data)
      .then(users => this.setState({ 'users': users }))
  }

  render() {
    return (
      <Router>
        <div class="h-screen flex overflow-hidden bg-gray-100">
          <Sidebar />
          <Switch>
          <Route exact path="/" component={() => <Table users={this.state.users} />} />
          <Route path="/documents" component={Documents} />
          <Route path="/reports" component={Reports} />
          <Route path="/projects" component={Projects} />
          <Route path="/teams" component={Teams} />
          <Route path="/calender" component={Calender} />
          
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;