import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function useProposals() {
	const url = "https://mbsbackend.herokuapp.com/";
	const { user } = useContext(UserContext);
	const [proposals, setProposals] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setLoading] = useState(true);

	//Loads proposals if isLoading becomes True
	useEffect(() => {
		if (isLoading) {
			const type = user.role === "advisor" ? "proposals" : "recommendations";
			const getProposals = async () =>
				await axios
					.get(url + type, { withCredentials: true })
					.then((res) => {
						setProposals(res.data);
						setLoading(false);
					})
					.catch((err) => {
						setError(err);
						setLoading(false);
					});

			getProposals();
		}
	}, [user.role, isLoading]);



	return {
		proposals,
		setProposals,
		isLoading,
		setLoading,
		error,
	};
}
