# Hospital

I wanted to continue one of the course projects further

How to use 

1. clone the repository

2. Run "npm install" in both backend and frontend folders

3. Add ".env to backend folder

   - example backend .env:
  
          SECRET= secret
          NODE_ENV=
          PORT=3000
          BASE_URL= http://localhost:3001/patients

4. Run "json-server --watch data/patientsjson.json --port 3001" in backend folder
   
5. Run "npm run dev" in both folders (backend and frontend) and it works in development environment
   
6. To test the application:

   - For patient access, use the following credentials:
  
           Username: jmcclane
           Password: 1234

   - For doctor or admin access, use the following credentials:
 
           Username: admin
           Password: 1234

To run backend tests and reset the JSON server to default values, run "npm run test" in the backend folder.

To run frontend end-to-end tests using Cypress, run "npm run cypress:open" in the frontend folder.
