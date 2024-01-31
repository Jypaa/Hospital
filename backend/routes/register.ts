const jwt = require('jsonwebtoken')
import express, { Request, Response } from 'express';
import { RegisterFormValues, Role, UserDocument } from '../types';
import users from '../data/user';
import bcrypt from 'bcrypt';
import 'dotenv/config'
import { v4 as uuidv4 } from 'uuid';
import patients from '../data/patients';

export const registerRouter = express.Router();
registerRouter.use(express.json());


registerRouter.post('/register', async (req: Request, res: Response) => {
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
        if(!patients.find(p => p.ssn === ssn)){
                const newPatient = {
                    id: uuidv4(),
                    ...req.body,
                    entries: []
                  }
                  patients.push(newPatient);
        }

        
        const saltRounds = 10;
        const passwordhash = await bcrypt.hash(password, saltRounds);

        const id = await patients.find(p => p.ssn === ssn)?.id;

        const newUser: RegisterFormValues = {
            id: id || uuidv4(),
            name,
            ssn,
            username,
            role,
            passwordhash,
        }

        users.push(newUser);
        const token = jwt.sign({ userId: newUser.id, username: newUser.username }, process.env.SECRET, { expiresIn: 60*60 });
        return res.json({ token, role: newUser.role, id: newUser.id});
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });