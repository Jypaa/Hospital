import { useParams } from "react-router-dom";
import { useState } from "react";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import DeleteIcon from '@mui/icons-material/Delete';
import { Patient, Diagnosis, EntryFormValues } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AddPatientEntryModal from "../AddpatientEntryModal";
import patientService from "../../services/patients";




interface Props{
    patients:  Patient;
    diagnoses: Array<Diagnosis>;

}

const EntryDetails = ({ entry} : { entry: any}) => {

  const healthy ={
    color: "green"
  }
  const lowRisk ={
    color: "orange"
  }
  const highRisk ={
    color: "yellow"
  }
  const criticalRisk ={
    color: "red"
  }

        switch (entry.healthCheckRating){
            case 0:
                return(
                    <div style={healthy}>
                        <FavoriteIcon />
                    </div>
                )
            case 1:
                return(
                    <div style={lowRisk}>
                        <FavoriteIcon />
                    </div>
                )
            case 2:
                return(
                    <div style={highRisk}>
                        <FavoriteIcon />
                    </div>
                )
            case 3:
                return(
                    <div style={criticalRisk}>
                        <FavoriteIcon />
                    </div>
                )
            default:
                return(
                    <div></div>
                )
        }
    }


const EntryHeader = ({ entry } : { entry: any }) => {
  
  const employee = {
    whiteSpace: "nowrap",
    display: "inline-block"
  }
  


  switch (entry.type) {
    case 'Hospital':
      return (
        <div style={employee}>
          <LocalHospitalIcon />
          {entry.discharge.date} {entry.discharge.criteria}
        </div>
      );
    case 'OccupationalHealthcare':
      return (

          <div style={employee}>
            <WorkIcon />
            {entry.employerName}
            </div>

      );
    case 'HealthCheck':
          return (
            <div style={employee}>
            <LocalHospitalIcon />

            </div>
          )
    default:
      return <div></div>;
  }
}

const PatientPage = ({ patients , diagnoses} : Props) => {
    
    const patient = patients

  const entries = {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    padding: "5px",
    margin: "5px"
  }
  

    


    const getIcon = () => {
        if (patient) {
          if (patient.gender === 'male') {
            return <MaleIcon />;
          } else if (patient.gender === 'female') {
            return <FemaleIcon />;
          } else {
            return <DeleteIcon />;
          }
        }
        return <div></div>
      };
    
    return(
        <div>

            {patient && <h1>{patient.name}{getIcon()}</h1>}
            {patient && <p>ssn: {patient.ssn}</p>}
            {patient && <p>occupation: {patient.occupation}</p>}
            
            <h2>entries</h2>
            {patient && patient.entries.map((entry) => (
                <div key={entry.id} style={entries}>
                    {entry.date}
                    <EntryHeader entry={entry} />
                    <p>{entry.description}</p>
                    <EntryDetails entry={entry}  />
                    <ul>
                        {entry.diagnosisCodes?.map((code) => (
                            <li key={code}>{code} {diagnoses.find((diagnosis) => diagnosis.code === code)?.name}</li>
                        ))}
                    </ul>
                    
                    <p>Diagnoses by {entry.specialist}</p>
                </div>
            ))}

        </div>
    )
};

export default PatientPage;