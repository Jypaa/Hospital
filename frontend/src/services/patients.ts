import axios from "axios";
import { EntryFormValues, Patient, PatientFormValues, Entry } from "../types";

import { apiBaseUrl } from "../constants";



const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`,
    {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`
      }
    }
  );

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`,
    {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`
      }
    }
  );

  return data;
}

const getDiagnoses = async () => {
  const { data } = await axios.get(
    `${apiBaseUrl}/diagnoses`,
    {
      headers: {
        Authorization: `bearer ${localStorage.getItem('token')}`
      }
    }
  );

  return data;
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (object: EntryFormValues, id: string) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );

  return data;
}

const login = async (credentials: { username: string, password: string }) => {
  console.log(credentials);
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

export default {
  getAll, create, getOne, getDiagnoses, addEntry, login
};

