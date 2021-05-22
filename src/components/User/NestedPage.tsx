import { Switch, Route } from "react-router-dom";

type props = {
    pages: { link: string, component: React.FC }[]
    to: string
}

export function NestedPage(props: props) {
    const contents = props.pages.map((page: { link: string, component: React.FC }, i: number) => (
        <Route path={props.to + page.link} key={`content_${ i }`} render={() => <page.component />}></Route>
    ));

    return (
        <div>
            <Switch>{contents}</Switch>
        </div>
    );
}