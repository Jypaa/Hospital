import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "../constants";
import { Patient , Diagnosis} from "../types";

import patientService from "../services/patients";
import PatientListPage from "../components/PatientListPage";
import PatientPage from "../components/PatientPage";

const LoggedIn = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

    useEffect(() => {
  
        const fetchPatientList = async () => {
        const patients = await patientService.getAll();
        setPatients(patients);
        const diagnoses = await patientService.getDiagnoses();
        setDiagnoses(diagnoses);
      };
      void fetchPatientList();
    
    }, []);
    
    const Logout = () => {
      window.localStorage.clear();
      window.location.reload();
    }

    return (
      <div className="App">
        <Router>
          <Container>
            <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
              Patientor
            </Typography>
            <Button component={Link} to="/" variant="contained" color="primary">
              Home
            </Button>
            <Button component={Link} to="/" variant="contained" color="primary" onClick={Logout} style={{float: "right"}}>
              Logout
            </Button>
            <Divider hidden />
            <Routes>
              <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
              <Route path="/patient/:id" element={<PatientPage patients={patients} diagnoses={diagnoses} setPatients={setPatients}/>} />
            </Routes>
          </Container>
        </Router>
      </div>
    );
    
    }

export default LoggedIn;