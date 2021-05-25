import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Tabs, Tab, AppBar, Typography, Box, Toolbar, Breadcrumbs, Link, Container } from '@material-ui/core';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    breadcrumbs: {
        marginRight: theme.spacing(30),
    },
    tabs: {
        flexGrow: 1,
    },
    appBar: {
        flexGrow: 1,
        top: 60,
        left: 200
    },
    panel: {
        marginTop: 10,
        padding: theme.spacing(3),
        margin: theme.spacing(3),
        top: theme.spacing(18),
        left: theme.spacing(30)
    },
}));

type props = {
    pages: { name: string, content: Function }[]
    current: string
    goBack?: { name: string, link: string }
}

export function ComponentTabs(props: props) {
    const history = useHistory()
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    if (!props.goBack) {
        return <div />
    }
    return (
        <Container>
            <div className={classes.root}>
                <AppBar position="fixed" className={classes.appBar} color="default" >
                    <Toolbar>
                        <Box className={classes.tabs}>
                            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                                {props.pages.map((component, i) => <Tab label={component.name} key={i + "_tab_key_manage_students"} />)}
                            </Tabs>
                        </Box>
                        <div className={classes.breadcrumbs}>
                            <Breadcrumbs>
                                <Link href="#" color="textPrimary" onClick={(e: React.SyntheticEvent) => { e.preventDefault(); history.goBack() }}>
                                    {props.goBack?.name}
                                </Link>
                                <Typography color="textPrimary" noWrap>{props.current}</Typography>
                            </Breadcrumbs>
                        </div>
                    </Toolbar>
                </AppBar>

                <Box className={classes.panel} position="absolute">
                    {props.pages.map((component, i) =>
                        <TabPanel value={value} index={i} key={i + "_tab_key_manage_students_content"} >
                            <component.content />
                        </TabPanel>
                    )}
                </Box>
            </div>


        </Container>
    );
}