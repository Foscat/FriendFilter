import React from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardSubtitle } from 'reactstrap';

// General use card for wrapping around other components and give clean presentaiton
// Takes is style props to give ease of css 

const TextCard = (props) => {
    return(
        <Card className={props.className} style={{borderRadius: "10px", ...props.style}}>
        
            <CardHeader>

                <CardTitle>
                    <h3>{props.title}</h3>
                </CardTitle>

                <CardSubtitle>
                    <h5>{props.subtitle}</h5>
                </CardSubtitle>

            </CardHeader>

            <CardBody>

                <div style={props.contentStyle}>
                    {props.children}
                </div>
    
            </CardBody>

        </Card>
    )
}

export default TextCard;