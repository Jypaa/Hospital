
import Patients from "../data/patients";
import {Entry, NonSensitivePatient, Patient } from "../types";


const patients: Patient[] = Patients.map(patient => ({ ...patient  }));
console.log("patientsService",patients);

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
    return patients.find(p => p.id === id);
}

const addPatient = (patient: Patient) => {
    patients.push(patient);
}
const addEntry = (entry: Entry, patient: Patient) => {
    if (patient && patient.entries) {
        patient.entries.push(entry);
      } else {
        throw new Error('Patient not found');
      }

    
}

export default {
    getNonSensitiveEntries,addPatient,getpatient,addEntry
};

