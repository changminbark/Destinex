import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function App() {
    const [stompClient, setStompClient] = useState(null);
    const [jobOffers, setJobOffers] = useState([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);
        const token = localStorage.getItem('jwtToken');
        const username = localStorage.getItem('username');

        client.connect({'Authorization': `Bearer ${token}`}, function(frame) {
            console.log('Connected: ' + frame);
            console.log('Current username: ' + username)
            setStompClient(client);
            setConnected(true);

            client.subscribe('/queue/job-offers', function(message) {
                console.log('Raw message received:', message);
                console.log('Raw message body:', message.body);

                setJobOffers(prev => {
                    const newOffer = JSON.parse(message.body);
                    console.log('Parsed job offer:', newOffer);
                    const newOffers = [...prev, newOffer];
                    console.log('Updated job offers:', newOffers);
                    return newOffers;
                });
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

    const respondToJobOffer = (jobId, response) => {
        if (stompClient && stompClient.connected) {
            stompClient.send("/app/respondToJob", {}, JSON.stringify({ jobId, response }));
        } else {
            console.log('Not connected');
        }
    };

    return (
        <div className="App">
            <h2>WebSocket Tester</h2>
            <div>
                <h3>Job Offers:</h3>
                {jobOffers.map((offer, index) => (
                    <div key={index}>
                        <div>{offer.description} - ${offer.price}</div>
                        <button onClick={() => respondToJobOffer(offer.jobId, 'ACCEPT')}>Accept</button>
                        <button onClick={() => respondToJobOffer(offer.jobId, 'REJECT')}>Reject</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
