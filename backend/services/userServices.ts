import axios from "axios";
import { RegisterFormValues } from "../types";
require('dotenv').config();


const baseURL = process.env.BASE_URL_USERS || 'undefined';


const registerUser = async (newUser:RegisterFormValues) => {
    console.log("Onko oikein",newUser);
    console.log("Onko oikein",baseURL);
    await axios.post(baseURL, newUser);

}

export default {registerUser};