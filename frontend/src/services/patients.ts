import axios from "axios";
import { EntryFormValues, Patient, PatientFormValues, Entry } from "../types";

import { apiBaseUrl } from "../constants";

const config = {
  headers: { Authorization: 'bearer ' + window.localStorage.getItem('token') },
}

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`, config
  );

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`, config
  );

  return data;
}

const getDiagnoses = async () => {
  const { data } = await axios.get(
    `${apiBaseUrl}/diagnoses`, config
  );

  return data;
}

const create = async (object: PatientFormValues) => {

  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,object, config
  );

  return data;
};

const addEntry = async (object: EntryFormValues, id: string) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object,
    config
    
    
  );

  return data;
}

const login = async (credentials: { username: string, password: string }) => {
  //console.log(credentials);
  try{
  const { data } = await axios.post<{}>(
    `${apiBaseUrl}/login`,
    credentials
  );
  return data;
  } catch (error) {
    console.error(error);
  }
}

const register = async (credentials: { 
  username: string, 
  password: string, 
  name: string, 
  ssn: string ,
  gender: string,
  occupation: string,
  dateOfBirth: string  
}) => {
  //console.log(credentials)
  try{
  const { data } = await axios.post<{}>(
    `${apiBaseUrl}/register`,
    credentials
  );
  return data;
  } catch (error) {
    console.error(error);
  }
}


export default {
  getAll, create, getOne, getDiagnoses, addEntry, login, register
};

