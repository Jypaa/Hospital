
import FrontPage from "./Pages/Logout";
import LoggedIn from "./Pages/LoggedIn";


const App = () => {
  
  if(localStorage.getItem('token')) {
    return (
      <LoggedIn />  
    );
  } else {
    return (
      <FrontPage />
    );
  }
};

export default App;
