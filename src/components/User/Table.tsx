import { Card, CardContent, Typography, makeStyles, Divider, Container, Grid, TableContainer, Table, TableBody, Button, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 45,
    },
    table: {
        margin: theme.spacing(0.5),
        minWidth: 650,
    },
    buttons: {
        marginLeft: theme.spacing(0.5)
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
}));

type props = {
    children: any
    title: string
    buttons?: { value: string, handler: Function }[]
}

export function UserTable(props: props) {
    const classes = useStyles();
    return (
        <Card className={classes.root} >
            <Box className={classes.box} left="80%" position="relative">
                {props.buttons?.map((button) =>
                    <Button variant="contained" color="primary">
                        {button.value}
                    </Button>
                )}
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
