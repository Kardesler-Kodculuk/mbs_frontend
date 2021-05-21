import { useContext } from "react";
import { Card, CardContent, Typography, makeStyles, Divider } from "@material-ui/core";
import { UserContext } from "@mbs/contexts";


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
    const userContext = useContext(UserContext);
    const classes = useStyles();


    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h3" className={classes.title} color="primary">
                    {`Welcome, ${userContext?.user?.username}`}
                </Typography>
                <Divider />
                <Typography className={classes.body}>
                    {" "}
					To start select an action from the navigation panel in the left hand side of the screen.
					<br />
                    <br />
					Currently, you have {userContext?.user?.role} privileges.
				</Typography>
            </CardContent>
        </Card>
    );
}
