import axios from 'axios';

const TokenAdd = (token) => {
    if (token) {
      // Apply to every request
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      // Delete auth Header
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  export default TokenAdd;