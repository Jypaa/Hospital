import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import LogInForm from "./LogInForm";
import { LogInFormValues } from "../../types";


interface Props {
    username: Function;
    password: Function;
    modalOpen: boolean;
    onSubmit: (values: LogInFormValues) => void; 
    onCancel: () => void;
    error?: string;
}



const FrontpageModal = ({username, password, modalOpen, onSubmit, onCancel,  error}: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onCancel()}>
        <DialogTitle>Log In</DialogTitle>
        <Divider />
        <DialogContent>
            <LogInForm setusername={username} setpassword={password} onSubmit={onSubmit} onCancel={onCancel}/> 
        </DialogContent>
    </Dialog>
);

export default FrontpageModal;
