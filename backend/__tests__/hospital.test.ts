import request from 'supertest';

import app from '../app';
import e from 'express';


let token: any; 

beforeAll(async () => {
    const response = await request(app).post('/api/login').send({ username: 'admin', password: '1234' });
    token = response.body.token; 
});

test('add 1+2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});

test('Get fiagnoses', async () => {
    const response = await request(app)
        .get('/api/diagnoses')
        .set('Authorization', `Bearer ${token}`) 
        .send();

    expect(response.status).toBe(200);
});

test('Get patients', async () => {
    const response = await request(app)
        .get('/api/patients')
        .set('Authorization', `Bearer ${token}`) 
        .send();

    expect(response.status).toBe(200);
});

test('Get patients', async () => {
    const response = await request(app)
        .get('/api/patients')
        .send();

    expect(response.status).toBe(401);
});

test('get specific patient', async () => {
    const response = await request(app)
        .get('/api/patients/d2773336-f723-11e9-8f0b-362b9e155667')
        .set('Authorization', `Bearer ${token}`) 
        .send();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'John McClane');
});

test('spefic patient not found', async () => {
    const response = await request(app)
        .get('/api/patients/d2773336-f723-11e9-8f0b-362b9e15566')
        .set('Authorization', `Bearer ${token}`) 
        .send();

    expect(response.status).toBe(404);
    expect(response.text).toBe('Patient not found');
});

test('Add entry to patient', async () => {
    const response = await request(app)
        .post('/api/patients/d2773336-f723-11e9-8f0b-362b9e155667/entries')
        .set('Authorization', `Bearer ${token}`) 
        .send({
            type: 'HealthCheck',
            date: '2021-09-07',
            specialist: 'doctor',
            healthCheckRating: 0,
        });

    expect(response.status).toBe(200);
});

test('Add entry to patient with invalid values', async () => {
    const response = await request(app)
        .post('/api/patients/d2773336-f723-11e9-8f0b-362b9e155667/entries')
        .set('Authorization', `Bearer ${token}`) 
        .send({
            type: 'HealthCheck',
            specialist: 'doctor',
            healthCheckRating: 0,
        });

    expect(response.status).toBe(400);
    expect(response.text).toBe('Missing parameters');
});

test('Add entry to patient to HealthCheck with invalid healtChceckRating', async () => {
    const response = await request(app)
        .post('/api/patients/d2773336-f723-11e9-8f0b-362b9e155667/entries')
        .set('Authorization', `Bearer ${token}`) 
        .send({
            type: 'HealthCheck',
            date: '2021-09-07',
            specialist: 'doctor',
            healthCheckRating: 15,
        });

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid health check rating (0-3)');
});

test('Add entry to patient to OccupationHealthcare with valid values', async () => {
    const response = await request(app)
        .post('/api/patients/d2773336-f723-11e9-8f0b-362b9e155667/entries')
        .set('Authorization', `Bearer ${token}`) 
        .send({
            type: 'OccupationalHealthcare',
            date: '2021-09-07',
            specialist: 'doctor',
            employerName: 'HyPD',
        });

    expect(response.status).toBe(200);
});

test('Add entry to patient to OccupationHealthcare with invalid values', async () => {
    const response = await request(app)
        .post('/api/patients/d2773336-f723-11e9-8f0b-362b9e155667/entries')
        .set('Authorization', `Bearer ${token}`) 
        .send({
            type: 'OccupationalHealthcare',
            date: '2021-09-07',
            specialist: 'doctor',
        });

    expect(response.status).toBe(400);
    expect(response.text).toBe('Missing parameters');
});

test('Add entry to patient to hospital with valid values', async () => {
    const response = await request(app)
        .post('/api/patients/d2773336-f723-11e9-8f0b-362b9e155667/entries')
        .set('Authorization', `Bearer ${token}`) 
        .send({
            type: 'Hospital',
            date: '2021-09-07',
            specialist: 'doctor',
            discharge: {
                date: '2021-09-07',
                criteria: 'good',
            },
        });

    expect(response.status).toBe(200);
});

test('Add entry to patient to Hospital with invalid values', async () => {
    const response = await request(app)
        .post('/api/patients/d2773336-f723-11e9-8f0b-362b9e155667/entries')
        .set('Authorization', `Bearer ${token}`) 
        .send({
            type: 'Hospital',
            date: '2021-09-07',
            specialist: 'doctor',
            discharge: {
                date: '2021-09-07',
            },
        });

    expect(response.status).toBe(400);
    expect(response.text).toBe('Missing parameters');
});

test('Add patient', async () => {
    const response = await request(app)
        .post('/api/patients')
        .set('Authorization', `Bearer ${token}`) 
        .send({
            name: 'John Doe',
            dateOfBirth: '2021-09-07',
            ssn: '123456-666',
            gender: 'male',
            occupation: 'doctor',
        });
    });
           