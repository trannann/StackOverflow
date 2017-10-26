import React from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import axios from 'axios';

import routes from '../../routes';
import urgentApp from '../../reducers/index';
import {getAllPatientsAction, getAllTagLocationsAction,
    getAllTagsAction, getAllTagEventsAction } from '../../actions/actions'
import {url} from '../../appConfig';
import {map} from '../../mappers/mapper';

export default class AppRoutes extends React.Component {
    constructor() {
        super();
        this.store = createStore(urgentApp);
    }

    componentWillMount() {
        axios.get(url + 'patients').then(res => 
        {      
            this.store.dispatch(getAllPatientsAction(map(res.data)));
        })
        .catch( function(error) {
            console.log(JSON.stringify(error, null, 2));
        });

        axios.get(url + 'tagregistrations').then(res => 
        {      
            this.store.dispatch(getAllTagLocationsAction(res.data));  
        })
        .catch( function(error) {
            console.log(JSON.stringify(error, null, 2));
        });

        axios.get(url + 'tags').then(res => 
        {      
            this.store.dispatch(getAllTagsAction(map(res.data)));  
        })
        .catch( function(error) {
            console.log(JSON.stringify(error, null, 2));
        });
    
        axios.get(url + 'tagEvents').then(res => 
        {    
            this.store.dispatch(getAllTagEventsAction(res.data));  
        })
        .catch( function(error) {
            console.log(JSON.stringify(error, null, 2));
        });
    }

            
    render() {
        return (
            <Provider store={this.store}>
                <Router history={browserHistory} routes={routes} onUpdate={() => window.scrollTo(0, 0)}/>
            </Provider>
        );
    }
}