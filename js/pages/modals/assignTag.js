import React from 'react';
import { Button, FormControl, Table, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

import { url } from '../../appConfig';
import {selectPatientAction, setActiveTagAction, selectTagAction, modifyPatientAction} from '../../actions/actions'

@connect((store) => {
    return {
        tags: store.TagsReducer.tags,
        patients: store.PatientsReducer.patients
    }
})
export default class AssignTag extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleTagClick = this.handleTagClick.bind(this);
        this.handlePatientClick = this.handlePatientClick.bind(this);
        this.getBackgroundColor = this.getBackgroundColor.bind(this);
        
        this.toggleModal = this.toggleModal.bind(this);
        this.createTagRegistration = this.createTagRegistration.bind(this);
        this.mergeTagsAndPatients = this.filterTags.bind(this);
    }

    handleTagClick(element) {
        
        this.props.dispatch(selectTagAction(element));
    }

    handlePatientClick(element) {
       
        this.props.dispatch(selectPatientAction(element));
    }

    getBackgroundColor(selected) {
        return selected ? '#ebedef' : '';
    }

    toggleModal() {
        this.props.onToggle();
    }

    filterTags() {
        
        const result =  this.props.tags.map(tag => {
            const pat =  this.props.patients.filter(patient => {
                if(patient.tag !== null) 
                return patient.tag.id === tag.id
            });

            if(pat[0]) {
                tag.patient = pat[0];
            }

            return tag;
        });

        var a = result.filter(res => {
            if(res.patient == null)
            {
                return res;
            }
        });

        return a;
    }

    createTagRegistration() {
        
        const arr = this.props.patients.filter((item) => {
            return item.selected;
        })
        const brr = this.props.tags.filter((item) => {
            return item.selected;
        })

        const object = {
            "tag_Id" : brr[0].id,
            "patient_Id" : arr[0].id,
            "tag" : brr[0],
            "patient" : arr[0]
        }

        var config = {
            headers: {
                'Accept':'',
                'Content-Type': 'application/json'
            }
        };
        
        axios.post(url + 'tagRegistrations', object, config).then(res => 
        {     
            var config = {
                headers: {
                    'User-Agent':'',
                    'Accept':'',
                    'Host':'',
                    'Content-Type': 'application/json'
                }
            };
    
            res.data.patient.tag_Id = res.data.tag_Id;

            axios.put(url + 'patients', res.data.patient, config).then(res => 
            {     
                //debugger;
                window.location.reload();
                // TODO: do the refresh
            })
            .catch( function(error) {
                console.log(JSON.stringify(error, null, 2));
            });
        })
        .catch( function(error) {
            console.log(JSON.stringify(error, null, 2));
        });

        this.toggleModal();
        
    }

    render() {
        const tags = this.filterTags();
        console.log(tags);
        const mappedTags = tags.map(tag => {
            return (
                <div className="col-sm-12" key={tag.id} onClick={() => this.handleTagClick(tag.id)}
                    style={{background: this.getBackgroundColor(tag.selected)}}>
                    <span>{tag.name}</span>
                </div>
            )
        })
        
        const mappedPacients = this.props.patients.filter( patient => {
            if(patient.deleted === null && patient.tag === null) {
                return patient;
            }
        }).
        map(patient => {
            return(
                <div className="col-sm-12" key={patient.id} onClick={() => this.handlePatientClick(patient.id)} 
                    style={{background: this.getBackgroundColor(patient.selected)}}>
                <span>{patient.middleName.trim().length == 0 ? patient.firstName + ' ' + patient.lastName 
                        : patient.firstName + ' ' + patient.middleName + ' ' + patient.lastName}</span>
            </div>
            )
        })

        return(
            <Modal className="modal-container" 
                            bsSize="large"
                            show={this.props.onShow}
                            onHide={this.toggleModal}>

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Přiřazení tagu</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="col-sm-12">
                        <div className="col-sm-6">
                            {mappedTags}
                        </div>
                        <div className="col-sm-6">
                            {mappedPacients}
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.toggleModal}>Close</Button>
                    <Button bsStyle="primary" onClick={this.createTagRegistration}>Přidat</Button>
                </Modal.Footer>         
            </Modal> 
        )
    }
}