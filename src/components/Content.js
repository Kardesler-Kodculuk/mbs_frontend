import React from 'react';

import { Switch, Route } from 'react-router-dom';

export default function Content(props) {
  const { contents: Contents, to: To, links: Links, key_: Key } = props;

  const contents = Contents.map((content, i) => (
    <Route path={To + Links[i]} key={`${Key}_${i}`}>
      <div className='h-80 d-flex justify-content-center align-items-center mt-3 border-lg rounded shadow-flg'>
        {content}
      </div>
      <div className='d-flex justify-content-center align-items-center'>
        <h6 className='p-2 bd'>Group 11 | Project MBS</h6>
      </div >
    </Route>
  ));
  return (
    <div className='col-lg-10 bigger'>
      <Switch>{contents}</Switch>
    </div>
  );
}