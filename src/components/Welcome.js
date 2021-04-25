import React from 'react';

export default function Welcome(props) {
  const { children: Children, title: Title } = props;
  return ( 
    <div className='card m-5 ' style={{width:'18rem'}}>
      <h5 className='card-header'>{Title}</h5>
      <div className='card-body'>
        <div className='card-text'>{Children}</div>
      </div>
    </div>
  );
}
