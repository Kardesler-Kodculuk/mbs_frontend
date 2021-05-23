import { Typography, Card, CardContent, makeStyles, Button, Box } from "@material-ui/core"
import { TheseData } from "@mbs/components"
import { useStudent } from "@mbs/services"

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
    button: {
        color: "white",
        backgroundColor: "#ff9100",
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        '&:hover': {
            backgroundColor: '#ffa733',
        },
    },

}));

export function These() {
    const classes = useStyles()
    const student = useStudent()
    const data = [{ name: "Copy Submission Status", status: (student?.student?.is_thesis_sent ? "SENT" : "UNSENT") }]
    return (
        <Card className={classes.root}>
            <Box>
                <CardContent>
                    <TheseData data={data} />

                </CardContent>
            </Box>
            <Typography >
                <Box fontWeight={150} marginBottom={3} display="flex" justifyContent="center" alignItems="center" >
                    <Button variant="contained" className={classes.button}> Update Topic</Button>
                    <Button variant="contained" className={classes.button}>Submit Copy</Button>
                </Box>
            </Typography>
        </Card >

    )
}