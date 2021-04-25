import React, { useContext } from 'react';

import { useRouteMatch } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';

import Sidebar from '../Sidebar';
import Content from '../Content';
import Container from '../Container';
import useLogout from '../hooks/useLogout';

export default function User(props) {
  const { user } = useContext(UserContext);
  const { logoutUser } = useLogout(null);
  let { path, url } = useRouteMatch();
  const { selections: Selections, links: Links, contents: Contents } = props;

  return (
    <Container>
      <Sidebar
        username={user.username}
        selections={Selections}
        to={url}
        links={Links}
        key_={'student_sidebar'}
        logoutHandler={logoutUser}
      />
      <Content
        contents={Contents}
        to={path}
        links={Links}
        key_={'student_content'}
      />
    </Container>
  );
}
