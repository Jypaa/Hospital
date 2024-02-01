import request from 'supertest';

import app from '../index';

test('add 1+2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});

test('get healtz',async ()  => {
    const response = await request(app).get('/api/healtz');
    expect(response.status).toBe(200);
    }
);
