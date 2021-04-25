import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';

import Welcome from '../Welcome';
import User from '../User/User';

export default function Advisor() {
  const { user } = useContext(UserContext);
  const Selections = [
    'Home',
    'Manage Student',
  ];
  const Contents = [
    <Welcome title={`Welcome, ${user.username}`}>
      <p>
        To start select an action from the navigation panel in the left hand
        side of the screen.
      </p>
      <p>Currently, you have {user.role} privileges.</p>
    </Welcome>,
    'Manage Student',
  ];
  const Links = ['/home', '/manage-student'];
  return <User selections={Selections} links={Links} contents={Contents} />;
}
