import React from "react";

import { Switch, Route } from "react-router-dom";

export default function Content(props) {
  const { contents: Contents, to: To, links: Links, key_: Key } = props;

  const contents = Contents.map((content, i) => (
    <Route path={To + Links[i]} key={`${Key}_${i}`}>
      <div>{content}</div>
    </Route>
  ));
  return (
    <div>
      <Switch>{contents}</Switch>
    </div>
  );
}
