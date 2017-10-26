import React from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, Table, Modal } from 'react-bootstrap';
import axios from 'axios';

import AssignTag from './modals/assignTag';
import TagInfo from './modals/tagInfo';
import { createTagRegistrationAction, getAllTagLocationsAction, getAllTagsAction ,
    removeTagAction, addPatientAction, openTagInfoAction} from '../actions/actions';
import {url} from '../appConfig';


@connect((store) => {
    return {
        tags: store.TagsReducer.tags,
        patients: store.PatientsReducer.patients,
        tagInfo: store.TagsReducer.tagInfoModal
    }
}) 
export default class Tags extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showModal: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.createTagRegistration = this.createTagRegistration.bind(this);
        this.handleTagAdd = this.handleTagAdd.bind(this);
        this.mergeTagsAndPatients = this.mergeTagsAndPatients.bind(this);
        this.removeTagFromList = this.removeTagFromList.bind(this);
        this.toggleInfoModal = this.toggleInfoModal.bind(this);
    }

    toggleModal() {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    toggleInfoModal(tag) {
        this.props.dispatch(openTagInfoAction(tag));
    }
    
    handleTagAdd(element) {
        this.props.dispatch(addPatientAction(element));
    }

    removeTagFromList(id) {
        this.props.dispatch(removeTagAction(id));
    }

    
    createTagRegistration(tag, patient) {    
        patient.tag = tag;
        patient.tag_Id = tag.id;

        this.handleTagAdd(patient);
    }

    mergeTagsAndPatients() {
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

        return result;
    }

    // TODO nejde close tag info modal 
    render() {
        const mergedTagsAndPatients = this.mergeTagsAndPatients();
        const mappedTags = mergedTagsAndPatients.map(object => {
            return (
                <div className="row" key={object.id}>
                    <div className="col-sm-2" style={{textAlign: 'left'}}>{object.id}</div>
                    <div className="col-sm-3 divTableColumn">{object.name}</div>
                    
                    <div className="col-sm-4 divTableColumn">
                        {   object.patient ? (
                                Object.keys(object.patient).length !== 0 ?
                                ( 
                                    object.patient.middleName ? (           
                                        object.patient.firstName + ' ' + object.patient.middleName + ' ' + object.patient.lastName
                                    )
                                    : ( 
                                        object.patient.firstName + ' ' + object.patient.lastName
                                    )
                                )
                                : (
                                    ''
                                )
                            )
                            : (
                                ''
                            )
                        }
                    </div>
                    
                    <div className="col-sm-3 divTableColumn">
                        <Button 
                            bsSize="small"
                            onClick={() => this.toggleInfoModal(object) }>
                            {this.props.tagInfo != null ? (
                                <TagInfo 
                                    onShow = {this.props.tagInfo != null ? true : false}
                                    onToggle = {this.toggleInfoModal} 
                                    tagId = {object.id}
                                /> ) : (
                                    <span></span>
                                )
                            }
                            <strong>Info</strong>
                        </Button>
                        <Button bsSize="small">
                            <strong>Modify</strong>
                        </Button>
                        <Button bsSize="small">
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
                        Registrované tagy
                    </div>
                    <div className="col-sm-3">
                        <Button bsSize="small" onClick={()=>this.setState({ showModal: true })}>Přiřadit tag</Button>
                        {this.state.showModal ?
                        (<AssignTag 
                            onShow={this.state.showModal} 
                            onToggle={this.toggleModal} 
                            createTagRegistration={this.createTagRegistration}
                        />):
                        (<span></span>)}
                    </div>
                </h2>
                <br></br>
                <br></br>
                <br></br>
                
                <div>
                {
                    this.props.tags.length === 0 || this.props.patients.length === 0 ? ( 
                        <img className = "image" src="src/img/Spinner.svg"></img>
                    ) : (
                        <div>
                            <div className="row">
                                <div className="col-sm-2 divTableHeader" style={{textAlign: 'left'}}><b>#</b></div>
                                <div className="col-sm-3 divTableHeader">Tag</div>
                                <div className="col-sm-4 divTableHeader">Jméno a příjmení</div>
                                <div className="col-sm-3 divTableHeader">Akce</div>
                            </div>
                            <hr></hr>
                            {mappedTags}
                        </div>
                    )
                
                }
                </div>
                <span></span>
            </div>
        )
    }
}