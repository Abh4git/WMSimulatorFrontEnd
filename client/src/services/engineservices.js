import axios from "axios";
//Engine Service calls
const API_URL = "http://localhost:5000/api/engine";

class EngineService {
    async startEngine(operationmode,token) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "enginemode": operationmode })
        };
         return fetch(API_URL,  requestOptions)
         .then(response => {
            if (!response.ok) {
              this.handleResponseError(response);
            }
            return response.json();
          })
          .then(json => {
            console.log("Retrieved items:");
            console.log(json.username);
            return json.username;
          })
          .catch(error => {
            this.handleError(error);
          });
      }
      handleError(error) {
                 console.log(error.message); 
      }
  
}

export default new EngineService();