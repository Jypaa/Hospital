import request from 'supertest';

import app from '../app';

test('add 1+2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});

test('Register user',async ()  => {
    const response = await request(app)
    .post('/api/register')
    .send(
        {
            username: 'JohnDoe',
            password: '12345',
            ssn: '123456666',
            name: 'admin',
            gender: 'male' ,
            dateOfBirth: '2021-09-07',
            occupation: 'doctor'
        });
    expect(response.status).toBe(200);
    }
);
test('Register user',async ()  => {
    const response = await request(app)
    .post('/api/register')
    .send(
        {
            username: 'JohnDoe',
            password: '12345',
            ssn: '123456666',
            name: 'admin',
            gender: 'male' ,
            dateOfBirth: '2021-09-07',
            occupation: 'doctor'
        });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({message: 'user with same ssn already exist'});
    }
);
test('Register user',async ()  => {
    const response = await request(app)
    .post('/api/register')
    .send(
        {
            username: 'JohnDoe',
            password: '12345',
            ssn: '12345666677',
            name: 'admin',
            gender: 'male' ,
            dateOfBirth: '2021-09-07',
            occupation: 'doctor'
        });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({message: 'user with same username already exist'});
    }
);