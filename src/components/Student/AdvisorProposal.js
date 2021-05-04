import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../hooks/UserContext";
import axios from "axios";
import CheckIcon from "@material-ui/icons/Check";
import useProposals from "../hooks/useProposal";
import useUsers from "../hooks/useUsers";
import UserTable from "../User/UserTable";
import useAlert from "../hooks/useAlert";
import Alert from "@material-ui/lab/Alert";
import { TableRow, TableCell, IconButton } from "@material-ui/core";

export default function AdvisorProposal() {
	const url = "https://mbsbackend.herokuapp.com/";
	const { user, isLoading: isUserLoading, setLoading: setUserLoading } = useContext(UserContext);
	const { proposals, isLoading: isProposalLoading, reset } = useProposals();
	const { users, isLoading: isAdvisorLoading, setUserIds } = useUsers();
	const [error, setError] = useState(null);
	const { Alerts, handleOpen } = useAlert([
		{ name: "success", type: "success", page_: "AdvisorProposal", body: "Proposal has been sent." },
	]);

	//Student proposal request to the advisor
	//Reloads user to see if proposal is successful
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
			.then(async (e) => {
				setUserLoading(true);
				handleOpen("success");
			})
			.catch((err) => {
				setError(true);
			});
	};

	//Waits for proposal ids and user to load
	//Fetches the advisors from the proposals/recommendations
	useEffect(() => {
		if (isProposalLoading || isUserLoading) {
			return <div />;
		}
		setUserIds(proposals.map((advisor) => advisor.advisor_id));
		if (isAdvisorLoading) {
			return <div />;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isProposalLoading, isAdvisorLoading, isUserLoading]);

	return (
		<div>
			{user[user.role].has_proposed ? (
				<Alert severity="info">You already proposed to an advisor, please wait for response!</Alert>
			) : (
				<UserTable title={"Previously Uploaded Advisors"}>
					{users.map((advisor) => (
						<TableRow key={"table_row_" + advisor.name_}>
							<TableCell>
								<IconButton
									variant="contained"
									onClick={(e) => {
										studentProposal(advisor);
									}}>
									<CheckIcon color="primary" />
								</IconButton>
							</TableCell>
							<TableCell component="th" scope="row" align="right">
								{advisor.name_ + " " + advisor.surname}
							</TableCell>
						</TableRow>
					))}
				</UserTable>
			)}
			<Alerts />
		</div>
	);
}
