import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';

export default function Landing() {
  const { user, isLoading } = useContext(UserContext);
  //if user is loading wait/ not just loading 
  //If user directly access the site frontend sends try the get user with cookies
  if(isLoading){
    return <div/>;
  }
  //After user fetch if the user could be fetched redirect to the user page
  if (user) {
    return <Redirect to={`/${user[user.role].user_id}/${user.role}/home`} />;
  }

  //Else redirect to the login page
  return <Redirect to='/login' />;
}
