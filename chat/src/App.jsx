import React, { useState } from 'react';
import './App.css';
import { socket } from './socket';

socket.on("connect", () => {
    console.log(socket.id);
});

socket.on("disconnect", () => {
    console.log(socket.id);
});

function App() {
    const [messages, setMessages] = useState([]);

    const onKeyDownAddMessage = (event) => {
        if (event.key === 'Enter') onClickAddMessage();
    };

    function onClickAddMessage() {
        let newMessage = document.querySelector('#new-message input').value;
        document.querySelector('#new-message input').value = "";
        if (newMessage.length === 0) {
            alert("Please enter a message.")
        } else {
            messages.push(newMessage);
            setMessages([...messages]);
        }
    }

    return (
        <div className="container">
            <div id="messages">
                {messages.map(message => (
                    <div className="message">
                        <span>
                           {message}
                        </span>
                    </div>
                ))}
            </div>
            <div id="new-message">
                <input type="text" placeholder="Post a message..." onKeyDown={onKeyDownAddMessage}/>
                <button onClick={onClickAddMessage}>Post</button>
            </div>
        </div>
    );
}

export default App;
