import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function WishTracking() {
    const [stompClient, setStompClient] = useState(null);
    const [wishStatus, setWishStatus] = useState([]);
    const [connected, setConnected] = useState(false);
    const token = localStorage.getItem('jwtToken');
    const providerEmail = localStorage.getItem('username');

    useEffect(() => {
        if (!token || !providerEmail) {
            console.log("Token or provider email not found!");
            return;
        }

        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({'Authorization': `Bearer ${token}`}, function(frame) {
            console.log('Connected: ' + frame);
            setStompClient(client);
            setConnected(true);

            const subscriptionUrl = `/user/${providerEmail}/user/job-status`;
            client.subscribe(subscriptionUrl, function(message) {
                console.log('Job status received:', message.body); // Log when a message is received
                setWishStatus([JSON.parse(message.body)]);
            });

            console.log('Subscribed to:', subscriptionUrl); // Log the subscription
        }, function(error) {
            console.log('Connection error: ' + error);
            setConnected(false);
        });

        return () => {
            console.log('Component will unmount'); // Log when component unmounts
            if (client && client.connected) {
                client.disconnect(() => console.log('Disconnected'));
            }
        };
    }, []);

    return (
        <div className="App">
            <h2>Wish Tracking</h2>
            <div>
                {wishStatus.map((wish, index) => (
                    <div key={index}>
                        <h3>Tracking for wish: {}</h3>
                        <div>Your granter: {}</div>
                        <div>Your wish status: {}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WishTracking;
