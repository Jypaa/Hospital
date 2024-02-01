import express, { Request, Response } from 'express';

import patients from '../data/patients';
import diagnoses from '../data/diagnoses';
import users from '../data/user';
import { v4 as uuidv4 } from 'uuid';
import patientService from '../services/patientServices';
import { Patient } from '../types';

uuidv4();

export const hospitalRouter = express.Router();

hospitalRouter.use(express.json());

  hospitalRouter.get('/diagnoses', (_req: Request, res: Response,) => {
    const withoutLatin = diagnoses.map(diagnoses => ({ code: diagnoses.code, name: diagnoses.name }));
    res.send(withoutLatin);
  })
  
  hospitalRouter.get('/patients', (_req: Request, res: Response,) => {
    res.send(patientService.getNonSensitiveEntries());
  
  })
  
  hospitalRouter.get('/patients/:id', (req: Request, res: Response,) => {

    //const patients = patientService.getNonSensitiveEntries();
    const patient = patientService.getpatient(req.params.id);

    if(!patient) {
      res.status(404).send('Patient not found');
      return;
    }

    res.send(patient);
  
  } 
  )
  
  hospitalRouter.post('/patients/:id/entries', (req: Request, res: Response,) => {
    //const patient = patients.find((patient) => patient.id === req.params.id);
    const patient = patientService.getpatient(req.params.id);
    if (!patient) {
      res.status(404).send('Patient not found');
      return;
    }
    const newEntry = {
      id: uuidv4(),
      ...req.body,
    };
    if(newEntry.type === 'HealthCheck') {
      if(!newEntry.type || !newEntry.date || !newEntry.specialist) {
        res.status(400).send('Missing parameters');
        return;
      }
      if(newEntry.healthCheckRating < 0 || newEntry.healthCheckRating > 3) {
        res.status(400).send('Invalid health check rating (0-3)');
        return;
      }
    }
    if(newEntry.type === 'OccupationalHealthcare') {
      if(!newEntry.type || !newEntry.date || !newEntry.specialist || !newEntry.employerName) {
        res.status(400).send('Missing parameters');
        return;
      }
    }
    if(newEntry.type === 'Hospital') {
      if(!newEntry.type || !newEntry.date || !newEntry.specialist || !newEntry.discharge.date || !newEntry.discharge.criteria) {
        res.status(400).send('Missing parameters');
        return;
      }
      
    }
    patientService.addEntry(newEntry, patient);
    res.send(newEntry);
  });
  
  hospitalRouter.post('/patients', (req: Request, res: Response,) => {
    const newPatient: Patient = {
      id: uuidv4(),
      ...req.body,
      entries: []
    }

    patientService.addPatient(newPatient);
    //patients.push(newPatient);
    const {ssn, ...rest} = newPatient;
    res.send(rest);
  })
  


