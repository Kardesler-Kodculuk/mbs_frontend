import { useState, useEffect } from "react";
import axios from "axios";

export default function useProposals() {
	const url = "https://mbsbackend.herokuapp.com/";

	const [students, setStudents] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		if (isLoading) {
			const getProposals = async () =>
				await axios
					.get(url + "students", { withCredentials: true })
					.then((res) => {
						setStudents(res.data);
						setLoading(false);
					})
					.catch((err) => {
						setError(err);
						setLoading(false);
					});

			getProposals();
		}
	}, [isLoading]);

	return {
		students,
		setStudents,
		isLoading,
		setLoading,
		error,
	};
}
