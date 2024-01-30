
import mongoose, {  Schema } from 'mongoose';
type NonSensitiveHospitalEntry = Omit<HospitalEntry, 'ssn'>;
type NonSensitiveOccupationalHealthcareEntry = Omit<OcuupationalHealthcareEntry, 'ssn'>;
type NonSensitiveHealthCheckEntry = Omit<HealthCheckEntry, 'ssn'>;


export interface User {
    id: string;
    name: string;
    username: string;
    role: Role;
    passwordhash: string;
  }

  export enum Role {
    Patient = 'patient',
    Doctor = 'doctor',
    Admin = 'admin',

  }
  
export interface UserDocument extends User {}
  
  const userSchema = new Schema<UserDocument>({
    id: String,
    name: String,
    username: String,
    passwordhash: String,
  });
  
export const UserModel = mongoose.model<UserDocument>('User', userSchema);

export type Entry =
    | NonSensitiveHospitalEntry
    | NonSensitiveOccupationalHealthcareEntry
    | NonSensitiveHealthCheckEntry;


export enum Gender  {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}


export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: string;
    dateOfBirth: string;
    entries?: Entry[];
}

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
  }
  
  interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export type OcuupationalHealthcareEntry = BaseEntry & {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
};

export type HospitalEntry = BaseEntry & {
    type: "Hospital";
    discharge: {
        date: string;
        criteria: string;
    };
};

export type NonSensitivePatient = Omit<Patient, 'ssn'> & { entries?: Entry[] };