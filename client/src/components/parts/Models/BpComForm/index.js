import React from 'react';
import { Button, FormGroup, Label, Input, Form } from 'reactstrap';

const BpComForm = (props) => {
    console.log(props.parentComment);
    return (

        <Form
            className="m-2"
            action="#" //This does not need a action since submit function handles info flow
            encType="text/plain"
            method="post"
            id="post_comment-form"
            
        >

            <FormGroup>
                <Label for="commentPostBody">Comment body</Label>
                <Input type="textarea"  rows="3" name="commentPostBody" onChange={props.handleInputChange}
                id="commentPostBody" placeholder="Body" />
            </FormGroup>

            <Button color="success" onClick={() => props.handleCommentFormSubmit(props.boardPostComment, props.parentComment) }>
                Submit
            </Button>

        </Form>
    );
};

export default BpComForm;