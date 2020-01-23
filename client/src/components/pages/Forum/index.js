import React, { Component } from 'react';
import { Container, Row, Col, Button, FormGroup, Label, Input, } from 'reactstrap';
import SweetAlert from "react-bootstrap-sweetalert";
// DB call methods
import API from "../../../utils/API";
// Custom forms for chat interface
// Create and edit a board post
import BpForm from "../../parts/Models/BpForm";
import EditBp from "../../parts/Models/EditBp";
// Create and edit a comment on a board post
import BpCom_Form from "../../parts/Models/BpComForm";
import EditCom from "../../parts/Models/EditCom";
import TextCard from '../../parts/TextCard';

class Forum extends Component {

    constructor(props){
        super(props);

        this.state={

            // Signed in state passed down from App level
            user: this.props.user,

            boardPostPool: [],
            whichPost: "",
            commentPool: [],

            // Add post state
            addPostAuthor: "",
            addPostTitle: "",
            addPostBody: "",

            // Update post state
            editPostAuthor: "",
            editPostTitle: "",
            editPostBody: "",

            // Comment on post state
            commentPostAuthor: "",
            commentPostBody: "",

            // Update comment on post
            editCommentPostAuthor: "",
            editCommentPostBody: "",

            // Model attrs
            show: false,
            title: "Sweetie",
            text: null,
        }
    }

    // When page loads see inital state value
    componentDidMount(){
        console.log("Mount State: " , this.state);
    }

    // Every time state changes this function fires to give you a update all changes and thier values
    componentDidUpdate(){
        console.log("Updated State: ", this.state);
    }

