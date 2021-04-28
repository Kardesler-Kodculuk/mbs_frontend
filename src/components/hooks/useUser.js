import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useUser() {
  const url = 'http://localhost:5000/';

  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function findUser() {
      await axios
        .get(url + 'users', { withCredentials: true })
        .then((res) => {
  
          setUser(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
    findUser();
  }, []);

  return {
    user,
    setUser,
    isLoading,
  };
}
