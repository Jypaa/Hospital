import express, { Request, Response } from 'express';

import patients from '../data/patients';
import diagnoses from '../data/diagnoses';
import { v4 as uuidv4 } from 'uuid';
import patientService from '../services/patientServices';

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
  
  hospitalRouter.get('/api/patients/:id', (req: Request, res: Response,) => {
    const  patients = patientService.getNonSensitiveEntries();
    const patient = patients.find(patient => patient.id === req.params.id);
    res.send(patient);
  
  } 
  )
  
  hospitalRouter.post('/patients/:id/entries', (req: Request, res: Response,) => {
    console.log(req.body);
    const patient = patients.find((patient) => patient.id === req.params.id);
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
  
    (patient.entries as any[]).push(newEntry);
    res.send(newEntry);
  });
  
  hospitalRouter.post('/patients', (req: Request, res: Response,) => {
    const newPatient = {
      id: uuidv4(),
      ...req.body
    }
    patients.push(newPatient);
    const {ssn, ...rest} = req.body;
    res.send(rest);
  })
  


