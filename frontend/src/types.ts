export type Entry =
    | HospitalEntry
    | OcuupationalHealthcareEntry
    | HealthCheckEntry;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  [x: string]: any;
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
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

export interface User {
  username: string;
  password: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OcuupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
      startDate: string;
      endDate: string;
  };
};

interface HospitalEntry extends BaseEntry  {
  type: "Hospital";
  discharge: {
      date: string;
      criteria: string;
  };
};

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type LogInFormValues = Omit<User, "id">;

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type EntryFormValues = UnionOmit<Entry, "id">;