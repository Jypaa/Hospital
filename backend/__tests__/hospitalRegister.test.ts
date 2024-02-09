import request from 'supertest';
import axios from 'axios';
import app from '../app';
import { exit } from 'process';

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
            name: 'admin1',
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
            name: 'admin2',
            gender: 'male' ,
            dateOfBirth: '2021-09-07',
            occupation: 'doctor'
        });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({message: 'user with same username already exist'});
    }
);

afterAll(() => {
    async function clearData() {
      try {
        const response1 = await axios.get('http://localhost:3001/patients');
        const patients1 = response1.data;
        const response2 = await axios.get('http://localhost:3001/users');
        const users1 = response2.data;
    
        for (const patient of patients1) {
          await axios.delete(`http://localhost:3001/patients/${patient.id}`);
        }
        for (const user of users1) {
          await axios.delete(`http://localhost:3001/users/${user.id}`);
        }
      } catch (error) {
        console.error('Error clearing data:', error);
      }
    }

    async function addNewValuesPatient() {
      try {
        const newPatients = [
            {
              "id": "d2773336-f723-11e9-8f0b-362b9e155667",
              "name": "John McClane",
              "dateOfBirth": "1986-07-09",
              "ssn": "090786-122X",
              "gender": "Male",
              "occupation": "New york city cop",
              "entries": [
                {
                  "id": "d811e46d-70b3-4d90-b090-4535c7cf8fb1",
                  "date": "2015-01-02",
                  "type": "Hospital",
                  "specialist": "MD House",
                  "diagnosisCodes": [
                    "S62.5"
                  ],
                  "description": "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
                  "discharge": {
                    "date": "2015-01-16",
                    "criteria": "Thumb has healed."
                  }
                },
                {
                  "id": "b6bbd169-3ab4-4d34-9f08-2569ab6cab1e",
                  "type": "HealthCheck",
                  "date": "2021-09-07",
                  "specialist": "doctor",
                  "healthCheckRating": 0
                },
                {
                  "id": "3cb5972b-a965-41e4-8887-52ec11e4a62c",
                  "type": "OccupationalHealthcare",
                  "date": "2021-09-07",
                  "specialist": "doctor",
                  "employerName": "HyPD"
                }
              ]
            },
            {
              "id": "d2773598-f723-11e9-8f0b-362b9e155667",
              "name": "Martin Riggs",
              "dateOfBirth": "1979-01-30",
              "ssn": "300179-777A",
              "gender": "Male",
              "occupation": "Cop",
              "entries": [
                {
                  "id": "fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62",
                  "date": "2019-08-05",
                  "type": "OccupationalHealthcare",
                  "specialist": "MD House",
                  "employerName": "HyPD",
                  "diagnosisCodes": [
                    "Z57.1",
                    "Z74.3",
                    "M51.2"
                  ],
                  "description": "Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ",
                  "sickLeave": {
                    "startDate": "2019-08-05",
                    "endDate": "2019-08-28"
                  }
                }
              ]
            },
            {
              "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
              "name": "Hans Gruber",
              "dateOfBirth": "1970-04-25",
              "ssn": "250470-555L",
              "gender": "Other",
              "occupation": "Technician",
              "entries": []
            },
            {
              "id": "d2773822-f723-11e9-8f0b-362b9e155667",
              "name": "Dana Scully",
              "dateOfBirth": "1974-01-05",
              "ssn": "050174-432N",
              "gender": "Female",
              "occupation": "Forensic Pathologist",
              "entries": [
                {
                  "id": "b4f4eca1-2aa7-4b13-9a18-4a5535c3c8da",
                  "date": "2019-10-20",
                  "specialist": "MD House",
                  "type": "HealthCheck",
                  "description": "Yearly control visit. Cholesterol levels back to normal.",
                  "healthCheckRating": 0
                },
                {
                  "id": "fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62",
                  "date": "2019-09-10",
                  "specialist": "MD House",
                  "type": "OccupationalHealthcare",
                  "employerName": "FBI",
                  "description": "Prescriptions renewed."
                },
                {
                  "id": "37be178f-a432-4ba4-aac2-f86810e36a15",
                  "date": "2018-10-05",
                  "specialist": "MD House",
                  "type": "HealthCheck",
                  "description": "Yearly control visit. Due to high cholesterol levels recommended to eat more vegetables.",
                  "healthCheckRating": 1
                }
              ]
            }
          ]

          for (const patient of newPatients) {
            const response = await axios.post('http://localhost:3001/patients', patient);
          }
        } catch (error) {
          console.error('Error adding new values:', error);
        }
    }
    async function addNewValuesUsers()  {
      try {
        const newUsers = [
          {
            "id": "d2773336-f723-11e9-8f0b-362b9e155667",
            "name": "John McClane",
            "ssn": "090786-122X",
            "username": "jmcclane",
            "role": "patient",
            "passwordhash": "$2b$10$ogdMP/H2bGOVr/K1WwEADeRnkCDH7/S/5V.SGx9ZeHVk4Mii/CuZm"
          },
          {
            "id": "d2773598-f723-11e9-8f0b-362b9e155668",
            "name": "admin",
            "ssn": "123456-7890",
            "username": "admin",
            "role": "admin",
            "passwordhash": "$2b$10$ogdMP/H2bGOVr/K1WwEADeRnkCDH7/S/5V.SGx9ZeHVk4Mii/CuZm"
          }
        ]
        for (const user of newUsers) {
          const response = await axios.post('http://localhost:3001/users', user);
        }
      } catch (error) {
        console.error('Error adding new values:', error);
      }

    }
    
    clearData()
      .then(() => {
        addNewValuesPatient();
        addNewValuesUsers();
      });
    
        
});