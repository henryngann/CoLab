import React from 'react';
import { Icon, Input } from 'semantic-ui-react';
import { TextField} from '@material-ui/core';

// import './ChatInput.scss';

const ChatInput = React.memo(({ message, setMessage, sendMessage }) => {

    const handleInputChange = event => {
        let msg = event.target.value;
        setMessage(msg);
    }

    const handleInputSend = (event) => {
        sendMessage(event);
    }

    return (
        <React.Fragment>
            <TextField
                fullWidth
                placeholder="Type a message here..."
                value={message}
                onChange={e => handleInputChange(e)}
                onKeyPress={e => e.key === 'Enter' ? handleInputSend(e) : null}
            ></TextField>
        </React.Fragment>
    )
});

export default ChatInput;