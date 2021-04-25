import React from 'react';

export default function Container(props) {
  const { children: Children } = props;
  return (
    <div className=' container px-4 mt-2 border shadow-sm rounded bigger'>
      <div className=' row'>{Children}</div>
    </div>
  );
}
