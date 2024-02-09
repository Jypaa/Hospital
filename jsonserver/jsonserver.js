var user = require('./data/userjson.json')
var patients = require('./data/patientsjson.json')
var diagnoses = require('./data/diagnosesjson.json')


module.exports = function() {
    return {
        user,
        patients,
        diagnoses

    }
    }