import { Request, Response, NextFunction } from 'express';
import 'dotenv/config'

const logger = require('./logger')
const jwt = require('jsonwebtoken')

interface CustomRequest extends Request {
    token?: string;
}
interface CustomRequest extends Request {
        user?: string;
}

export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  logger.info('Method:', req.method)
  logger.info('Headers:', req.headers)
  logger.info('Path:  ', req.path)
  logger.info('Body:  ', req.body)
  logger.info('---')
  next()
}

export const unknownEndpoint = (_req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({ error: 'unknown endpoint' })
  next()
}

export const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
    logger.error(error.message)
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }
    else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'invalid token' })
    }
    next(error)
    return res.status(500).json({ error: 'internal server error' })
}

export const userExtractor = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try{
        if(req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, process.env.SECRET,)
            if (!token || !decodedToken.userId) {
                return res.status(401).json({ error: 'token invalid' })
            }
        
            const user = decodedToken.id
            req.user = user
            next()
        }
        else{
            return res.status(401).json({ error: 'token missing' })
        }
    }
    catch(error){
        next(error)
    }
}

export const tokenExtractor = (req: CustomRequest, _res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        req.token = token;
        next();
    } else {
        next();
    }
};

