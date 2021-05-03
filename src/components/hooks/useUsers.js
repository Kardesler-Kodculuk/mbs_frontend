import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function useUsers() {
	const url = "https://mbsbackend.herokuapp.com/";
	const { user } = useContext(UserContext);
	const [users, setUsers] = useState([]);
	const [UserIds, setUserIds] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const findUser = async () => {
			let newUsers = [];
			const role = user.role === "advisor" ? "students/" : "advisors/";
			await Promise.all(
				UserIds.map(async (id) => {
					const promise = axios
						.get(url + role + id, { withCredentials: true })
						.then((res) => {
							newUsers.push(res.data);
						})
						.catch((err) => {
							setError(err);
						});
					return promise;
				})
			);
			setUsers(newUsers);
			setLoading(false);
		};
		findUser();
	}, [UserIds, user.role]);

	return {
		users,
		setUsers,
		UserIds,
		setUserIds,
		isLoading,
		error,
	};
}
