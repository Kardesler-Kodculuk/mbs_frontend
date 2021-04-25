import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';

import Welcome from '../Welcome';
import User from '../User/User';

export default function Student() {
  const { user } = useContext(UserContext);
  const Selections = [
    'Home',
    'Select Topic',
    'Manage Thesis',
    'Select Advisor',
  ];
  const Contents = [
    <Welcome title={`Welcome, ${user.username}`}>
      <p>
        To start select an action from the navigation panel in the left hand
        side of the screen.
      </p>
      <p>Currently, you have {user.role} privileges.</p>
    </Welcome>,
    'Select Topic',
    'Manage Thesis',
    'Select Advisor',
  ];
  const Links = ['/home', '/thesis-topic', '/manage-thesis', '/select-advisor'];

  return <User selections={Selections} links={Links} contents={Contents} />;
}
