import React, { useState, useEffect } from "react";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import useProposals from "../hooks/useProposal";
import useUsers from "../hooks/useUsers";
import UserTable from "../User/UserTable";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import useManagedStudents from "../hooks/useManagedStudents";
import axios from "axios";
import { Checkbox, makeStyles, FormGroup, FormControlLabel } from "@material-ui/core";
import useAlert from "../hooks/useAlert";
const url = "https://mbsbackend.herokuapp.com/";

const useStyles = makeStyles((theme) => ({
	button: {
		color: "green",
	},
}));

//Manage Students Page
//Shows Approved Students and Student Approvals Together
export default function ManageStudents() {
	const classes = useStyles();
	const [error, setError] = useState(null);
	//Proposal Id fetches
	const {
		proposals,
		isLoading: isProposalsLoading,
		setLoading: setProposalLoading,
	} = useProposals();
	//Managed Students Id fetches
	const {
		students: managedStudents,
		isLoading: isManagedStudentsLoading,
		setLoading: setManagedStudentsLoading,
	} = useManagedStudents();
	//Proposed Students from fetched Ids
	const {
		users: fetchedProposedStudents,
		isLoading: isFetchedProposedStudentsLoading,
		setUserIds: setProposedStudentsIds,
	} = useUsers();
	//Managed Students from fetched Ids
	const {
		users: fetchedManagedStudents,
		isLoading: isFetchedManagedStudentsLoading,
		setUserIds: setManagedStudentsIds,
	} = useUsers();

	function reset() {
		setProposalLoading(true);
		setManagedStudentsLoading(true);
	}

	//Alerts For approval and rejection requests
	const { Alerts, handleOpen } = useAlert([
		{ name: "approval", type: "success", page_: "ManageStudents", body: "Approval has been sent." },
		{
			name: "rejection",
			type: "success",
			page_: "ManageStudents",
			body: "Rejection has been sent.",
		},
	]);

	//States for showing Proposed and Approved Students on the User Table
	const [state, setState] = useState({
		showStudents: true,
		showProposals: false,
	});

	//Change handler for show status
	const handleChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.checked });
	};

	//Sends an advisor accept request to the MBS backend
	const advisorApprove = async (proposal) => {
		const { proposal_id } = proposal;
		return axios
			.put(url + "proposals/" + proposal_id, {}, { withCredentials: true })
			.then(async (e) => {
				handleOpen("approval");
				reset();
			})
			.catch((err) => {
				setError(err);
				console.log(err);
			});
	};

	//Sends an advisor rejection request to the MBS backend
	const advisorReject = async (proposal) => {
		const { proposal_id } = proposal;
		return axios
			.delete(url + "proposals/" + proposal_id, { withCredentials: true })
			.then(async (e) => {
				handleOpen("rejection");
				reset();
			})
			.catch((err) => {
				setError(err);
				console.log(err);
			});
	};

	//Content refreshes if loading status changes for loading states
	//Waits for ids and put the ids to the want to be fetched student states
	//After Users fetched loads the Table again
	useEffect(() => {
		const reset = async () => {
			if (isProposalsLoading || isManagedStudentsLoading) {
				return <div />;
			}
			setProposedStudentsIds(proposals.map((proposal) => proposal.student_id));
			setManagedStudentsIds(managedStudents.map((student) => student));
			if (isFetchedManagedStudentsLoading || isFetchedProposedStudentsLoading) {
				return <div />;
			}
		};
		reset();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		isProposalsLoading,
		isManagedStudentsLoading,
		isFetchedManagedStudentsLoading,
		isFetchedProposedStudentsLoading,
	]);

	return (
		<div>
			<UserTable
				title={"Previously Uploaded Students"}
				checkboxes={
					<FormGroup row>
						{[
							{ s: state.showStudents, name: "Show Managed Students", id: "showStudents" },
							{ s: state.showProposals, name: "Show Proposals", id: "showProposals" },
						].map((check) => (
							<FormControlLabel
								control={
									<Checkbox checked={check.s} onChange={(e) => handleChange(e)} name={check.id} />
								}
								label={check.name}
								key={"checkbox_manage_student" + check.id}
							/>
						))}
					</FormGroup>
				}>
				{state.showStudents
					? fetchedManagedStudents.map((student, i) => (
							<TableRow key={"managed_table_row_" + student.name_ + " " + student.surname + i}>
								<TableCell component="th" scope="row">
									{student.name_ + " " + student.surname}
								</TableCell>
								<TableCell align="right">
									<IconButton variant="contained" className={classes.button} onClick={(e) => {}}>
										<OpenInNewIcon />
									</IconButton>
								</TableCell>
							</TableRow>
					  ))
					: null}
				{state.showProposals
					? fetchedProposedStudents.map((student, i) => (
							<TableRow key={"proposed_table_row_" + student.name_ + " " + student.surname + i}>
								<TableCell component="th" scope="row">
									{student.name_ + " " + student.surname}
								</TableCell>
								<TableCell align="right">
									{student.thesis_topic}
									<IconButton
										variant="contained"
										onClick={(e) => {
											advisorApprove(proposals[i]);
										}}>
										<CheckIcon color="primary" />
									</IconButton>
									<IconButton
										variant="contained"
										onClick={(e) => {
											advisorReject(proposals[i]);
										}}>
										<ClearIcon color="secondary" />
									</IconButton>
								</TableCell>
							</TableRow>
					  ))
					: null}
			</UserTable>
			<Alerts />
		</div>
	);
}
