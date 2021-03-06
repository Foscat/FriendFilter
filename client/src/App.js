import React, { Component } from 'react';
import {  BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { Container, Button } from "reactstrap";
import Home from "./components/pages/Home";
// import WorkBench from './components/pages/WorkBench';
import Forum from "./components/pages/Forum";
import NoMatch from './components/pages/NoMatch';
import NavBar from "./components/parts/NavBar";
import API from './utils/API';
import UserHome from './components/pages/UserHome';
import Survey from './components/pages/Survey';


// This is the router for react page components
class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: "",
            loading: false,
            loggedIn: false,
        }
    }

    componentDidMount(){
        console.log("App mount state:", this.state);
        console.log("local storage token: ", localStorage.getItem("token"));
        if(localStorage.getItem("token")){
            this.authenticate();
        }
    }

    componentDidUpdate(){
        console.log("App update state:", this.state);
    }

    // General handler for inputs thats value is to change the state
    // If state does not exsist it makes a state field with its name
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    }

    setAutoLogin = (username, password) => {
        this.setState({ 
            logInUsername: username,
            logInPassword: password
        });
        this.logInUser();
    }

    logInUser = () => {
        let s = this.state;

        // If one of the form fields has no value block submit
        if (!s.logInUsername ||!s.logInPassword) {
          // If failed block submit and show alert
          this.setState({
            title: "Error",
            text: "Please fill out all fields before attempting sign in.",
            show: true
          });
          return;
        }
        // Send field info to db using utils api call
        API.signInUser({
            username: s.logInUsername,
            password: s.logInPassword
        })
        // After form submits call function to get all users to see updated info and close model
        .then(res => {
            console.log(res.data);
            this.setState({show: false, token: res.data.info, user: res.data.user[0], loggedIn:true});
            localStorage.setItem("token",res.data.info);
            return res
        }).catch(err =>{
            console.error("There was an error with sign in", err)
        });
    }

    authenticate = async () => {
        API.currentUser({token: localStorage.getItem("token")})
        .then(res => {
            console.log("Authenticate res",res);
            this.setState({ user: res.data[0], loggedIn: true });
            return res.data[0];
        })
        .catch(err => {
            console.error("Authentication error", err);
            return err;
        })
    }

    signOutUser = () => {
        localStorage.removeItem("token");
        this.setState({ user: "", loggedIn: false });
    };

    isLoggedIn = () =>{
        return this.state.loggedIn;
    }

    render() {
        let home;
        let forum;
        if(!this.state.loggedIn){
            home =  <Home 
                    authenticate={this.authenticate}
                    logIn={this.logInUser}
                    handleChange={this.handleInputChange}
                    signOut={this.signOutUser}
                    autoLogIn={this.setAutoLogin}
                />
            forum= <Container className="mx-auto text-center pt-4">
                        <h3>You must be signed in to view this feature</h3>
                        <a href="/"><Button color="info">Back To Home</Button></a>
                    </Container>
            
        }
        else {
            home = <UserHome user={this.state.user} signOut={this.signOutUser} authenticate={this.authenticate} />
            forum= <Forum user={this.state.user} signOut={this.signOutUser} authenticate={this.authenticate} />
        }
        return (
            <div style={{backgroundColor: "#b0cdde"}}>
                {/* Allows navbar to stay on all pages */}
                <NavBar />
                <Router>
                    <div>
                        <Switch>
                            {/* 'exact path' is how you set up html page routes */}
                            <Route exact key="home" path="/" render={() => home}  />
                            {/* Route to survey page */}
                            <Route exact path="/survey" render={()=> 
                                <Survey 
                                    logIn={this.logInUser} 
                                    user={this.state.user}
                                    changeAppState={this.handleInputChange} 
                                    authenticate={this.authenticate} 
                                />
                            } />
                            {/* Workbench is for writing new code to keep new parts isolated for easier developing */}
                            {/* <Route exact path="/workbench" component={WorkBench} /> */}
                            <Route exact path="/forum" render={() => forum } />
                            {/* If no url routes match show error page */}
                            <Route component={NoMatch} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}


export default App;