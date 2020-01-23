import React from 'react';
import TextCard from "../TextCard";
import { Row, Button ,Form, FormGroup, Label, Input} from 'reactstrap';


// Basic signup component that holds its specific form inside it
// Gives simple interface for adding users to db
// Rinse and repeat for new tables in db.

const BP_Form = (props) => {
    
    return(

        <Row>

            <TextCard 
                title="Make a board post"
                subtitle='Share your "valuable opinion" with the world'
                style={{backgroundColor: "rgb(193, 152, 154)"}}
            >
                <Form>
                    <FormGroup>
                        <Label for="addPostAuthor">Post Author</Label>
                        <Input type="text" name="addPostAuthor" onChange={props.handleInputChange}
                        id="addPostAuthor" placeholder="Post Author"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="addPostTitle">Post Title</Label>
                        <Input type="text" name="addPostTitle" onChange={props.handleInputChange}
                        id="addPostTitle" placeholder="Post Title"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="addPostBody">Post Body</Label>
                        <Input type="textarea" name="addPostBody" onChange={props.handleInputChange}
                        id="addPostBody" placeholder="Post Body"/>
                    </FormGroup>

                    <Button color="success" onClick={props.handleFormSubmit}>Submit</Button>
                </Form>
            </TextCard>

        </Row>

    )
}

export default BP_Form;