import {Role, User} from '../types'


const users: User[] = [
    {   
        id: 'd2773336-f723-11e9-8f0b-362b9e155667',
        name: 'John McClane',
        username: 'jmcclane',
        role: Role.Patient,
        passwordhash: '$2b$10$ogdMP/H2bGOVr/K1WwEADeRnkCDH7/S/5V.SGx9ZeHVk4Mii/CuZm'
    },
    {
        id: 'd2773598-f723-11e9-8f0b-362b9e155668',
        name: 'admin',
        username: 'admin',
        role: Role.Admin,
        passwordhash: '$2b$10$ogdMP/H2bGOVr/K1WwEADeRnkCDH7/S/5V.SGx9ZeHVk4Mii/CuZm'
    }
]

export default users;