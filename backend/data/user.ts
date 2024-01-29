import {Role, User} from '../types'


const users: User[] = [
    {   
        id: 'd2773336-f723-11e9-8f0b-362b9e155667',
        name: 'John McClane',
        username: 'jmcclane',
        role: Role.Patient,
        password: '1234'
    },
    {
        id: 'd2773598-f723-11e9-8f0b-362b9e155668',
        name: 'admin',
        username: 'admin',
        role: Role.Admin,
        password: '1234'
    }
]

export default users;