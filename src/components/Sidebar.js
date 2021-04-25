import React from 'react';

import { Link } from 'react-router-dom';

export default function Sidebar(props) {
  const {
    selections: Selections,
    to: To,
    links: Links,
    key_: Key,
    username: Username,
    logoutHandler:LogoutHandler
  } = props;
  console.log(To + Links[0]);
  const sidebar = Selections.map((content, i) => (
    <li className='nav-item' key={`${Key}_${i}`}>
      <Link
        className={`nav-link ${i === 0 ? 'active' : ''}`}
        to={To + Links[i]}
      >
        {content}
      </Link>
    </li>
  ));

  return (
    <div
      className='col-lg-2 border-lg-right border-sm-bottom bigger'
      style={{}}
    >
      <div className='h-80'>
        <ul className='nav flex-column nav-fill mt-5 mt-5 '>
          <div className='text-center m-5 '>{Username}</div>
          {sidebar}
        </ul>
      </div>

      <div className='mt-2 d-flex justify-content-center align-items-end'>
        <button type='submit' class='btn btn-primary mb-3' onClick={LogoutHandler}>
          Logout
        </button>
      </div>
    </div>
  );
}
