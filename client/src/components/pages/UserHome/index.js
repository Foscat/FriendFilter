import React, { Component } from 'react';
import TextCard from '../../parts/TextCard';
import API from "../../../utils/API";
import SweetAlert from 'react-bootstrap-sweetalert';
import AvatarSelector from '../../parts/AvatarSelector';

class UserHome extends Component {

    constructor(props){
        super(props);

        this.state={
            user: props.user,
            signedIn: false,
            show: false,
            title: "model",
            matches: []
        }
    }

    componentDidMount(){
      console.log("UserHome mount state", this.state);
      this.props.authenticate();
    }
    componentDidUpdate(){
        console.log("UserHome updated state", this.state);
    }

    componentWillReceiveProps(props){
      console.log("refresh", props);
      this.setState({ user: props.user });
      if(props.user){
          this.setState({ signedIn: true });
      }
  }

  selectAvatar = imgSrc => {
    API.updateUser(this.state.user._id, {avatarImage:imgSrc}).then(res => {
      console.log("Change avitar complete", res.data);
      window.location.reload(false);
    }).catch(err => {
      console.error("Change avitar hit an error", err);
    })
  }

  avatarModel = () => {
    let text = (
      <AvatarSelector selectAvatar={this.selectAvatar} />
    );
    // Update state to show model
    this.setState({
    title: "Select your avatar",
    text: text,
    show: true
    })
}

getMatches = () => {
  console.log("Get matches");
  API.findMatches({personalityType:this.state.user.personalityType}).then(res => {
    console.log("Matches to client", res);
    this.setState({ matches: res.data.info });
  }).catch(err => console.error("There was an error", err));
}

    render() {
      if(Object.keys(this.state.user).length){
        return (
          <div>
            <SweetAlert
                show={this.state.show}
                title={this.state.title}
                onConfirm={() => this.setState({ show: false })}
                style={{ minWidth: "35%" }}
            >
                <div style={styles.sweetBox}>
                    {this.state.text}
                </div>
            </SweetAlert>
  
  
            <TextCard 
              style={styles.container}
              title={`Name: ${this.state.user.name}`}
              subtitle={`Username: ${this.state.user.username}`}
            >
  
              <div className="row">
                <div style={{flexWrap: "wrap"}} className="col mx-auto">
                  <img className="rounded" style={styles.cardImg} src={this.state.user.avatarImage|| "./images/avitars/avitar.png"} alt="avitar" />
                  <button className="btn m-3" onClick={this.avatarModel}><span role="img" aria-label="avatars">&#128101;</span></button>
                </div>
                
                <div className="col mx-auto">
                  <ul>
                    <li>Your number: {this.state.user.phone_num}</li>
                    <li>Your email: {this.state.user.email}</li>
                    <li>Date you joined: {this.state.user.createdAt}</li>
                    <li>Personality type: {this.state.user.personalityType || "Wet blanket"}</li>
                  </ul>
  
                  {this.state.user.personalityType ? 
                    <a href="/survey"><button type="button" className="btn btn-info m-1">Retake Personality Test</button></a> :
                    <a href="/survey"><button type="button" className="btn btn-warning m-1">Take Personality Test</button></a>
                  }
  
                  <button onClick={this.getMatches} className="btn-success btn">Get matches</button>
                  <button type="button" className="btn btn-danger m-1" onClick={this.props.signOut}>Sign out</button>
                </div>
  
              </div>

              <div className="row mx-auto">
                  {this.state.matches.length ? this.state.matches.map((match, index) => {
                    if(match._id !== this.state.user._id){
                      return(
                        <TextCard
                          key={index}
                          className="col-12 m-1"
                          title={`Name: ${match.name}`}
                          subtitle={`Username: ${match.username}`}
                        >
                          <img style={styles.cardImg} src={match.avatarImage|| "./images/avitars/avitar.png"}
                           alt="matchAvatar" />
                        </TextCard>
                      )
                    }
                    else return null
                  }) : null}
                </div>

            </TextCard>
          </div>
        )
      }else{
        return(
          <div>
            Reload page please
          </div>
        )
      }
    }
}

const styles = {
  sweetBox:{ 
    maxHeight: "50vh", 
    minWidth: "35%", 
    overflow: "auto" 
  },
  cardImg: {
    height:"100%",
    width: "100%",
    maxWidth: "350px",
    maxHeight: "350px"
  },
  container: {
    padding: "20px",
    backgroundColor: "rgb(54, 113, 148, 50%)"
  }
}
export default UserHome;