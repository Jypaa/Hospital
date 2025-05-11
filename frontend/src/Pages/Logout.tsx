import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography, Alert } from '@mui/material';
import LogInForm from "../components/LogInModal/LogInForm";
import patientService from "../services/patients";
import LogInpageModal from "../components/LogInModal";
import RegisterModal from "../components/RegisterModal";
import { Gender } from "../types";

interface User {
    token: string;
    role: string;
    id: string;
  }

const LogOut= () => {
    const [modalOpenLogin, setModalOpenLogin] = useState<boolean>(false);
    const [modalOpenRegister, setModalOpenregister] = useState<boolean>(false);
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [ssn, setSsn] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender]= useState(Gender.Male);


    const logIn = async () => {
        setPassword(password);
        setUser(username);
        const user = await patientService.login({
            username: username,
            password: password,
            }) as User
            if (!user) {
                alert("Wrong credentials");
                return;
            }

            window.localStorage.setItem('token', user.token);
            window.localStorage.setItem('role', user.role);
            window.localStorage.setItem('id', user.id );
            window.location.href = "/";             
      }
    
    const Register = async () => {
        setPassword(password);
        setUser(username);
        const user = await patientService.register({
            username: username,
            password: password,
            name,
            occupation,
            ssn,
            dateOfBirth,
            gender

            }) as User
            if (!user) {
                alert("Wrong credentials");

                return;
            }

            await window.localStorage.setItem('token', user.token);
            await window.localStorage.setItem('role', user.role);
            await window.localStorage.setItem('id', user.id );
            window.location.href = "/";             
      }
  return(
    <div>
    <Router>
        <Container
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
                Patientor
            </Typography>
            <Typography variant="h6" style={{ marginBottom: "0.5em" }}>
                Welcome to Jyri's Hospital here you can find all the information about your diagnoses.
            </Typography>
            <Button className="Login" component={Link} onClick={() => setModalOpenLogin(true)} to="/login" variant="contained" color="primary">
                Login
            </Button>
            <br></br>
            <Button className="Register" component={Link} onClick={()=> setModalOpenregister(true)} to="/register" variant="contained" color="primary">
                Register
            </Button>

            <LogInpageModal
                username= {setUser} 
                password= {setPassword} 
                onSubmit={logIn} 
                onCancel={() => setModalOpenLogin(!modalOpenLogin)}
                modalOpen={modalOpenLogin}  />

            <RegisterModal
                name={setName}
                occupation={setOccupation}
                ssn={setSsn}
                dateofBirth={setDateOfBirth}
                gender={setGender}
                username= {setUser} 
                password= {setPassword} 
                onSubmit={Register} 
                onCancel={() => setModalOpenregister(!modalOpenRegister)}
                modalOpen={modalOpenRegister}  />
               
        </Container>
    </Router>
</div>
  )
};

export default LogOut;
