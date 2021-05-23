import { Typography, Card, CardContent, makeStyles, Button, Box } from "@material-ui/core"
import { TheseData } from "../ThesesData"

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 375,

    },
    title: {
        fontSize: 24,
        marginBottom: 12,
    },
    body: {
        fontSize: 18,
    },
    reject: {
        color: "white",
        fontWeight: 70,
        backgroundColor: "#f44336",
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        '&:hover': {
            backgroundColor: '#f6685e',
        },
    },
    accept: {
        color: "white",
        backgroundColor: "#4caf50 ",
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        '&:hover': {
            backgroundColor: '#6fbf73',
        },
    },
    correction: {
        color: "white",
        backgroundColor: "#ff9100",
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        '&:hover': {
            backgroundColor: '#ffa733',
        },
    },

}));

export function Evaluation() {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Box>
                <CardContent>
                    <TheseData />
                </CardContent>
            </Box>
            <Typography >
                <Box fontWeight={150} marginBottom={3} display="flex" justifyContent="center" alignItems="center">
                    <Button variant="contained" className={classes.accept}> Accept</Button>
                    <Button variant="contained" className={classes.correction}>Correction</Button>
                    <Button variant="contained" className={classes.reject}>Reject</Button>
                </Box>
            </Typography>
        </Card >
    )
}