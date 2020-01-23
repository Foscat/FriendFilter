import React from 'react';
import { Row, Button, FormGroup, Label, Input, Form } from 'reactstrap';

const BP_Com_Form = (props) => {
    console.log(props.parentComment);
    return (
        <Row>
            <Form
                className="m-2"
                action="#" //This does not need a action since submit function handles info flow
                encType="text/plain"
                method="post"
                id="post_comment-form"
            >

                <FormGroup>
                    <Label for="commentPostAuthor">Comment author</Label>
                    <Input type="text" name="commentPostAuthor" onChange={props.handleInputChange}
                    id="commentPostAuthor" placeholder="Author"/>
                </FormGroup>


                <FormGroup>
                    <Label for="commentPostBody">Comment body</Label>
                    <Input type="textarea" name="commentPostBody" onChange={props.handleInputChange}
                    id="commentPostBody" placeholder="Body "/>
                </FormGroup>

                <Button color="success" onClick={() => props.handleCommentFormSubmit(props.boardPostComment, props.parentComment) }>
                    Submit
                </Button>

            </Form>
        </Row>
    );
};

export default BP_Com_Form;