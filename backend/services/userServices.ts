import axios from "axios";
import { RegisterFormValues } from "../types";
require('dotenv').config();


const baseURL = process.env.BASE_URL_USERS || 'undefined';


const registerUser = async (newUser:RegisterFormValues) => {
    await axios.post(baseURL, newUser);
}

export default {registerUser};