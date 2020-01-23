import React from 'react';
import { Row, Button, FormGroup, Label, Input, } from 'reactstrap';

const EditCom = (props) => {
    return (
        <Row>
            <form
                className="m-2"
                action="#" //This does not need a action since submit function handles info flow
                encType="text/plain"
                method="put"
                id="edit_comment-form"
                >

                <FormGroup>
                    <Label for="editCommentPostAuthor">Comment author</Label>
                    <Input type="text" name="editCommentPostAuthor" onChange={props.handleInputChange}
                    id="editCommentPostAuthor" defaultValue={props.boardPostComment.commentAuthor} placeholder="Author"/>
                </FormGroup>


                <FormGroup>
                    <Label for="editCommentPostBody">Comment body</Label>
                    <Input type="textarea" name="editCommentPostBody" onChange={props.handleInputChange}
                    id="editCommentPostBody" defaultValue={props.boardPostComment.commentBody} placeholder="Body "/>
                </FormGroup>

                <Button color="success" onClick={() => {
                    props.handleCommentEditFormSubmit(props.boardPostComment._id , props.boardPostComment._boardPostId)
                }}>
                    Submit
                </Button>

            </form>
        </Row>
    );
};

export default EditCom;