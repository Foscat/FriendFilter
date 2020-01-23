import React from 'react';
import { Row, Button, FormGroup, Label, Input, } from 'reactstrap';

const EditBp = (props) => {
    return (
        <Row>
            <form
                className="m-2"
                action="#" //This does not need a action since submit function handles info flow
                encType="text/plain"
                method="put"
                id="editBoardPostModel"
            >

                <FormGroup>
                    <Label for="editPostTitle">Edit post title</Label>
                    <Input type="text" name="editPostTitle" onChange={props.handleInputChange}
                    id="editPostTitle" defaultValue={props.boardPost.postTitle} placeholder="Edit title"/>
                </FormGroup>

                <FormGroup>
                    <Label for="editPostBody">Edit post body</Label>
                    <Input type="textarea" name="editPostBody" onChange={props.handleInputChange}
                    id="editPostBody" defaultValue={props.boardPost.postBody} placeholder="Edit body "/>
                </FormGroup>

                <Button color="success" onClick={() => props.handleUpdateFormSubmit(props.boardPost._id) }>Submit</Button>

            </form>
        </Row>
    )
};

export default EditBp;