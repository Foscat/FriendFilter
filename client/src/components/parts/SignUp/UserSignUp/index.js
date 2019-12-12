import React from 'react';
import TextCard from "../../TextCard";
import UserSignUpForm from './UserSignUpForm';

// Basic signup component that holds its specific form inside it
// Gives simple interface for adding users to db
// Rinse and repeat for new tables in db.

const UserSignUp = (props) => {
    
    return(
        <div className={props.className} >
            <TextCard 
                title="Sign Up Card"
                subtitle="Fill out info and sign up"
                style={{backgroundColor:"#fff"}}
            >
                <UserSignUpForm 
                    handleInputChange={props.handleInputChange}
                    handleFormSubmit={props.handleFormSubmit}
                />
            </TextCard>

        </div>
    )
}

export default UserSignUp;