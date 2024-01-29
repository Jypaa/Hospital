import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import LogInForm from "./LogInForm";
import { LogInFormValues } from "../../types";


interface Props {
    username: Function;
    password: Function;
    modalOpen: boolean;
    onSubmit: (values: LogInFormValues) => void; 
    onClose: () => void;
    error?: string;
}



const FrontpageModal = ({username, password, modalOpen, onSubmit, onClose,  error}: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>log In</DialogTitle>
        <Divider />
        <DialogContent>
            <LogInForm setusername={username} setpassword={password} onSubmit={onSubmit} onCancel={onClose}/> 
        </DialogContent>
    </Dialog>
);

export default FrontpageModal;
