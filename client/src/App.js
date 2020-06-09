import React, { Component } from "react";

import Table from "./components/table.js";
import Sidebar from "./components/sidebar.js";


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
      <div class="h-screen flex overflow-hidden bg-gray-100">
      <Sidebar/>
      <Table users={this.state.users} />
      </div>
    );
  }
}

export default App;