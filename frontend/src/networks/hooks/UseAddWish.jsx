import * as addWishService from "../api/AddWishService"

export const addJob = async(category, receiverName, receiverPhone, receiverEmail, receiverAddress, description) => {
    const jobData = {
        "category": category,
        "receiverName": receiverName,
        "receiverPhone": receiverPhone,
        "receiverEmail": receiverEmail,
        "receiverAddress": receiverAddress,
        "description": description
    };


    try {
        const response = await addWishService.addJob(jobData);
        // Never reaches this line
        console.log(response.data);
        return true;
    } catch (error) {
        console.error(error);
    }
}
