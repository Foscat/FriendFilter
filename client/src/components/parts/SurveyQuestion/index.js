import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';


const SurveyQuestion = props => {
    return(
        <FormGroup>
            <Label>{props.question}</Label>
            <Input type="select" name={`question${props.num}`} onChange={props.handleInputChange} >
                <option style={styles.muted} value={0}> Do you?</option>
                <option value={1}>Strongly Agree</option>
                <option value={2}>Slightly Agree</option>
                <option value={3}>Indifferant</option>
                <option value={4}>Slightly Disagree</option>
                <option value={5}>Strongly Disagree</option>
            </Input>
      </FormGroup>
    );
};

const styles = {
    muted: {
        color: "#eee"
    }
};

export default SurveyQuestion;