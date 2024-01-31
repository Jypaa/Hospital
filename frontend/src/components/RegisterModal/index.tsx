import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import RegisterForm from "./RegisterForm";
import { LogInFormValues } from "../../types";


interface Props {
    username: Function;
    password: Function;
    name: Function;
    occupation: Function;
    ssn: Function;
    dateofBirth: Function;
    gender: Function;
    modalOpen: boolean;
    onSubmit: (values: LogInFormValues) => void; 
    onCancel: () => void;
    error?: string;
}



const RegisterpageModal = ({name,occupation,ssn,dateofBirth,gender,username, password, modalOpen, onSubmit, onCancel,  error}: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onCancel()}>
        <DialogTitle>Log In</DialogTitle>
        <Divider />
        <DialogContent>
            <RegisterForm 
            setname={name} 
            setoccupation={occupation}
            setssn={ssn}
            setdateofBirth={dateofBirth}
            setgender={gender}
            setusername={username} 
            setpassword={password} 
            onSubmit={onSubmit} 
            onCancel={onCancel}/> 
        </DialogContent>
    </Dialog>
);

export default RegisterpageModal;
