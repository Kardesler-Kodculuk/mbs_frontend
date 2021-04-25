import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function useAuth() {
  const url = 'http://localhost:5000/';

  let history = useHistory();

  const [error, setError] = useState(null);

  const logoutUser = async () => {
    return axios
      .delete(url + 'jwt', { withCredentials: true })
      .then(async (e) => {
        history.go(0);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    logoutUser,
    error,
  };
}
