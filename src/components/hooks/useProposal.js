import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export default function useProposals() {
	const url = "https://mbsbackend.herokuapp.com/";
	const { user } = useContext(UserContext);
	const [proposals, setProposals] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setLoading] = useState(true);

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

	const studentProposal = async (advisor) => {
		const { advisor_id } = advisor;
		return axios
			.post(
				url + "proposals",
				{
					advisor_id,
				},
				{ withCredentials: true }
			)
			.then(async (e) => {})
			.catch((err) => {
				setError(true);
			});
	};



	return {
		proposals,
		setProposals,
		studentProposal,
		isLoading,
		setLoading,
		error,
	};
}
