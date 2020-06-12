import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from "./sidebar.js";
import Table from "./table.js";
import Documents from "./documents.js";
import Projects from "./projects.js";
import Reports from "./reports.js";
import Teams from "./teams.js";
import Calender from "./calender.js";


class Layout extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }


  componentDidMount = () => {
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

export default Layout;