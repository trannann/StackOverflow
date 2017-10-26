import React from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, Image } from 'react-bootstrap';

import AssignTag from './modals/assignTag';
import RegistratePatients from './modals/RegistratePatient';

@connect((store) => {
    return {
        domu: store.DomuReducer
    }
})
export default class Domu extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };
    }
    render() {
        return (
            
           <div className="row">
                 <div className="col-sm-6">
                    <img src="img/floorplan.png" width="550" height="550"/>
                </div> 
                <Button bsSize="small" onClick={()=>this.setState({ showModal: true })}>Přiřadit tag</Button>

                {this.state.showModal ?
                    (<AssignTag/>):
                    (<span></span>)}
                <br></br>
                <Button bsSize="small" onClick={() => hashHistory.push(`/patientsnew`)}>Registrovat pacienta</Button>
            </div>
        )
    }
}