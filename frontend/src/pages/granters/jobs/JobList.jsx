import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function App() {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        // Connect to WebSocket
        const token = localStorage.getItem('jwtToken')
        const socket = new SockJS(`http://localhost:8080/ws`);
        const client = Stomp.over(socket);

        console.log(token);

        client.connect({'Authorization': `Bearer ${token}`}, function(frame) {
            console.log('Connected: ' + frame);
            setStompClient(client);
            setConnected(true);

            client.subscribe('/topic/jobOffers', function(message) {
                setMessages(prev => [...prev, message.body]);
            });
        }, function(error) {
            console.log('Connection error: ' + error);
            setConnected(false);
        });

        return () => {
            if (client && client.connected) {
                client.disconnect(() => {
                    console.log('Disconnected');
                });
            }
        };
    }, []);

    const sendMessage = () => {
        if (stompClient && stompClient.connected) {
            stompClient.send("/app/dispatchJobs", {}, JSON.stringify({ jobId: '123' }));
        } else {
            console.log('Not connected');
        }
    };

    return (
        <div className="App">
            <h2>WebSocket Tester</h2>
            <button onClick={sendMessage} disabled={!connected}>Send Message</button>
            <div>
                <h3>Messages:</h3>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
        </div>
    );
}

export default App;
