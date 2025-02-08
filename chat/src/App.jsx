import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://10.0.0.67:3001');

export default function App() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('receive-message', (msg) => {
            setMessages([...messages, msg.username + " says " + msg.message]);
        });

        return () => {
            socket.off('receive-message');
        };
    }, [messages]);

    const onKeyDownAddMessage = (event) => {
        if (event.key === 'Enter') onClickAddMessage(event);
    };

    function onClickAddMessage(event) {
        event.preventDefault();
        let newMessage = document.querySelector('#new-message input').value;
        if (newMessage.length === 0) {
            alert("Please enter a message.");
            return false;
        } else {
            socket.emit('send-message', newMessage);
            document.querySelector('#new-message input').value = "";
            return true;
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
                <input type="text" placeholder="Post a message..." onKeyDown={(e) => onKeyDownAddMessage(e)}/>
                <button onClick={(e) => onClickAddMessage(e)}>Post</button>
            </div>
        </div>
    );
}