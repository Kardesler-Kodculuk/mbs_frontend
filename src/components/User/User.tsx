import React, { useContext } from "react";
import { Container, AppBar, Toolbar, makeStyles, CssBaseline, Typography, IconButton, Grid } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import { useRouteMatch } from "react-router-dom";
import { UserContext, AuthContext, AlertContext } from "@mbs/contexts"
import { Sidebar, Content } from "./components"


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        flexGrow: 1,
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        margin: theme.spacing(3),
    },
    logout: {
        marginRight: theme.spacing(2),
    },
}));

type props = {
    selections: string[]
    links: string[]
    contents: React.FC[]
}

export function User(props: props) {
    const classes = useStyles();
    const userContext = useContext(UserContext)
    const authContext = useContext(AuthContext)
    const alertContext = useContext(AlertContext)
    let { path, url } = useRouteMatch()


    const handleLogout = async (e: React.SyntheticEvent): Promise<void> => {
        e.preventDefault()
        await authContext?.signOut()
    }
    if (!alertContext?.createAlert) {
        return <div />
    }

    return (
        <Container>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer">
                            <AccountCircleIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            MBS
							</Typography>
                        <div className={classes.logout}>
                            <IconButton color="inherit" onClick={handleLogout}>
                                <ExitToAppOutlinedIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {userContext === null ? (
                    <div></div>
                ) : (
                    <Sidebar
                        selections={props.selections}
                        to={url}
                        links={props.links}
                    />
                )}
                <main className={classes.content}>
                    <Grid container justify="center" alignItems="center" style={{ minHeight: "60vh" }}>
                        <Content contents={props.contents} to={path} links={props.links} />
                    </Grid>
                </main>
            </div>
            {alertContext?.PageAlert ? alertContext?.PageAlert() : null}
        </Container>
    );
}