import axios from 'axios';
import Patients from "../data(unused)/patients";
require('dotenv').config();
import {Entry, NonSensitivePatient, Patient } from "../types";
console.log(process.env.BASE_URL);
const baseURL = process.env.BASE_URL_PATIENT || 'undefined';
let patients: Patient[] = []

function getPatients() {
    axios.get(baseURL)
    .then(response => {
        console.log('updated patients')
        patients = response.data;
    })
    .catch(error => {
        console.error('Error fetching patients:', error);
    });
}
getPatients();

if(process.env.NODE_ENV !== 'test'){
    setInterval(getPatients, 10000);
}


const getNonSensitiveEntries = (): NonSensitivePatient[] => {
    return patients.map(({id,name,ssn,occupation,gender,dateOfBirth,entries}) => ({
        id,
        name,
        ssn,
        occupation,
        gender,
        dateOfBirth,
        entries
        }));
}

const getpatient = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
}

const addPatient = (patient: Patient) => {
    axios.post(baseURL, patient)
    patients.push(patient);
}

const addEntry = (entry: Entry, patient: Patient) => {
    if (patient && patient.entries) {
        const patientId = patient.id;
        axios.get(`${baseURL}/${patientId}`)
            .then(response => {
            const patient = response.data;

        patient.entries.push(entry);
        
        axios.put(`${baseURL}/${patientId}`, patient)
        .catch(error => {
            console.error('Error adding entry:', error);
            });
        })
        .catch(error => {
        console.error('Error fetching patient data:', error);
        });
        const foundPatient = patients.find(p => p.id === patientId);
        if (foundPatient) {
            foundPatient.entries ??= [];
            foundPatient.entries.push(entry);
        }
      } else {
        throw new Error('Patient not found');
      }
}

export default {
    getNonSensitiveEntries,addPatient,getpatient,addEntry
};

