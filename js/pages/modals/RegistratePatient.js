import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl, Form, Table } from 'react-bootstrap';
import {browserHistory} from 'react-router';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import {url, WEEKDAYS_LONG, WEEKDAYS_SHORT, MONTHS} from '../../appConfig'
import {setActiveTagAction, addPatientAction} from '../../actions/actions'

@connect((store) => {
    return {
        tags: store.TagsReducer.tags,
        tagEvents: store.TagEventsReducer.tagEvents,
        activeTag: store.TagsReducer.activeTag,
        patients: store.PatientsReducer.patients,
    }
})
export default class RegistratePatient extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            showTag: false,
            cardId: "",
            firstName: "",
            middleName: "",
            lastName: "",
            socialSecurityNumber: "",
            birthdate: "",
            tag: {},
            startDate: moment(),
            endDate: moment()
          };
        
        this.mergeTagsAndPatients = this.mergeTagsAndPatients.bind(this);
        this.handleTagSelectionClick = this.handleTagSelectionClick.bind(this);

        this.handlecardIdChange = this.handlecardIdChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleMiddleNameChange = this.handleMiddleNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleSocialSecurityNumber = this.handleSocialSecurityNumber.bind(this);
        this.handleBirthdate = this.handleBirthdate.bind(this);

        this.handleAddPatientClick = this.handleAddPatientClick.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
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

    handleChangeStart(date) {
        this.setState({
          startDate: date
        });
      }

      handleChangeEnd(date) {
        this.setState({
          endDate: date
        });
      }
    
    handleTagSelectionClick(tag) {
        this.props.dispatch(setActiveTagAction(tag));
    }

    handleAddPatientClick(patient) {
        // TODO: cant add new patient
        // seems like this.props.patients is empty so patients.js will fail
        /// const deletedPatients = this.props.patients.filter(patient => {
        //     return patient.deleted != null;
        // });
        
        var config = {
            headers: {
                'Accept':'',
                'Content-Type': 'application/json'
            }
        };

        patient.tag_id = patient.tag.id;
        
        axios.post(url + 'patients', patient, config).then(res => 
        {   
            debugger;  
            this.props.dispatch(addPatientAction(patient));
        })
        .catch( function(error) {
            console.log(JSON.stringify(error, null, 2));
        });

        
        browserHistory.push('/patients');
    }

    handlecardIdChange (event) {
        this.setState({ cardId: event.target.value });
    }

    handleMiddleNameChange (event) {
        this.setState({ middleName: event.target.value });
    }

    handleFirstNameChange (event) {
        this.setState({ firstName: event.target.value });
    }

    handleLastNameChange (event) {
        this.setState({ lastName: event.target.value });
    }

    handleSocialSecurityNumber (event) {
        this.setState({ socialSecurityNumber: event.target.value });
    }

    handleBirthdate (event) {
        this.setState({ birthdate: event.target.value });
    }

    render() {
        
        const mappedTagEvents = 
        this.props.tagEvents.filter(tagEvent => {
            return tagEvent.tag.name === this.props.activeTag.name
        }).map(tagEvent => {
            return (
                <div className="col-sm-12" key={tagEvent.id}>
                    <div className="col-sm-1">{tagEvent.id}</div>
                    <div className="col-sm-4">{moment(tagEvent.created).format('hh:mm:ss DD.MM.YYYY').toString()}</div>
                    <div className="col-sm-4">{tagEvent.tagEventType.name}</div>
                    <div className="col-sm-3">
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
        
        const mergedTagsAndPatients = this.mergeTagsAndPatients();
        const filteredMergedTagsAndPatients = mergedTagsAndPatients.filter(object => {
            return object.patient == null
        });

        const mappedTagButtons = filteredMergedTagsAndPatients.map(tag => {
            return (
                <div key={ tag.id }>
                    <Button onClick={() => this.handleTagSelectionClick(tag)}>
                        { tag.name }
                    </Button>    
                </div>
            )
        })

        let tag = null;
        if (this.props.activeTag.name) {
            this.state.tag = this.props.activeTag;
            tag = (
            
            <Form inline>
                <h1>Události tagu</h1>
                <br></br>
                <DatePicker
                    selected={this.state.startDate}
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeStart}
                    dateFormat="DD/MM/YYYY"
                    locale="cs"
                />

                <DatePicker
                    selected={this.state.startDate}
                    selectsEnd
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onChange={this.handleChangeEnd}
                    dateFormat="DD/MM/YYYY"
                    locale="cs"
                />

                <br></br>
                <h1>{this.props.activeTag.name}</h1>
                <br></br>
                
                <div className="col-sm-1">#</div> {/* bsClass={styles.divTableHeader} */}
                <div className="col-sm-4">Start</div>                  
                <div className="col-sm-4">Status</div>
                <div className="col-sm-3">Akce</div>

                {mappedTagEvents}
            </Form>
            );
        }

        return (
            <div className='row' style={{border:'1px solid black'}}>
                <div className="col-sm-3" style={{border:'1px 1px 0px 0px solid black'}}>
                    
                    <b>Registrace nového pacienta</b>
                     <form>
                        <FormGroup>
                            <ControlLabel>Číslo karty</ControlLabel>
                            <FormControl
                                id="cardId"
                                type="text"
                                value={this.state.cardId}
                                onChange={this.handlecardIdChange}
                            />
                            <ControlLabel>Křestní jméno</ControlLabel>
                            <FormControl
                                id="firstName"
                                type="text"
                                value={this.state.firstName}
                                onChange={this.handleFirstNameChange}
                            />
                            <ControlLabel>Prostřední jméno</ControlLabel>
                            <FormControl
                                id="middleName"
                                type="text"
                                value={this.state.middleName}
                                onChange={this.handleMiddleNameChange}
                            />
                            <ControlLabel>Příjmení</ControlLabel>
                            <FormControl
                                id="lastName"
                                type="text"
                                value={this.state.lastName}
                                onChange={this.handleLastNameChange}
                            />
                            <ControlLabel>Rodné číslo</ControlLabel>
                            <FormControl
                                id="socialSecurityNumber"
                                type="text"
                                value={this.state.socialSecurityNumber}
                                onChange={this.handleSocialSecurityNumber}
                            />
                            <ControlLabel>Datum narození</ControlLabel>
                            <FormControl
                                id="birthdate"
                                type="text"
                                value={this.state.birthdate}
                                onChange={this.handleBirthdate}
                            />
                        </FormGroup>
                    </form>

                    <Button bsStyle="primary" onClick = {() => this.handleAddPatientClick(this.state)}>Přidat</Button>
                    <Button>Zrušit</Button>
                </div>
                <div className="col-sm-9" style={{border:'1px solid black'}}>
                    <div >
                        <b>Přiřadit volné tagy</b>
                        {mappedTagButtons}
                    </div>
                    <div>
                        {tag}
                    </div>
                </div>
                
            </div>
        )
    }
}

