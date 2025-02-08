import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { Events } from "./components/Events";
import { MyForm } from './components/MyForm';

export default function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(value) {
            setFooEvents(previous => [...previous, value]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, []);

    return (
        <div className="App">
            <ConnectionState isConnected={ isConnected } />
            <Events events={ fooEvents } />
            <ConnectionManager />
            <MyForm />
        </div>
    );
}
// import React, { useState } from 'react';
// import './App.css';
// import { socket } from './socket';
//
// socket.on("connect", () => {
//     console.log(socket.id);
// });
//
// socket.on("disconnect", () => {
//     console.log(socket.id);
// });
//
// function App() {
//     const [messages, setMessages] = useState([]);
//
//     const onKeyDownAddMessage = (event) => {
//         if (event.key === 'Enter') onClickAddMessage();
//     };
//
//     function onClickAddMessage() {
//         let newMessage = document.querySelector('#new-message input').value;
//         document.querySelector('#new-message input').value = "";
//         if (newMessage.length === 0) {
//             alert("Please enter a message.")
//         } else {
//             messages.push(newMessage);
//             setMessages([...messages]);
//         }
//     }
//
//     return (
//         <div className="container">
//             <div id="messages">
//                 {messages.map(message => (
//                     <div className="message">
//                         <span>
//                            {message}
//                         </span>
//                     </div>
//                 ))}
//             </div>
//             <div id="new-message">
//                 <input type="text" placeholder="Post a message..." onKeyDown={onKeyDownAddMessage}/>
//                 <button onClick={onClickAddMessage}>Post</button>
//             </div>
//         </div>
//     );
// }
//
// export default App;
