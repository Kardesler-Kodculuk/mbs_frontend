/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, forwardRef } from "react"
import { useQuery, useAlert, useStudent } from "@mbs/services"
import { JuryData, Jury } from "@mbs/interfaces"
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
	Chip,
} from "@material-ui/core"
import { useForm, useArray } from "@mbs/hooks"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import { UserTable, CustomDialog } from "@mbs/components"
import ClearIcon from "@material-ui/icons/Clear"
import Alert from "@material-ui/lab/Alert"
const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 575,
		margin: theme.spacing(2),
	},
	innerCard: {
		minWidth: 540,
		minHeight: 150,
		margin: theme.spacing(1),
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
}))

type outsideJury = {
	name_: string
	surname: string
	email: string
	institution: string
	phone_number: string
}

function compare(value: JuryData, cmp: JuryData) {
	return value.jury_id === cmp.jury_id
}
function compareOutside(value: outsideJury, cmp: outsideJury) {
	return (
		value.name_ === cmp.name_ &&
		value.surname === cmp.surname &&
		value.email === cmp.email &&
		value.phone_number === cmp.phone_number &&
		value.institution === cmp.institution
	)
}

export function JuryProposal() {
	const form = useForm<string>({
		initials: {
			name_: "",
			surname: "",
			email: "",
			institution: "",
			phone_number: "",
		},
	})

	const classes = useStyles()
	const alert = useAlert()
	const query = useQuery()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [juryID, setJuryID] = useState<Jury | null>(null)
	const [jurySelectionID, setJurySelectionID] = useState<number>(0)
	const selectableJury = useArray<JuryData>({ compare: compare })
	const selectedJury = useArray<JuryData>({ compare: compare })
	const selectedOutsideJury = useArray<outsideJury>({ compare: compareOutside })
	const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
	const student = useStudent()

	const handleOutsideSubmit = (e: React.SyntheticEvent): void => {
		e.preventDefault()
		selectedOutsideJury.addValue({
			name_: form.values["name_"],
			surname: form.values["surname"],
			email: form.values["email"],
			institution: form.values["institution"],
			phone_number: form.values["phone_number"],
		})
		form.reset({
			name_: "",
			surname: "",
			email: "",
			institution: "",
			phone_number: "",
		})
	}

	useEffect(() => {
		form.reset({
			name_: "",
			surname: "",
			email: "",
			institution: "",
			phone_number: "",
		})
	}, [])

	const handleFacultySubmit = (e: React.SyntheticEvent): void => {
		e.preventDefault()
		let jury: JuryData =
			selectableJury.values[selectableJury.values.findIndex((e) => e.jury_id === jurySelectionID)]
		if (jury) {
			selectableJury.removeValue(jury)
			selectedJury.addValue(jury)
		}
	}

	const handleFacultyRemove = (jury: JuryData): void => {
		selectedJury.removeValue(jury)
		selectableJury.addValue(jury)
	}

	const handleDateChange = (date: Date | null) => {
		if (date) {
			date.setHours(0, 0, 0, 0)
			setSelectedDate(date)
		}
	}

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleSelection = (event: React.ChangeEvent<{ value: unknown }>) => {
		console.log(event.target.value)
		setJurySelectionID(event.target.value as number)
	}

	
	const handleRecommendation = () => {
		if (selectedDate) {
			query
				?.postActionWithBody(`dissertation/${student?.student?.student_id}`, {
					jury_members: selectedJury.values.map((e) => e.jury_id),
					new_members: selectedOutsideJury.values,
					dissertation_date: selectedDate?.getTime() / 1000,
				})
				.then((data) => {
					student?.refresh()
					alert?.openAlert("success", "advisor_jury_proposal")
				})
		}
	}

	useEffect(() => {
		if (selectableJury.values.length > 0) {
			setJurySelectionID(selectableJury.values[0].jury_id)
		}
	}, [selectableJury.values])

	useEffect(() => {
		console.log(jurySelectionID)
	}, [jurySelectionID])

	useEffect(() => {
		async function fetchJury() {
			await query
				?.queryID<Jury>("jury")
				.then((data) => {
					setJuryID(data)
				})
				.then(() => {})
				.catch((err) => {
					console.log(err.response)
				})
		}
		fetchJury()
	}, [])

	useEffect(() => {
		async function fetchJury() {
			if (juryID) {
				await query
					?.queryInfo<JuryData>("jury", juryID.jury_members)
					.then((data) => {
						selectedJury.clear()
						selectedOutsideJury.clear()
						data = data.filter((e) => e.jury_id !== student?.advisor?.user_id)
						selectableJury.addValues(data)
						console.log(student?.advisor?.user_id)
					})
					.then(() => {})
					.catch((err) => {
						console.log(err.response)
					})
			}
		}
		fetchJury()
	}, [juryID])
	if (!student?.theses) {
		return <Alert severity="info">Student did not uploaded a thesis</Alert>
	}
	if (student?.student?.has_dissertation) {
		return <Alert severity="info">Proposed Jury and Date</Alert>
	}

	return (
		<Card>
			<Box className={classes.root}>
				<Box>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							disableToolbar
							variant="inline"
							format="MM/dd/yyyy"
							margin="normal"
							id="date-picker-inline"
							label="Dissertation Date"
							value={selectedDate}
							onChange={handleDateChange}
						/>
					</MuiPickersUtilsProvider>
				</Box>
				<Card className={classes.innerCard}>
					<Box className={classes.buttonBox}>
						<Box className={classes.memberTitle}>
							Members
							<Chip
								label={`${1 + selectedJury.values.length + selectedOutsideJury.values.length}/5`}
							/>
						</Box>
						<Box>
							{selectedJury.values.length + selectedOutsideJury.values.length < 4 ? (
								<Button variant="contained" className={classes.memberButton} onClick={handleClick}>
									Add Member
								</Button>
							) : null}

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
															)
														})}
													</Select>
												) : null}
											</Box>
										</FormControl>
									</CustomDialog>
									<CustomDialog
										component={MenuItem}
										componentName={"Out-Faculty Member"}
										onClick={handleClose}
										title={"Out-Faculty Member Details"}
										submit={{ value: "Add Member", handler: handleOutsideSubmit }}>
										<FormControl>
											<TextField
												autoFocus
												margin="dense"
												required
												label="Name"
												onChange={(e) => {
													form.setValues("name_", e.target.value)
												}}
												value={form.values["name_"]}
												fullWidth
											/>
											<TextField
												margin="dense"
												label="Surname"
												required
												onChange={(e) => form.setValues("surname", e.target.value)}
												value={form.values["surname"]}
												fullWidth
											/>
											<TextField
												margin="dense"
												label="Email"
												type="email"
												required
												onChange={(e) => form.setValues("email", e.target.value)}
												value={form.values["email"]}
												fullWidth
											/>
											<TextField
												margin="dense"
												label="Institution"
												required
												onChange={(e) => form.setValues("institution", e.target.value)}
												value={form.values["institution"]}
												fullWidth
											/>
											<TextField
												margin="dense"
												label="Phone Number"
												required
												onChange={(e) => form.setValues("phone_number", e.target.value)}
												value={form.values["phone_number"]}
												fullWidth
											/>
										</FormControl>
									</CustomDialog>
								</div>
							</Menu>
						</Box>
					</Box>
					<Divider />
					<UserTable smaller={true}>
						<TableRow key={"table_row_advisor_selected"}>
							<TableCell></TableCell>
							<TableCell component="th" scope="row" align="right">
								{student?.advisor?.name_ + " " + student?.advisor?.surname}
							</TableCell>
						</TableRow>
						{selectedJury?.values.map((jury) => (
							<TableRow key={"table_row_selected_inside_" + jury.jury_id}>
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

						{selectedOutsideJury?.values.map((jury, i) => (
							<TableRow key={"table_row_outside_" + jury.name_ + jury.surname + "_" + i}>
								<TableCell>
									<IconButton onClick={() => selectedOutsideJury.removeValue(jury)}>
										<ClearIcon color="primary" />
									</IconButton>
								</TableCell>
								<TableCell component="th" scope="row" align="right">
									{jury.name_ + " " + jury.surname}
								</TableCell>
							</TableRow>
						))}
					</UserTable>
				</Card>
				<Box display="flex" justifyContent="right">
					{selectedJury.values.length + selectedOutsideJury.values.length < 4 ? (
						<Button variant="contained" className={classes.submit} disabled>
							Recommend Jury
						</Button>
					) : (
						<Button variant="contained" className={classes.submit} onClick={handleRecommendation}>
							Recommend Jury
						</Button>
					)}
				</Box>
			</Box>
		</Card>
	)
}
