import * as addWishService from "../api/AddWishService"
import {useState} from "react";
import axios from "axios";

export const addJob = async(category, receiverName, receiverPhone, receiverEmail, receiverAddress, description) => {
    const jobData = {
        "userId": "userPostJob01",
        "receiverAddressPoint": {
            "type": "Point",
            "coordinates": [
                -75.340,
                39.984
            ]
        },
        "description": "Job posting test 1"
    };

    const token = localStorage.getItem('jwtToken');

    try {
        const response = await axios.post("http://localhost:8080/api/jobs", jobData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data);
        return true;
    } catch (error) {
        console.error(error);
    }
}
