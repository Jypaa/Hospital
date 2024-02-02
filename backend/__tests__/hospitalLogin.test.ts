import request from 'supertest';

import app from '../app';

test('add 1+2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});

test('get healtz',async ()  => {
    const response = await request(app).get('/api/healtz');
    expect(response.status).toBe(200);
    }
);

test('get patients',async ()  => {
    const response = await request(app).get('/api/patients');
    expect(response.status).toBe(401);
});

test ('login fail', async () => {
    const response = await request(app).post('/api/login').send({username: 'admin', password: '12345'});
    expect(response.status).toBe(401);
    expect(response.body).toEqual({message: 'Invalid password'});
}
);
 test ('login fail', async () => {
    const response = await request(app).post('/api/login').send({username: 'admin1', password: '1234'});
    expect(response.status).toBe(401);
    expect(response.body).toEqual({message: 'Invalid username'});
    }
);
test ('login success', async () => {
    const response = await request(app).post('/api/login').send({username: 'admin', password: '1234'});
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
}
);

test('get patients',async ()  => {
    const login = await request(app).post('/api/login').send({username: 'admin', password: '1234'});
    const response = await request(app).get('/api/patients').set('Authorization', `Bearer ${login.body.token}`);
    expect(response.status).toBe(200);
    expect(response.body[3]).toHaveProperty('name', 'Dana Scully');
});
