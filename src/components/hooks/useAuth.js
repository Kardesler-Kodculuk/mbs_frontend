import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function useAuth() {
  const url = "https://mbsbackend.herokuapp.com/";

  let history = useHistory();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const setUserContext = async () => {
    return await axios
      .get(url + "users", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        history.push("/" + res.data.id + "/" + res.data.role + "/home");
      })
      .catch((err) => {
        setError(true);
      });
  };

  const loginUser = async (data) => {
    const { username, password } = data;
    return axios
      .post(
        url + "jwt",
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .then(async (e) => {
        await setUserContext();
      })
      .catch((err) => {
        setError(true);
      });
  };

  return {
    loginUser,
    error,
  };
}
