import React, { useContext } from "react";
import { AuthContext, UserContext } from "@mbs/contexts"
import { Redirect } from "react-router-dom";
import { Container, Grid, TextField, makeStyles, Typography, Button } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useForm } from "@mbs/hooks/useForm"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    margin: theme.spacing(1),
    width: "25ch",
  },
  title: {
    fontSize: 25,
    marginBottom: 75,
  },
  Icon: {
    width: 60,
    height: 60,
  },
}));

export function Login() {
  const userContext = useContext(UserContext)
  const authContext = useContext(AuthContext)
  const classes = useStyles();

  const form = useForm<string>({
    initials: {
      username: "",
      password: "",
    },
  })

  if (userContext?.isLoading) {
    return <div />;
  }
  if (userContext?.user?.username) {
    return <Redirect to={`/${userContext?.user[userContext?.user?.role].user_id}/${userContext?.user?.role}/home`} ></Redirect>
  }

  const handleLogin = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault()
    await authContext?.signIn(form.values["username"], form.values["password"])
  }


  return (
    <Container>
      <form onSubmit={handleLogin}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          style={{ minHeight: "70vh" }}>
          <Typography className={classes.title}>MBS</Typography>
          <AccountCircleIcon className={classes.Icon} />
          <TextField
            className={classes.textField}
            required
            label="email"
            onChange={(e) => form.setValues("username", e.target.value)}
            color="primary"
            error={authContext?.error}
          />
          <TextField
            className={classes.textField}
            required
            label="password"
            type="password"
            onChange={(e) => form.setValues("password", e.target.value)}
            color="primary"
            error={authContext?.error}
          />

          <Button variant="contained" color="primary" type="submit">
            login
					</Button>
        </Grid>
      </form>
    </Container>
  );
}