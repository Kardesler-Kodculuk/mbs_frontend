import { useContext } from "react";
import { Card, CardContent, Typography, makeStyles, Divider } from "@material-ui/core";
import { useUser } from "@mbs/services"


const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 24,
        marginBottom: 12,
    },
    body: {
        fontSize: 18,
    },
});

export function Welcome() {
    const user = useUser()
    const classes = useStyles()


    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h3" className={classes.title} color="primary">
                    {`Welcome, ${user?.user?.username}`}
                </Typography>
                <Divider />
                <Typography className={classes.body}>
                    {" "}
					To start select an action from the navigation panel in the left hand side of the screen.
					<br />
                    <br />
					Currently, you have {user?.user?.role} privileges.
				</Typography>
            </CardContent>
        </Card>
    );
}
