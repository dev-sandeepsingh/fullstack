import React, { Component } from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import Layout from "./components/layout.js";

import './styles/app.css';

console.log(`sandeep ${process.env.FIREBASE_API_KEY}`);
firebase.initializeApp({
  apiKey: "AIzaSyDLoqcbTDMFuurtAyDgVEKZ6qwo0j0Osjk",
  authDomain: "fir-auth-tutorial-ed11f.firebaseapp.com"
})

class App extends Component {
  state={isSignedIn:false}
  uiConfig={
    signInFlow:"popup",
    signInOptions:[
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks:{
      signInSuccess:()=>false
    }
  }



  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }


  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
    fetch('http://localhost:8080/firestore/firestoreUsers')
      .then(res => res.json())
      .then(json => json.data)
      .then(users => this.setState({ 'users': users }))
  }
 

  render() {
    return (
      <div className="App">        
        {this.state.isSignedIn ? (          
           <Layout/>
          // <span>
          //   <div>Signed In!</div>
          //   <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
          //   <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          //   <img
          //     alt="profile picture"
          //     src={firebase.auth().currentUser.photoURL}
          //   />
          // </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
      // <Router>
      //   <div class="h-screen flex overflow-hidden bg-gray-100">
      //     <Sidebar />
      //     <Switch>
      //     <Route exact path="/" component={() => <Table users={this.state.users} />} />
      //     <Route path="/documents" component={Documents} />
      //     <Route path="/reports" component={Reports} />
      //     <Route path="/projects" component={Projects} />
      //     <Route path="/teams" component={Teams} />
      //     <Route path="/calender" component={Calender} />
      //     <Route path="/login" component={Login} />
          
      //     </Switch>
      //   </div>
      // </Router>
    );
  }
}

export default App;