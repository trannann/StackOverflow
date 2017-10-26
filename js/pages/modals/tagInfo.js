import React from 'react';
import { Button, FormControl, Table, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import axios from 'axios';

import {} from '../../actions/actions'

//TODO nefunguje info modal
@connect((store) => {
    return {
        tags: store.TagsReducer.tags,
        tagEvents: store.TagEventsReducer.tagEvents,
        tagInfo: store.TagsReducer.tagInfoModal
    }
})
export default class TagInfo extends React.Component {
    constructor(props) {
        super(props);

        this.toggleInfoModal = this.toggleInfoModal.bind(this);
        
        // TODO ??
        console.log(this.props.tagId);
    }

    toggleInfoModal() {
        this.props.onToggle();
    }

    // TODO dojebat tam komponenty
    render() {   
        return(
            <Modal className="modal-container" 
                            bsSize="large"
                            show={this.props.onShow}
                            onHide={this.toggleInfoModal}>

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">Tag Events</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.toggleInfoModal}>Close</Button>
                </Modal.Footer>         
            </Modal> 
        )
    }
}