    // General handler for inputs thats value is to change the state
    // If state does not exsist it makes a state field with its name
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    }

    // Function that handles adding a board post to the db
    makeBoardPost = async () => {
        console.log("Add board post state: ", this.state);
        let s = this.state;
        
        // Sends info of to util api call
        API.addBoardPost({
            _postAuthorId: s.user._id,
            postAuthor: s.user.username,
            postTitle: s.addPostTitle,
            postBody: s.addPostBody
        })
        .then(() => this.getBoardPosts())
        .catch(err => console.error("Add board bost had an error",err))
    };

    // Grabs all board posts in db and displays them on the DOM
    getBoardPosts= async () => {
        console.log("Get board posts: ", this.state);
        // When board posts are pulled from the db the are put into an array. That array when it contains info loops and makes cards for each post
        API.getBoardPosts().then(res => this.setState({ boardPostPool: res.data }))
        .catch(err => console.error("Get board posts hit an error", err))
    }

    // Function that handles the deleting of a single user from the db
    // This will be tied to a button that is tied to a specific user
    deleteBoardPost = id => {
        console.log("Delete function started");
        alert("You are deleting a board post from the db!");
        // Send request to util api call
        API.deleteBoardPost(id).then(() => this.getBoardPosts())
    }

    // Sweet alert model that contains form for editing a board post 
    editBP_Modal = boardPost => {
        // Set state to match so that unchanged values are not erased
        this.setState({ 
            editPostTitle : boardPost.postTitle,
            editPostBody : boardPost.postBody 
        });
        let text = (
            <div>
                <EditBp
                    boardPost={boardPost}
                    handleInputChange={this.handleInputChange}
                    handleUpdateFormSubmit={this.handleUpdateBP_Form}
                />
            </div>
        )
        // Update state to show model
        this.setState({
            title: `${boardPost.postAuthor} ${boardPost.postTitle}`,
            text: text,
            show: true
        })
    }

    // Sweet alert model that contains form for commenting on a post 
    commentModal = boardPostComment => {
        let text = (
            <div>
                <BpCom_Form 
                    handleInputChange={this.handleInputChange}
                    handleCommentFormSubmit={this.handleCommentFormSubmit}
                    boardPostComment={boardPostComment}
                />
            </div>
        )
        // Update state to show model
        this.setState({
            title: "Let them know how you feel. Im sure it matters to them.",
            text: text,
            show: true
        })
    }

    // When the update form on the model is submitted this function fires
    handleUpdateBP_Form = (id) => {
        // **Un-comment out to test values**)
        console.log("Id arg check: ",  id)
        console.log("postAuthor: " + this.state.editPostAuthor);
        console.log("postTitle: " + this.state.editPostTitle);
        console.log("postBody: " + this.state.editPostBody)

        // Send field info to db using utils api call
        API.updateBoardPost(id, {
            postAuthor: this.state.editPostAuthor,
            postTitle: this.state.editPostTitle,
            postBody: this.state.editPostBody,
            
        })
        // After form submits call function to get all users to see updated info
        .then(() => {
            this.getBoardPosts();
            this.setState({ show:false  });
        })
    }
    
    // Function that handles comments added to board post 
    handleCommentFormSubmit = (id) => {
        // **Un-comment out to test values**
        console.log("Id arg check: ",  id)
        console.log("Comment author: ", this.state.commentPostAuthor);
        console.log("Comment body: ", this.state.commentPostBody);

        // Send field info to
        API.addComment({
            _boardPostId: id,
            commentAuthor: this.state.commentPostAuthor,
            commentBody: this.state.commentPostBody
        })
        .then(() => {
            this.getThisPostComments(id);
            this.setState({ show: false });
        })
    }

    getThisPostComments = id => {
        // **Un-comment out to test values**
        console.log("Arg id: " + id);
        this.setState({ whichPost: id });

        API.getComments(id).then(res => {
            console.log("This posts comments tied to it: " , res.data);
            this.setState({ commentPool: res.data });
        }).catch(err => console.error("Get post comments hit an error", err));
    } 

    deleteComment = (comId, bpId) => {
        // **Un-comment out to test values**
        // console.log("Arg id: " + id);

        API.deleteComment(comId).then(() => this.getThisPostComments(bpId))
    }

    // Sweet alert model that contains form for PUT operations 
    editComModel = boardPostComment => {
        // Set state to match so that unchanged values are not erased
        this.setState({ 
            editCommentPostAuthor : boardPostComment.commentAuthor,
            editCommentPostBody : boardPostComment.commentTitle,
        });
        let text = (
            <div>
                <EditCom
                    handleInputChange={this.handleInputChange}
                    handleCommentEditFormSubmit={this.handleCommentEditFormSubmit}
                    boardPostComment={boardPostComment}
                />
            </div>
        )
        // Update state to show model
        this.setState({
            title: `Edit ${boardPostComment.commentAuthor}'s post`,
            text: text,
            show: true
        })
    }

    handleCommentEditFormSubmit = (comId, bpId) => {
        // **Un-comment out to test values**)
        console.log("comment Id: " + comId);
        console.log("boardPost Id: " + bpId);
        API.updateComment(comId, {
            commentAuthor: this.state.editCommentPostAuthor,
            commentBody: this.state.editCommentPostBody
        })
        .then(() => {
            // Get updated comments to be shown and close model
            this.getThisPostComments(bpId);
            this.setState({ show:false  });
        })
    };
 
    // Function to handle the closing of the list of comments
    closeComments = () => {
        this.setState({ 
            commentPool: [],
            whichPost: ""
        });
    };

    render() {
        return (
            <div style={styles.body}>
                <SweetAlert
                    show={this.state.show}
                    title={this.state.title}
                    onConfirm={() => this.setState({ show: false })}
                    style={{ minWidth: "35%" }}
                >
                    <div style={{ maxHeight: "50vh", minWidth: "35%", overflow: "auto" }}>
                        {this.state.text}
                    </div>
                </SweetAlert>

                <Row>
                    <Col className="mx-auto" sm="6">
                        <Row>
                            <Button color="success" onClick={() => this.getBoardPosts()}>
                                Get Board Posts
                            </Button>
                        </Row>

                        <BpForm 
                            handleInputChange={this.handleInputChange}
                            handleFormSubmit={this.makeBoardPost}
                        />
                    </Col>
                </Row>

                <Row style={{justifyContent: "space-between", padding: "10px", margin: "3%"}}>
                    {this.state.boardPostPool.length ? (this.state.boardPostPool.map(bp => {
                        return(
                            <TextCard
                                key={bp._id}
                                title={bp.postTitle}
                                subtitle={`Posted by: ${bp.postAuthor}`}
                            >
                                <p> {bp.postBody} </p>

                                <Button color="danger" onClick={()=> this.deleteBoardPost(bp._id)}>X</Button>
                                <Button color="warning" onClick={() => this.editBP_Modal(bp)}>Edit</Button>
                            </TextCard>
                        )
                    })) : null}
                </Row>
            
            </div>
        );

    }
}

let styles = {
    body: {
        marginTop: "4%"
    }
};

export default Forum;