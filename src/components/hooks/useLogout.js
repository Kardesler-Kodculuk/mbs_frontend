import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function useAuth() {
  const url = "https://mbsbackend.herokuapp.com/";

  let history = useHistory();

  const [error, setError] = useState(null);
  //Logouts the user, delete user from user context
  const logoutUser = async () => {
    return axios
      .delete(url + "jwt", { withCredentials: true })
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
