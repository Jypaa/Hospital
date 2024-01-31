import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography, Alert } from '@mui/material';
import LogInForm from "../components/FrontpageModal/LogInForm";
import patientService from "../services/patients";
import FrontpageModal from "../components/FrontpageModal";

interface User {
    token: string;
    role: string;
    id: string;
  }

const LogOut= () => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');

    console.log(modalOpen)
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
            console.log(user);
            window.localStorage.setItem('token', user.token);
            window.localStorage.setItem('role', user.role);
            window.localStorage.setItem('id', user.id );
            window.location.reload();
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
            <Button component={Link} onClick={() => setModalOpen(true)} to="/login" variant="contained" color="primary">
                Login
            </Button>

            <FrontpageModal
                username= {setUser} 
                password= {setPassword} 
                onSubmit={logIn} 
                onCancel={() => setModalOpen(!modalOpen)}
                modalOpen={modalOpen}  />
               
        </Container>
    </Router>
</div>
  )
};

export default LogOut;
