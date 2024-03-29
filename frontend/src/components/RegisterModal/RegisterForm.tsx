import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import {Gender, RegisterFormValues } from "../../types";

interface Props {
    setname: Function;
    setoccupation: Function;
    setssn: Function;
    setdateofBirth: Function;
    setgender: Function;
    setusername: Function;
    setpassword: Function;
    onCancel: () => void;
    onSubmit: (values: RegisterFormValues) => void;
}

interface GenderOption{
    value: Gender;
    label: string;
  }
  
  const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
    value: v, label: v.toString()
  }));

const RegisterForm = ({setname, setoccupation,setssn,setdateofBirth, setgender, setusername, setpassword, onCancel, onSubmit }: Props) => {
    const [name, setName] = useState('');
    const [username, setUsernameName] = useState('');
    const [password, setPassword] = useState('');
    const [occupation, setOccupation] = useState('');
    const [ssn, setSsn] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender]= useState(Gender.Male)


    const onGenderChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        if ( typeof event.target.value === "string") {
          const value = event.target.value;
          const gender = Object.values(Gender).find(g => g.toString() === value);
          if (gender) {
            setGender(gender);
            setgender(gender);
          }
        }
      };
   
    const Register = async (event: SyntheticEvent)  => {
        event.preventDefault();
        onSubmit({
            username,
            password,
            name,
            occupation,
            ssn,
            dateOfBirth,
            gender

        });
      }

  return (
    <div>
      <form onSubmit={Register}>
      <TextField
          className="name_register"
          label="Name"
          fullWidth 
          value={name}
          onChange={({ target }) => {setName(target.value), setname(target.value)}}
        />
        <TextField
          className="ssn_register"
          label="Social security number"
          fullWidth
          value={ssn}
          onChange={({ target }) => {setSsn(target.value),setssn(target.value)}}
        />
        <TextField
          className="dateOfBirth_register"
          label="Date of birth"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={dateOfBirth}
          onChange={({ target }) => {setDateOfBirth(target.value), setdateofBirth(target.value)}}
        />
        <TextField
          className="occupation_register"
          label="Occupation"
          fullWidth
          value={occupation}
          onChange={({ target }) => {setOccupation(target.value),setoccupation(target.value)}}
        />

        <Select
          className="gender_register"
          label="Gender"
          fullWidth
          value={gender}
          onChange={onGenderChange}
        >
        {genderOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>
        <TextField
          className="username_register"
          label="Username"
          fullWidth 
          value={username}
          onChange={({ target }) => {setUsernameName(target.value), setusername(target.value)}}
        />
        <TextField
          className="password_register"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={({ target }) => {setPassword(target.value),setpassword(target.value)}}
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
              className="register_register"
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default RegisterForm;