const jwt = require('jsonwebtoken')
import express, { Request, Response } from 'express';
import { UserDocument } from '../types';
import users from '../data/user';
import bcrypt from 'bcrypt';
import 'dotenv/config'

export const loginRouter = express.Router();
loginRouter.use(express.json());

loginRouter.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    try {

        const user: UserDocument | undefined = users.find(u => u.username === username );

        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }
        
        const passwordCorrect = password === null ? false : await bcrypt.compare(password, user.passwordhash);

        if (!passwordCorrect) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user.id, username: user.username }, process.env.SECRET, { expiresIn: 60*60 });

        return res.json({ token, role: user.role, id: user.id});
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });

loginRouter.get('/healtz', (_req: Request, res: Response,) => {
    console.log('Healtz check');
    res.send('working');
  });