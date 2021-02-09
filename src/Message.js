import React from 'react'
import { Card, CardContent, Typography} from "@material-ui/core"

import './styles/message.css';

//each messages are wrapped in this message component
const Message = ({username, message }) => {
    
    const isUser = username === message.username; //Checking if the message owner and the current user is the same
    return (
        <div className={`message ${isUser && 'message__user'}`}>
        {/** if the message owner is same as current user then applly different style :: make the messages right aligned 
        and background to blue */}
        <Card className={isUser ? 'message__userCard' : 'message_guestCard'}> 
            <CardContent>
                <Typography
                    color="white"
                    variant="h5"
                    component="h2">
                    {/** if the message user is unknown then placing unknown user as a message owner name */}
                    {!isUser && `${message.username ||'Unknown user'}: `} {message.message}
                </Typography>
            </CardContent>
        </Card>
        </div>
    )
};

export default Message;
