import React from 'react';
import { Button, FormGroup, Label, Input, } from 'reactstrap';

const EditCom = (props) => {
    return (
        <form
            className="m-2"
            action="#" //This does not need a action since submit function handles info flow
            encType="text/plain"
            method="put"
            id="edit_comment-form"
            >

            <FormGroup>
                <Label for="editCommentPostBody">Comment body</Label>
                <Input type="textarea" name="editCommentPostBody" onChange={props.handleInputChange}
                id="editCommentPostBody" rows="3" defaultValue={props.boardPostComment.commentBody} placeholder="Body "/>
            </FormGroup>

            <Button color="success" onClick={() => {
                props.handleCommentEditFormSubmit(props.boardPostComment._id , props.boardPostComment._boardPostId)
            }}>
                Submit
            </Button>

        </form>
    );
};

export default EditCom;