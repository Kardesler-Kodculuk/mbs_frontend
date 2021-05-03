import React, { useEffect } from "react";
import CheckIcon from "@material-ui/icons/Check";
import useProposals from "../hooks/useProposal";
import useUsers from "../hooks/useUsers";
import UserTable from "../User/UserTable";
import { TableRow, TableCell, IconButton } from "@material-ui/core";

export default function AdvisorProposal() {
	const { proposals, studentProposal, isLoading: isProposalLoading, reset } = useProposals();
	const { users, isLoading: isAdvisorLoading, setUserIds } = useUsers();

	useEffect(() => {
		if (isProposalLoading) {
			return <div />;
		}
		setUserIds(proposals.map((advisor) => advisor.advisor_id));
		if (isAdvisorLoading) {
			return <div />;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isProposalLoading, isAdvisorLoading]);

	return (
		<UserTable title={"Previously Uploaded Advisors"}>
			{users.map((advisor) => (
				<TableRow key={"table_row_" + advisor.name_}>
					<TableCell>
						<IconButton
							variant="contained"
							onClick={(e) => {
								studentProposal(advisor);
								reset();
							}}>
							<CheckIcon color="primary" />
						</IconButton>
					</TableCell>
					<TableCell component="th" scope="row" align="right">
						{advisor.name_+" "+advisor.surname}
					</TableCell>
				</TableRow>
			))}
		</UserTable>
	);
}
