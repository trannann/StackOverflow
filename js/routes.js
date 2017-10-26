import React from 'react'
import { Route, IndexRoute, Redirect, IndexRedirect, hashHistory } from 'react-router'


import Layout from './components/utils/layout';
import Domu from './pages/domu';
import Patients from './pages/patients';
import Tags from './pages/tags';
import Login from './pages/login';
import RegistratePatients from './pages/modals/RegistratePatient';

const routes = (
    <Route path="/" component={Layout}>
        <IndexRoute component={Patients}/>
        <IndexRedirect to="patients" />
        {/* <Route path="domu" component={Domu}/> */}
        <Route path="login" component={Login}/>
        <Route path="patients" component={Patients}/>
        <Route path="patients/new" component={RegistratePatients}/>
        <Route path="tags" component={Tags}/>
        <Redirect from="*" to="patients" />
    </Route>
);

export default routes;