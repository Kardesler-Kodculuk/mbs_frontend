import { Link } from "react-router-dom";
import {
    List,
    Drawer,
    ListItem,
    Divider,
    Toolbar,
    makeStyles,
    Typography,
    ListItemText,
} from "@material-ui/core";

const drawerWidth: number = 220;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: "auto",
    },
    item: {
        flexGrow: 1,
        flexShrink: 1,
    },
    listItemText: {
        fontSize: "0.7em", //Insert your required size
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

type props = {
    selections: string[]
    links: string[]
    to: string
}


export function Sidebar(props: props) {
    const classes = useStyles();

    const sidebar = props.selections.map((content: string, i: number) => (
        <div key={"sidebar_selection_" + i}>
            <ListItem className={classes.item} button component={Link} to={props.to + props.links[i]} key={`student_sidebar_${i}`}>
                <ListItemText
                    className={classes.listItemText}
                    primary={
                        <Typography variant="h6" component="h2">
                            {content}
                        </Typography>
                    }></ListItemText>
            </ListItem>
            <Divider />
        </div>
    ))

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
                variant="persistent"
                anchor="left"
                open={true}>
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <Divider />
                    <List dense>
                        {sidebar}
                    </List>
                </div>
            </Drawer>
        </div>
    )

}