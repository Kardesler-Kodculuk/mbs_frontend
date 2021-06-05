/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useQuery, useStudent } from "@mbs/services"
import { AdvisorData, Advisors } from "@mbs/interfaces"
import {
	MenuItem,
	Card,
	makeStyles,
	Box,
	Divider,
	Select,
	Input,
	Button,
	FormControl,
	TableRow,
	TableCell,
	IconButton,
	Chip,
} from "@material-ui/core"
import { useForm, useArray } from "@mbs/hooks"
import { UserTable, CustomDialog } from "@mbs/components"
import ClearIcon from "@material-ui/icons/Clear"
import Alert from "@material-ui/lab/Alert"

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
}))

type outsideJury = {
	name_: string
	surname: string
	email: string
	institution: string
	phone_number: string
}

function compare(value: AdvisorData, cmp: AdvisorData) {
	return value.user_id === cmp.user_id
}
function compareOutside(value: outsideJury, cmp: outsideJury) {
	return value.name_ === cmp.name_ && value.surname === cmp.surname
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
	})

	const classes = useStyles()
	const student = useStudent()
	const query = useQuery()
	const [advisorID, setAdvisorID] = useState<Advisors | null>(null)
	const [advisorSelectionID, setAdvisorSelectionID] = useState<number>(0)
	const selectableAdvisor = useArray<AdvisorData>({ compare: compare })
	const selectedAdvisor = useArray<AdvisorData>({ compare: compare })

	const handleFacultySubmit = (e: React.SyntheticEvent): void => {
		e.preventDefault()
		let advisor: AdvisorData =
			selectableAdvisor.values[
				selectableAdvisor.values.findIndex((e) => e.user_id === advisorSelectionID)
			]
		if (advisor) {
			selectableAdvisor.removeValue(advisor)
			selectedAdvisor.addValue(advisor)
		}
	}

	const handleFacultyRemove = (advisor: AdvisorData): void => {
		selectedAdvisor.removeValue(advisor)
		selectableAdvisor.addValue(advisor)
	}

	const handleSelection = (event: React.ChangeEvent<{ value: unknown }>) => {
		setAdvisorSelectionID(event.target.value as number)
	}

	const handleRecommendation = async () => {
		const res = selectedAdvisor.values.map((e) =>
			query?.postActionWithBody(`recommendations/${student?.student?.student_id}`, {
				advisor_id: e.user_id,
			})
		)
		await Promise.all(res)
		student?.refresh()
	}

	useEffect(() => {
		async function fetchJury() {
			await query
				?.queryID<Advisors>("advisors")
				.then((data) => {
					setAdvisorID(data)
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
			if (advisorID) {
				await query
					?.queryInfo<AdvisorData>("advisors", advisorID.advisors)
					.then((data) => {
						selectableAdvisor.addValues(data)
					})
					.then(() => {})
					.catch((err) => {
						console.log(err.response)
					})
			}
		}
		fetchJury()
	}, [advisorID])

	useEffect(() => {
		if (selectableAdvisor.values.length > 0) {
			setAdvisorSelectionID(selectableAdvisor.values[0].user_id)
		}
	}, [selectableAdvisor.values])

	if (student?.student?.is_advisors_recommended) {
		return <Alert severity="info">Student received recommendation</Alert>
	}

	return (
		<Box className={classes.root}>
			<Card className={classes.innerCard}>
				<Box className={classes.buttonBox}>
					<Box className={classes.memberTitle}>
						Recommendation
						<Chip label={`${selectedAdvisor.values.length}/1?`} />
					</Box>
					<Box>
						<CustomDialog
							componentName={"Add Member"}
							component={Button}
							componentClassName={classes.memberButton}
							title={"Add Member"}
							submit={{ value: "Add Member", handler: handleFacultySubmit }}>
							<FormControl>
								<Box display="flex" justifyContent="center">
									{selectableAdvisor.values.length > 0 ? (
										<Select
											value={advisorSelectionID}
											onChange={handleSelection}
											input={<Input />}
											className={classes.selection}>
											{selectableAdvisor.values.map((member, i) => {
												return (
													<MenuItem
														value={member.user_id}
														key={
															"select_list_" + member.user_id
														}>{`${member.name_} ${member.surname}`}</MenuItem>
												)
											})}
										</Select>
									) : null}
								</Box>
							</FormControl>
						</CustomDialog>
					</Box>
				</Box>
				<Divider />
				<UserTable smaller={true}>
					{selectedAdvisor?.values.map((jury) => (
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
				{selectedAdvisor.values.length < 1 ? (
					<Button variant="contained" className={classes.submit} disabled>
						Recommend Advisor
					</Button>
				) : (
					<Button variant="contained" className={classes.submit} onClick={handleRecommendation}>
						Recommend Advisor
					</Button>
				)}
			</Card>
		</Box>
	)
}
