import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography, Alert } from '@mui/material';
import LogInForm from "../components/FrontpageModal/LogInForm";
import patientService from "../services/patients";

interface User {
    token: string;
    role: string;
  }

const FrontPage= () => {
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');

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
            <Button component={Link} to="/login" variant="contained" color="primary">
                Login
            </Button>
                <Routes>
                    <Route path="/login" element={<LogInForm setusername= {setUser} setpassword= {setPassword} onSubmit={logIn} onCancel={logIn} />} />
                </Routes>
        </Container>
    </Router>
</div>
  )
};

export default FrontPage;
