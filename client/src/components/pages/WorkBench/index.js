import React, { Component } from 'react';
  // Comment out to prevent warnings when needed they are here for easy access 
import { Row, Container, Col, Button } from 'reactstrap';
import TextCard from '../../parts/TextCard';
import API from '../../../utils/API';

// import SweetAlert from 'react-bootstrap-sweetalert';



/* What I am building today: 
  -
*/

class WorkBench extends Component {

  constructor(props) {
    super(props);

    this.state={
      // User api data pool
      userPool: [],
      admin: false,
      adminKey: ""
    }
  }

  componentDidMount(){
    console.log("Mount state:", this.state);
    this.getUsers()
  }

  componentDidUpdate(){
    console.log("Update state:", this.state);
  }

  // General handler for inputs thats value is to change the state
  // If state does not exsist it makes a state field with its name
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  checkKey = () => {
    let key = this.state.adminKey;
    console.log(process.env.backDoorKey)
    if(key === process.env.backDoorKey){
      
      this.setState({ admin:true  });
    }
    else{
      alert("You don't seem to be an admin");
    }
  }

  // Grabs all users in db and displays them on the DOM
  getUsers= async () => {
    // console.log("Get users: ", this.state);
    // When users are pulled from the db the are put into an array. That array when it contains info loops and makes cards for each user
    API.getUsers().then(res => this.setState({ userPool: res.data }))
    .catch(err => console.error(err));
  }

  // Function that handles the deleting of a single user from the db
    // This will be tied to a button that is tied to a specific user
  deleteUser = id => {
    // console.log("Delete function started");
    alert("You are deleting someting from the db!");
    // Send request to util api call
    API.deleteUser(id).then(res => {
        // console.log("Delete response:", res);
        this.getUsers()
    })
  }

  render() {
    if(this.props.admin){
      return (
        <Container style={styles.box} className="pt-5">
          <Row >
            <TextCard 
              className="mx-auto"
              title="Welcome to your workbench"
              subtitle="Use this to build components away from rest of app"
            >
              <h3 className="text-center">{this.state.input}</h3>
              <input className="form-control" name="input" type="text" onChange={this.handleInputChange}></input>
            </TextCard>
  
          </Row>
            {/* See all users in db */}
            <Col lg="6" className="mx-auto">
              {this.state.userPool.length ? (
                  <div>
                      {this.state.userPool.map((user) => {
                          return(
                              <TextCard
                              key={user._id}
                              title={`Name: ${user.name}`}
                              subtitle={`Username: ${user.username}`}
                              >
                                  <img alt="userAvatar" src={user.avatarImage || "./images/avitars/avitar.png"} />
  
                                  {/* Delete this user button */}
                                  <Button className="m-1" color="danger" onClick={() => this.deleteUser(user._id)}>
                                      Delete
                                  </Button>
                                  
                              </TextCard>
                          )
                      })}
                  </div>
                  // If nothing is in array display empty p tag
              ) : (<p></p>)}
            </Col>
  
          <Row>
  
          </Row>
        </Container>
      );
    }else{
      return(
        <div className="mx-auto m-5 p-5">
          <input name="adminKey" type="text" onChange={this.handleInputChange} />
          <button onClick={this.checkKey}>Adimn Sign In</button>
        </div>
      )
    }
  }

}

const styles = {
  box: {
    backgroundColor: "#efee"
  }
}

export default WorkBench;