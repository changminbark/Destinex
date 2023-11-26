import * as addWishService from "../api/AddWishService"

export const addJob = async(category, receiverName, receiverPhone, receiverEmail, receiverAddress, description) => {



    try {
        const jobData = {
            "category": category,
            "receiverName": receiverName,
            "receiverPhone": receiverPhone,
            "receiverEmail": receiverEmail,
            "receiverAddress": receiverAddress,
            "description": description,
            "receiverAddressPoint": {
                "type" : "Point",
                "coordinates" : [-75.34, 39.984]
            }
        };
        const response = await addWishService.addJob(jobData);
        // Never reaches this line
        console.log(response.data);
        return true;
    } catch (error) {
        console.error(error);
    }
}
