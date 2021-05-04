import { useState, useEffect } from "react";
import axios from "axios";

export default function useUser() {
	const url = "https://mbsbackend.herokuapp.com/";

	const [user, setUser] = useState(null);
	const [isLoading, setLoading] = useState(true);

	//Fetches the user information if needed
	useEffect(() => {
		if (isLoading) {
			async function findUser() {
				await axios
					.get(url + "users", { withCredentials: true })
					.then((res) => {
						setUser(res.data);
						setLoading(false);
					})
					.catch((err) => {
						setLoading(false);
					});
			}
			findUser();
		}
	}, [isLoading]);

	return {
		user,
		setUser,
		setLoading,
		isLoading,
	};
}
