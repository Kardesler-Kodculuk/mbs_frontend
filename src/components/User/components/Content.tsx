import { Switch, Route } from "react-router-dom";

type props = {
    contents: React.FC[]
    links: string[]
    to: string
}

export function Content(props: props) {
    const contents = props.contents.map((Content: React.FC, i: number) => (
        <Route path={props.to + props.links[i]} key={`student_content_${i}`} render={() => <Content />}></Route>
    ));

    return (
        <div>
            <Switch>{contents}</Switch>
        </div>
    );
}