import React from 'react';
import { Button, FormControl, Table, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import {modifyPatientAction} from '../../actions/actions';
import { url } from '../../appConfig';

@connect((store) => {
    return {
        patients: store.PatientsReducer.patients
    }
})
export default class DeletedPatients extends React.Component {
    constructor(props)
    {
        super(props);

        this.toggleDeletedPatientsModal = this.toggleDeletedPatientsModal.bind(this);
        this.handleUndeleteButtonClick = this.handleUndeleteButtonClick.bind(this);
    }

    toggleDeletedPatientsModal() {
        this.props.onToggle();
    }

    // TODO: bug workflow - undelete patient, open again modal window, undelete patient, fail
    // need a refresh, this.props.patients is undefined
    handleUndeleteButtonClick(patient) {
        var config = {
            headers: {
                'Accept':'',
                'Content-Type': 'application/json'
            }
        };

        patient.deleted = null;

        axios.put(url + 'patients', patient, config).then(res => 
        {     
            this.props.dispatch(modifyPatientAction(patient));
        })
        .catch( function(error) {
            console.log(JSON.stringify(error, null, 2));
        });

        this.props.onToggle();

        window.location.reload();
    }

    render() {
        const deletedPatients = this.props.patients.filter(patient => {
            return patient.deleted != null;
        });

        const mappedDeletedPatients = deletedPatients.map(patient => {
            return (
                <div className="row" key={patient.id}>
                    {/* <div className="col-sm-1" style={{textAlign: 'left'}}>{patient.id}</div> */}
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
                    <div className="col-sm-2 divTableColumn">{patient.card_Id}</div>
                    <div className="col-sm-2 divTableColumn">{moment(patient.birthDate).format('L').toString()}</div>
                    <div className="col-sm-3 divTableColumn">{patient.socialSecurityNumber}</div>
                    <div className="col-sm-1 divTableColumn">
                        <Button 
                            bsSize="small"   
                            onClick = {() => this.handleUndeleteButtonClick(patient)}
                            >
                            <strong>Undelete</strong>
                        </Button>
                    </div>
                </div>
            )});

        return(
            <Modal className="modal-container" 
                            bsSize="large"
                            show={this.props.onShow}
                            onHide={this.toggleDeletedPatientsModal}>

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Přiřazení tagu</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    
                    <div className="row">
                    {
                        this.props.patients.length > 0 ?
                        (
                            <div>
                                <div className="row">
                                    {/* <div className="col-sm-1 divTableHeader" style={{textAlign: 'left'}}>#</div> */}
                                    <div className="col-sm-1 divTableHeader">Jméno</div>
                                    <div className="col-sm-1 divTableHeader">Prostřední jméno</div>
                                    <div className="col-sm-1 divTableHeader">Příjmení</div>                    
                                    <div className="col-sm-2 divTableHeader">Číslo karty</div>
                                    <div className="col-sm-2 divTableHeader">Datum narození</div>
                                    <div className="col-sm-3 divTableHeader">Rodné číslo</div>
                                    {<div className="col-sm-1 divTableHeader">Akce</div>}
                                </div>
                                <hr></hr>
                                {mappedDeletedPatients}
                            </div>
                        )
                        :
                        (
                            <img className = "image" src="src/img/Spinner.svg"></img>
                        )
                    }
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.toggleDeletedPatientsModal}>Close</Button>
                </Modal.Footer>         
            </Modal> 
        )
    }
}