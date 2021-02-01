import React, { forwardRef } from 'react'
import { Card, CardContent, Typography} from "@material-ui/core"
import './styles/message.css';


const Message = forwardRef(({username, message }, ref) => {
    console.log(username);
    console.log(message);
    const isUser = username === message.username;
    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
        <Card className={isUser ? 'message__userCard' : 'message_guestCard'}>
            <CardContent>
                <Typography
                    color="white"
                    variant="h5"
                    component="h2">
                    {!isUser && `${message.username ||'Unknown user'}: `} {message.message}
                    </Typography>
            </CardContent>
        </Card>
        </div>
    )
});

export default Message;
