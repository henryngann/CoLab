import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';
import { List, ListItem} from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

// import './Messages.scss';

const Messages = ({ messages, currUser, users }) => {
    const useStyles = makeStyles(theme => ({
        messages: { 
            flexDirection: "column",
            display: "flex",
            flex: 1,
            '& > :first-child': {
                marginTop: 'auto',
            }
        },
    }));
    const classes = useStyles();
    return (
        <List className={classes.messages}>
            {
                messages.map((message, i) =>
                    <ListItem key={i} >
                        <Message message={message} currUser={currUser} users={users} />
                    </ListItem>
                )
            }
        </List>
    )
};

export default Messages;