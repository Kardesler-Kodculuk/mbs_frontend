/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, forwardRef } from "react";
import { useQuery, useAlert } from "@mbs/services";
import { JuryData, Jury } from "@mbs/interfaces";
import {
	MenuItem,
	Card,
	makeStyles,
	TextField,
	Box,
	Divider,
	Select,
	Input,
	Menu,
	Button,
	FormControl,
	TableRow,
	TableCell,
	IconButton,
} from "@material-ui/core";
import { useForm, useArray } from "@mbs/hooks";
import { UserTable, CustomDialog } from "@mbs/components";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 575,
	},
	innerCard: {
		minWidth: 540,
		minHeight: 150,
		marginBottom: theme.spacing(3),
	},
	memberTitle: {
		flexGrow: 1,
	},
	buttonBox: {
		display: "flex",
		padding: theme.spacing(1),
	},
	submit: {
		margin: 8,
		color: "white",
		backgroundColor: "#ff9100",
		"&:hover": {
			backgroundColor: "#ffa733",
		},
	},
	memberButton: {
		color: "white",
		marginRight: theme.spacing(1),
		backgroundColor: "#607d8b",
		"&:hover": {
			backgroundColor: "#78909c",
		},
	},
	selection: {
		margin: theme.spacing(2),
		minWidth: 200,
	},
}));

type outsideJury = {
	name_: string;
	surname: string;
	email: string;
	institution: string;
	phone_number: string;
};

function compare(value: JuryData, cmp: JuryData) {
	return value.jury_id === cmp.jury_id;
}
function compareOutside(value: outsideJury, cmp: outsideJury) {
	return value.name_ === cmp.name_ && value.surname === cmp.surname;
}

export function Recommend() {
	const form = useForm<string>({
		initials: {
			name_: "",
			surname: "",
			email: "",
			institution: "",
			phone_number: "",
		},
	});

	const classes = useStyles();
	const alert = useAlert();
	const query = useQuery();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [juryID, setJuryID] = useState<Jury | null>(null);
	const [jurySelection, setJurySelection] = useState<JuryData | null>(null);
	const [jurySelectionID, setJurySelectionID] = useState<number>(0);
	const selectableJury = useArray<JuryData>({ compare: compare });
	const selectedJury = useArray<JuryData>({ compare: compare });
	const selectedOutsideJury = useArray<outsideJury>({ compare: compareOutside });
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

	const handleOutsideSubmit = (e: React.SyntheticEvent): void => {
		e.preventDefault();
		selectedOutsideJury.addValue({
			name_: form.values["name_"],
			surname: form.values["surname"],
			email: form.values["email"],
			institution: form.values["institution"],
			phone_number: form.values["phone_number"],
		});
	};
	const handleFacultySubmit = (e: React.SyntheticEvent): void => {
		e.preventDefault();
		console.log(jurySelection);
		if (jurySelection) {
			selectableJury.removeValue(jurySelection);
			selectedJury.addValue(jurySelection);
		}
	};

	const handleFacultyRemove = (jury: JuryData): void => {
		selectedJury.removeValue(jury);
		selectableJury.addValue(jury);
	};

	const handleDateChange = (date: Date | null) => {
		setSelectedDate(date);
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSelection = (event: React.ChangeEvent<{ value: unknown }>) => {
		console.log(event.target.value);
		let jury: JuryData =
			selectableJury.values[
				selectableJury.values.findIndex((e) => e.jury_id === event.target.value)
			];
		setJurySelection(jury);
	};

	useEffect(() => {
		async function fetchJury() {
			await query
				?.queryID<Jury>("jury")
				.then((data) => {
					setJuryID(data);
				})
				.then(() => {})
				.catch((err) => {
					console.log(err.response);
				});
		}
		fetchJury();
	}, []);

	useEffect(() => {
		async function fetchJury() {
			if (juryID) {
				await query
					?.queryInfo<JuryData>("jury", juryID.jury_members)
					.then((data) => {
						selectableJury.addValues(data);
					})
					.then(() => {})
					.catch((err) => {
						console.log(err.response);
					});
			}
		}
		fetchJury();
	}, [juryID]);

	return (
		<Box className={classes.root}>
			<Card className={classes.innerCard}>
				<Box className={classes.buttonBox}>
					<Box className={classes.memberTitle}>Recommendation</Box>
					<Box>
						<Button variant="contained" className={classes.memberButton} onClick={handleClick}>
							Add Member
						</Button>
						<Menu
							id="selection"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}>
							<div>
								<CustomDialog
									componentName={"Faculty Member"}
									component={MenuItem}
									onClick={handleClose}
									title={"Faculty Members"}
									submit={{ value: "Add Member", handler: handleFacultySubmit }}>
									<FormControl>
										<Box display="flex" justifyContent="center">
											{selectableJury.values.length > 0 ? (
												<Select
													value={jurySelectionID}
													onChange={handleSelection}
													input={<Input />}
													className={classes.selection}>
													{selectableJury.values.map((member, i) => {
														return (
															<MenuItem
																value={member.jury_id}
																key={
																	"select_list_" + member.jury_id
																}>{`${member.name_} ${member.surname}`}</MenuItem>
														);
													})}
												</Select>
											) : null}
										</Box>
									</FormControl>
								</CustomDialog>
							</div>
						</Menu>
					</Box>
				</Box>
				<Divider />
				<UserTable smaller={true}>
					{selectedJury?.values.map((jury) => (
						<TableRow key={"table_row_" + jury.name_}>
							<TableCell>
								<IconButton onClick={() => handleFacultyRemove(jury)}>
									<ClearIcon color="primary" />
								</IconButton>
							</TableCell>
							<TableCell component="th" scope="row" align="right">
								{jury.name_ + " " + jury.surname}
							</TableCell>
						</TableRow>
					))}
				</UserTable>
				<Divider />
				<Box display="flex" justifyContent="right">
					<Button variant="contained" className={classes.submit}>
						Recommend Jury
					</Button>
				</Box>
			</Card>
		</Box>
	);
}
