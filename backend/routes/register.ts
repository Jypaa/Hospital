const jwt = require('jsonwebtoken')

import express, { Request, Response } from 'express';
import {Patient, RegisterFormValues, Role} from '../types';
import users from '../data(unused)/user';
import bcrypt from 'bcrypt';
import 'dotenv/config'
import { v4 as uuidv4 } from 'uuid';
import patients from '../data(unused)/patients';
import patientServices from '../services/patientServices';
import registerService from '../services/userServices';

export const registerRouter = express.Router();
registerRouter.use(express.json());



registerRouter.post('/register', async (req: Request, res: Response) => {
    let id ='';

    const { username, password, ssn ,name} = req.body;
    const role = Role.Patient;

    try {

        const userssn: RegisterFormValues | undefined = users.find(u => u.ssn === ssn );

        if (userssn) {

            return res.status(401).json({ message: 'user with same ssn already exist' });
        }
        
        const user: RegisterFormValues | undefined = users.find(u => u.username === username );

        if (user) {

            return res.status(401).json({ message: 'user with same username already exist' });
        }
        if (!patients.find(p => p.ssn === ssn)) {
            const newPatient: Patient = {
                id: uuidv4(),
                name: req.body.name,
                ssn: req.body.ssn,
                occupation: req.body.occupation,
                gender: req.body.gender,
                dateOfBirth: req.body.dateOfBirth,
                entries: []
            }
            await patientServices.addPatient(newPatient);
            id = newPatient.id;
        }

        const saltRounds = 10;
        const passwordhash = await bcrypt.hash(password, saltRounds);


        const newUser: RegisterFormValues = {
            id: id,
            name,
            ssn,
            username,
            role: role,
            passwordhash,
        }
        
        users.push(newUser);
        registerService.registerUser(newUser);

        const token = jwt.sign({ userId: newUser.id, username: newUser.username }, process.env.SECRET, { expiresIn: 60*60 });
        return res.json({ token, role: newUser.role, id: newUser.id});
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });