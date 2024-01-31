
import Patients from "../data/patients";
import { NonSensitivePatient, Patient } from "../types";


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
const addEntry = (entry: Patient) => {
    patients.push(entry);
}

export default {
    getNonSensitiveEntries,addPatient,getpatient,addEntry
};

