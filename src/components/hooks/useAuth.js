import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function useAuth() {
	const url = "https://mbsbackend.herokuapp.com/";
	const { setUser } = useContext(UserContext);
	const [error, setError] = useState(null);

	//Sets the current user to the fetched user if successful
	const setUserContext = async () => {
		return await axios
			.get(url + "users", { withCredentials: true })
			.then((res) => {
				setUser(res.data);
			})
			.catch((err) => {
				setError(true);
			});
	};
  
  //Login the users with JWT
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
