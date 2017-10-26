import React from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, Table, Modal } from 'react-bootstrap';
import {browserHistory} from 'react-router';
import axios from 'axios';
import moment from 'moment';

import { url } from '../appConfig';
import { deletePatientAction, modifyPatientAction, getAllPatientsAction } from '../actions/actions';
import DeletedPatients from './modals/deletedPatients';
import {map} from '../mappers/mapper';

@connect((store) => {
    return {
        patients: store.PatientsReducer.patients,
    }
})
export default class Patients extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showPatientInfoModal: false,
            showDeletedPatientsModal: false
        };
        
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleDeletedPatientsModal = this.toggleDeletedPatientsModal.bind(this);
        this.handleRegistratePatientClick = this.handleRegistratePatientClick.bind(this);
        this.deletePatient = this.deletePatient.bind(this);
    }

    toggleModal() {
        this.setState({
            showPatientInfoModal: !this.state.showPatientInfoModal
        });
    }

    toggleDeletedPatientsModal() {
        this.setState({
            showDeletedPatientsModal: !this.state.showDeletedPatientsModal
        });
    }

    handleRegistratePatientClick() {
        browserHistory.push('/patients/new');
    };

    // TODO: nezavola se rerender
    deletePatient(patientId) {
        var config = {
            headers: {
                'Accept':''
            }
        };

        axios.delete(url + 'patients/' + patientId, config).then((res) => 
        {      
            debugger;
            this.props.dispatch(deletePatientAction(patientId));
        })
        .catch( function(error) {
            console.log(JSON.stringify(error, null, 2));
        });    

        window.location.reload();
    }

    modifyPatient(patient) {

        var config = {
            headers: {
                'User-Agent':'',
                'Accept':'',
                'Host':'',
                'Content-Type': 'application/json'
            }
        };

        axios.put(url + 'patients', patient, config).then(res => 
        {     
            this.props.dispatch(modifyPatientAction(patient));
        })
        .catch( function(error) {
            console.log(JSON.stringify(error, null, 2));
        });
    }

    render() {
        this.props.patients === null ? (
            axios.get(url + 'patients').then(res => 
            {      
                this.store.dispatch(getAllPatientsAction(map(res.data)));
            })
            .catch( function(error) {
                console.log(JSON.stringify(error, null, 2));
            })
        ) : ( 
            <span></span>
        )
      
        
        const deletedPatients = this.props.patients.filter(patient => {
            return patient.deleted != null;
        });

        const mappedPatients = this.props.patients.filter(patient => {
            if(patient.deleted === null) 
            return patient;
        }).map(patient => {
            return (
                <div className="row" key={patient.id}>
                    <div className="col-sm-1" style={{textAlign: 'left'}}>{patient.id}</div>
                    <div className="col-sm-1 divTableColumn"> {
                        patient.firstName.length > 10 ? 
                        (
                            patient.firstName.substring(0,10)  + '...' 
                            ) 
                        : (
                            patient.firstName
                        )}
                    </div>
                    <div className="col-sm-1 divTableColumn"> {
                        patient.middleName.length > 10 ? 
                        (
                            patient.middleName.substring(0,10)  + '...' 
                            ) 
                        : (
                            patient.middleName
                        )}
                    </div>
                    <div className="col-sm-1 divTableColumn"> {
                        patient.lastName.length > 10 ? 
                        (
                            patient.lastName.substring(0,10)  + '...' 
                            ) 
                        : (
                            patient.lastName
                        )}
                    </div>
                    <div className="col-sm-1 divTableColumn">{patient.card_Id}</div>
                    <div className="col-sm-1 divTableColumn">{moment(patient.birthDate).format('L').toString()}</div>
                    <div className="col-sm-2 divTableColumn">{patient.socialSecurityNumber}</div>
                    <div className="col-sm-1 divTableColumn">{patient.tag ? patient.tag.name : ''}</div>
                    <div className="col-sm-3 divTableColumn">
                        <Button 
                            bsSize="small"   
                            onClick = {() => this.modifyPatient(patient)}>
                            <strong>Modify</strong>
                        </Button>
                        <Button 
                            bsSize="small"
                            onClick={() => this.deletePatient(patient.id)}>
                            <strong>Delete</strong>
                        </Button>
                    </div>
                </div>
            )
        })

        return (
            <div className="row">
                <h2>
                    <div className="col-sm-3">
                        Aktivní pacienti    
                    </div>
                    <div className="col-sm-3">
                        <Button 
                            bsSize="small" 
                            onClick={this.handleRegistratePatientClick}>
                            Registrovat pacienta
                        </Button>
                    </div>
                    <div className="col-sm-3">
                    {
                        deletedPatients.length > 0 ? 
                                ( 
                                <Button 
                                    bsSize="small" 
                                    onClick={()=>this.setState({ showDeletedPatientsModal: true })}>
                                Smazaní pacienti
                                </Button>
                            ) : (
                                <Button 
                                    bsSize="small"
                                    disabled 
                                    onClick={()=>this.setState({ showDeletedPatientsModal: true })}>
                                    Smazaní pacienti
                                </Button>
                            )
                    }
                    {
                        this.state.showDeletedPatientsModal ?
                        (
                            <DeletedPatients 
                                    onShow={this.state.showDeletedPatientsModal} 
                                    onToggle={this.toggleDeletedPatientsModal} />
                        ) : (
                            <span></span>
                        )
                    }
                    
                    </div>
                </h2>
                <br></br>
                <br></br>
                <br></br>
                {
                    this.props.patients.length > 0 ?
                    (
                        <div>
                            <div className="row">
                                <div className="col-sm-1 divTableHeader" style={{textAlign: 'left'}}>#</div>
                                <div className="col-sm-1 divTableHeader">Jméno</div>
                                <div className="col-sm-1 divTableHeader">Prostřední jméno</div>
                                <div className="col-sm-1 divTableHeader">Příjmení</div>                    
                                <div className="col-sm-1 divTableHeader">Číslo karty</div>
                                <div className="col-sm-1 divTableHeader">Datum narození</div>
                                <div className="col-sm-2 divTableHeader">Rodné číslo</div>
                                <div className="col-sm-1 divTableHeader">Tag</div>
                                <div className="col-sm-3 divTableHeader">Akce</div>
                            </div>
                            <hr></hr>
                            {mappedPatients}
                        </div>
                    )
                    :
                    (
                        <img className = "image" src="src/img/Spinner.svg"></img>
                    )
                }
            </div>
        )
    
    }
}