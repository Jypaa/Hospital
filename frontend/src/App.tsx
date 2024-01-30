
import LoggedIn from "./Pages/LoggedIn";
import { useState } from "react";
import LogOut from "./Pages/Logout";


const App = () => {
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [id, setId] = useState(localStorage.getItem('id') || '');
  if(localStorage.getItem('token')) {
    return (
      <LoggedIn role={role} id={id}/>  
    );
  } else {
    return (
      <LogOut />
    );
  }
};

export default App;
