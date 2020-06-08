import React, { Component } from "react";

import Table from "./components/Table.js";

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
      <Table users={this.state.users} />
    );
  }
}

export default App;