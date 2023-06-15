import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import Mobiles from './Mobiles';
import AddMobile from './AddMobile';
import DeleteMobile from './DeleteMobile';

export default class MainComponent extends Component {

    render() {
        return (
            <>
                <div className="container-fluid">
                    <NavBar />
                    <Switch>

                        <Route path='/mobiles/brand/:brand' component={Mobiles} />

                        <Route path='/mobiles/ram/:ram' component={Mobiles} />

                        <Route path='/mobiles/rom/:rom' component={Mobiles} />

                        <Route path='/mobiles/os/:os' component={Mobiles} />

                        <Route path='/mobiles/:name/delete' component={DeleteMobile} />

                        <Route path='/mobiles/add' component={AddMobile} />

                        <Route path='/mobiles/:name/edit' component={AddMobile} />

                        <Route path='/mobiles' component={Mobiles} />

                        <Redirect from="/" to='/mobiles' />

                    </Switch>

                </div>
            </>

        )
    }
}

