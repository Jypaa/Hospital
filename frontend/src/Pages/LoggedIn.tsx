import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "../constants";
import { Patient , Diagnosis} from "../types";

import patientService from "../services/patients";
import PatientListPage from "../components/PatientListPage";
import PatientsPage from "../components/PatientsPage";
import PatientPage from "../components/PatientPage";

interface Props {
  role: string;
  id: string;
}

const LoggedIn = ( {role, id}: Props) => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const [SinglePatient, setSinglePatient] = useState<Patient>();



    useEffect(() => {
      if(role === "doctor" || role === "admin"){
        const fetchPatientList = async () => {
          const patients = await patientService.getAll();
          setPatients(patients);
          const diagnoses = await patientService.getDiagnoses();
          setDiagnoses(diagnoses);
        };
      void fetchPatientList();
    }
    else{
        const fetchPatientList = async () => {
          const Singlepatient = await patientService.getOne(id);
          setSinglePatient(Singlepatient);
          console.log(patients);
          const diagnoses = await patientService.getDiagnoses();
          setDiagnoses(diagnoses);
        };
      void fetchPatientList();
    }
      
    
    }, []);
    
    const Logout = () => {
      window.localStorage.clear();
      window.location.reload();
    }
    if (role === "doctor" || role === "admin") {
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
                <Route path="/patient/:id" element={<PatientsPage patients={patients} diagnoses={diagnoses} setPatients={setPatients}/>} />
              </Routes>
            </Container>
          </Router>
        </div>
      );
    }
    else{
     return (
      <div className="App">

        
        {SinglePatient && <PatientPage patients={SinglePatient} diagnoses={diagnoses}/>}
        <Router>
         <Button component={Link} to="/" variant="contained" color="primary" onClick={Logout} style={{float: "right"}}>
          Logout
        </Button>  
        </Router>
      </div>
    ); 
    }
    
    
    }

export default LoggedIn;

/* 
<Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Button component={Link} to="/" variant="contained" color="primary" onClick={Logout} style={{float: "right"}}>
          Logout
        </Button> 
        */