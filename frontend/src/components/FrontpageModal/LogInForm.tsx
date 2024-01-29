import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import {LogInFormValues } from "../../types";
import patientService from "../../services/patients";
import { link } from "fs";

interface Props {
    setusername: Function;
    setpassword: Function;
    onCancel: () => void;
    onSubmit: (values: LogInFormValues) => void;
}



const LogInForm = ({setusername, setpassword, onCancel, onSubmit }: Props) => {
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');



    const Login = async (event: SyntheticEvent)  => {
        event.preventDefault();
        onSubmit({
            username,
            password
        });
      }


  return (
    <div>
      <form onSubmit={Login}>
        <TextField
          label="Name"
          fullWidth 
          value={username}
          onChange={({ target }) => {setName(target.value), setusername(target.value)}}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={({ target }) => {setPassword(target.value), setpassword(target.value)}}
        />
        

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              LogIn
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default LogInForm;