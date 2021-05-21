import { Card, CardContent, Typography, makeStyles, Divider, Container, Grid, TableContainer, Table, TableBody, } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 45,
    },
    table: {
        margin: theme.spacing(0.5),
        minWidth: 650,
    },
    title: {
        margin: theme.spacing(1),
        fontSize: 18,
    },
    body: {
        fontSize: 14,
    },
}));

type props = {
    children: any
    title: string
}

export function UserTable(props: props) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
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
                        <TableContainer className={classes.table}>
                            <Table>
                                <TableBody>{props.children}</TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Container>
            </CardContent>
        </Card>
    );
}
