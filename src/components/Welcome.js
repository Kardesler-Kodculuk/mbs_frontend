import React from "react";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Divider,
} from "@material-ui/core";

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

export default function Welcome(props) {
  const { children: Children, title: Title } = props;
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h3" className={classes.title} color="primary">
          {Title}
        </Typography>
        <Divider />
        <Typography variant="p" className={classes.cody}>{Children}</Typography>
      </CardContent>
    </Card>
  );
}
