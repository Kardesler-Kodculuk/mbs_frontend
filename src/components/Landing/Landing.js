import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';

export default function Landing() {
  const { user, isLoading } = useContext(UserContext);

  if(isLoading){
    return <div/>;
  }

  if (user) {
    return <Redirect to={`/${user[user.role].user_id}/${user.role}/home`} />;
  }

  return <Redirect to='/login' />;
}
