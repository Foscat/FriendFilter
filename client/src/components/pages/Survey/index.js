import React, { Component } from 'react';
import { Button, Form, Row, Container, Col } from 'reactstrap';
import SurveyQuestion from '../../parts/SurveyQuestion';
import LogIn from '../../parts/Models/LogIn';
import TextCard from '../../parts/TextCard';
import API from '../../../utils/API';
import Loader from '../../parts/Loader';
import SweetAlert from 'react-bootstrap-sweetalert';
const suerveyQuestions = require('../../../utils/surveyQuestions');

class Survey extends Component  {

    constructor(props) {
        super(props);

        this.state = {
            surveyQuestions: suerveyQuestions,
            answers: [],

            user: this.props.user,
            signedIn: false,

            loading: true,
            redirect: false,

            // Model attrs
            show: false,
            title: "Sweetie",
            text: null,

            // Log in user form
            logInUsername: "",
            logInPassword: "",
        }
    }

    componentDidMount(){
        console.log("Survey mount state", this.state);
        this.promptLoader()
    }

    componentDidUpdate(){
        console.log("Survey mount state", this.state);
    }

    componentWillReceiveProps(props){
        console.log("refresh", props);
        this.setState({ user: props.user });
        if(props.user){
            this.setState({ signedIn: true });
        }
    }


    promptLoader = () => {

        this.props.authenticate()
        .then(() => {
            this.setState({ 
                loading: false
            });
        })
        .catch(err => {
            console.error("Authentication error", err);
            this.setState({ 
                loading: false
            });
        })
   
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    }

    handleFormSubmit = () => {
        this.setState({ loading: true });
        console.log("Submit survey", this.state.answers);
        let stateKeys = Object.entries(this.state);
        let content = [];
        let score = 0;
        stateKeys.forEach(entry => {
            if(entry[0].substring(0, 8) === "question"){
                content.push({[entry[0]]: entry[1]});
            } 
        });
        this.setState({ answers: content });
        content.forEach(obj => {
            score = score + parseInt(Object.values(obj)[0]);
        });
        console.log("Score",score)
        API.updateUser(this.state.user._id, {surveyAnswers: content, surveyScore: score}).then(res =>{
            console.log("Submit answers response", res);
        }).catch(err => {
            console.error("There was a error wit the answer update", err);
        })
        this.setState({ loading: false, redirect: true });
    }

    changeShow = () => {
        this.setState({ show: !this.state.show  });
        this.promptLoader()
    }

    signInModel = () => {
        let text = (
            <LogIn
                handleInputChange={this.props.changeAppState}
                logIn={this.props.logIn}
                shower={this.changeShow}
            />
        );
        // Update state to show model
        this.setState({
        title: "Sign into your account",
        text: text,
        show: true
        })
    }

    render() {

        if(this.state.loading){
            return (
                <div className="mx-auto">
                    <Loader loading={this.state.loading}/>
                </div>
            )
        }else{
            if(this.state.signedIn){
                if (!this.state.redirect) {
                    return (
                        <Container style={styles.container}>
                            
                            <Row>
                                <Col>
                                    <h3>Personality Test</h3>
                                    <h6>Fill out form and click submit to find other people just like you!</h6>
                                </Col>
                            </Row>
        
                            <Row className="rounded" style={styles.formRow}>
                                <Form className="mx-auto m-3 p-3">
                                    {this.state.surveyQuestions.length ? this.state.surveyQuestions.map((question, index) => {
                                        return(
                                            <SurveyQuestion
                                                question={question}
                                                key={index}
                                                num={index}
                                                handleInputChange={this.handleInputChange}
                                            />
                                        )
                                    }) : null}
        
                                    <Button color="info" onClick={this.handleFormSubmit}>Submit</Button>
                                </Form>
                            </Row>
                        </Container>
                    );
                }else{
                    return(
                        <TextCard
                            title="Thank you "
                            subtitle="Head home to see all matches or retake your test to get differant matches."
                        >
                            <a href="/" >
                                <Button color="info">
                                    Home
                                </Button>
                            </a>

                            <Button 
                                color="warning"
                                onClick={()=>this.setState({ redirect: false })}
                            >
                                Retake Test
                            </Button>
                        </TextCard>
                    )
                }
            }else{
                return(
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
                            title="You are not signed in"
                            subtitle="You must be signed in to save results and find like minded people"
                        >
                            
                            <Button 
                                color="primary"
                                onClick={()=> this.signInModel()}
                            >
                                Sign in
                            </Button>
            
                            <a href="/">
                                <Button color="info">
                                    Sign up
                                </Button>
                            </a>
                        </TextCard>
                    </div>
                )
            }
        }
    }
}

const styles = {
    container: {
        paddingTop: "20px"
    },
    formRow: {
        backgroundColor: "rgb(83, 81, 86, 80%)",
        color: "white"
    }

};

export default Survey;