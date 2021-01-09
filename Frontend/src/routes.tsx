import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Project1 from './pages/Project1';
import Menu from './pages/MenuPage';
import DataPost from './pages/DataPost';


function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Menu} />
                <Route path="/projeto" exact component={Project1} />
                <Route path="/data-post" exact component={DataPost} />
                <Route path="/data-update/:id" exact component={DataPost} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;