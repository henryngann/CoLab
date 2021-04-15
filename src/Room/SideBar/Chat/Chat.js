import React, { useEffect, useState } from "react";
import { sckt } from '../../../Socket';
import ChatInput from './ChatInput/ChatInput';
import Messages from './Messages/Messages';
import { Box, Divider } from '@material-ui/core';


const Chat = ({ currUser, users }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const handler = (message) => setMessages(messages => [...messages, message]);
        sckt.socket.on('message', handler);
        return () => sckt.socket.off('message', handler);
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        let trimmedMessage = message.trim();
        if (trimmedMessage.length > 0) {
            sckt.socket.emit('sendMessage', trimmedMessage, () => setMessage(''));
        }
    }

    return (
        <Box height="100%" style={{maxHeight: "100%", overflowY: 'scroll'}} display="flex" flexDirection="column">
            <Messages messages={messages} currUser={currUser} users={users}/>
            <Divider/>
            <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </Box>
    );
}

export default Chat;