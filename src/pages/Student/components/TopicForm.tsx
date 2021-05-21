import React, { useContext, useEffect, useState } from "react";
import { UserContext, QueryContext, AlertContext } from "@mbs/contexts";
import { useForm } from "@mbs/hooks/useForm"
import { Card, CardContent, Typography, makeStyles, Divider, Container, TextField, Grid, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        margin: theme.spacing(1),
        width: "40ch",
    },
    title: {
        fontSize: 25,
    },
    body: {
        fontSize: 18,
    },
}));

export function TopicForm() {
    const queryContext = useContext(QueryContext)
    const userContext = useContext(UserContext)
    const alertContext = useContext(AlertContext)
    const classes = useStyles()
    const [load, setLoad] = useState(true)
    const form = useForm<string>({
        initials: {
            thesis_topic: "",
        },
    })

    useEffect(() => {
        if (alertContext) {
            alertContext.createAlert("success", "topic_form", "Thesis Topic Has been submitted", "success")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [load])


    const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
        if (alertContext && queryContext && userContext?.user?.student) {
            e.preventDefault()
            await queryContext.updateInfo("students", userContext?.user?.student?.student_id, form.values)
                .then(() => alertContext.openAlert("success", "topic_form"))
                .catch((err) => console.log(err))
            await userContext.getUser()
            setLoad(!load)
        }
    }
    if (!userContext) {
        return <div />
    }

    return (

        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h3" className={classes.title} color="primary">
                    Submit Thesis Topic
					</Typography>
                <Divider />
                <Container>
                    <form onSubmit={handleSubmit}>
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            style={{ minHeight: "20vh", minWidth: "35vh" }}>
                            <TextField
                                className={classes.textField}
                                required
                                label={userContext?.user?.student?.thesis_topic}
                                color="primary"
                                onChange={(e) => form.setValues("thesis_topic", e.target.value)}
                            />
                            <Button variant="contained" color="primary" type="submit">
                                Submit
								</Button>
                        </Grid>
                    </form>
                </Container>
            </CardContent>
        </Card>
    );
}
