import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function App() {
    const [stompClient, setStompClient] = useState(null);
    const [jobOffers, setJobOffers] = useState([]);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        const providerEmail = localStorage.getItem('username');

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

            const subscriptionUrl = `/user/${providerEmail}/queue/job-offers`;
            client.subscribe(subscriptionUrl, function(message) {
                console.log('Job offer received:', message.body);
                setJobOffers(prev => [...prev, JSON.parse(message.body)]);
            });
        }, function(error) {
            console.log('Connection error: ' + error);
            setConnected(false);
        });

        return () => {
            if (client && client.connected) {
                client.disconnect(() => console.log('Disconnected'));
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
