import {
	Card,
	CardContent,
	Typography,
	makeStyles,
	Container,
	Grid,
	TableContainer,
	Table,
	TableBody,
	Button,
	Box,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 45,
	},
	root_small: {
		marginTop: 2,
		border: "none",
		boxShadow: "none",
	},
	table: {
		margin: theme.spacing(0.5),
		minWidth: 650,
	},
	table_small: {
		minWidth: 200,
	},
	buttons: {
		marginLeft: theme.spacing(0.5),
	},
	box: {
		display: "flex",
	},
	title: {
		margin: theme.spacing(1),
		fontSize: 18,
		display: "flex",
	},
	body: {
		fontSize: 14,
	},
}))

type props = {
	children: any
	title?: string
	buttons?: JSX.Element[]
	smaller?: true
}

export function UserTable(props: props) {
	const classes = useStyles()
	return (
		<Card className={props.smaller ? classes.root_small : classes.root}>
			<Box className={classes.box} left="80%" position="relative">
				{props.buttons?.map((button, i) => (
					button
				))}
			</Box>
			<CardContent>
				<Typography variant="h3" className={classes.title} color="primary">
					{props.title}
				</Typography>

				<Container>
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="center"
						style={{ minHeight: "1vh", minWidth: "35vh" }}>
						<TableContainer className={props.smaller ? classes.table_small : classes.table}>
							<Table>
								<TableBody>{props.children}</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Container>
			</CardContent>
		</Card>
	)
}
