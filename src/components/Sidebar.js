import React from "react";

import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  MenuItem,
  Divider,
  Toolbar,
  makeStyles,
} from "@material-ui/core";

const drawerWidth = 200;

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
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();

  const { selections: Selections, to: To, links: Links, key_: Key } = props;
  console.log(To + Links[0]);
  const sidebar = Selections.map((content, i) => (
    <div>
      <MenuItem>
        <ListItem>
          <ListItemText
            className={classes.item}
            primary={
              <Link
                className={`nav-link ${i === 0 ? "active" : ""}`}
                to={To + Links[i]}
              >
                {content}
              </Link>
            }
          />
        </ListItem>
      </MenuItem>
      <Divider />
    </div>
  ));

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="persistent"
        anchor="left"
        open={true}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Divider />
          <List dense className={classes.list}>
            {sidebar}
          </List>
        </div>
      </Drawer>
    </div>
  );
}
