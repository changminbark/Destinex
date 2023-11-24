import * as addWishService from "../api/AddWishService"
import {useState} from "react";

export const addJob = async() => {
    try {
        // NEED TO MODIFY THIS WHEN HUNG IS DONE
        const response = await addWishService.addJob({})
        if (response.data) {
            return true;
        } else {
            return false;
        }
    } catch(err) {
        console.log(err.message)
        return false;
    }
}