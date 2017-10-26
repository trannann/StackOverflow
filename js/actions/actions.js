

export function openTagInfoAction(payload) {
    return {
        type: 'OPEN_TAG_INFO',
        payload
    };
}

export function modifyPatientAction(payload) {
    return {
        type: 'MODIFY_PATIENT',
        payload
    };
}

export function deletePatientAction(payload) {
    return {
        type: 'REMOVE_PATIENT',
        payload
    };
}

export function removeTagAction(payload) {
    return {
        type: 'REMOVE_TAG',
        payload
    };
}

export function setActiveTagAction(payload) {
    return {
        type: 'SET_ACTIVE_TAG',
        payload
    };
}

export function getAllTagEventsAction(payload) {
    return {
        type: 'FETCH_TAGEVENTS',
        payload
    };
}

export function getAllTagsAction(payload) {
    return {
        type: 'FETCH_TAGS',
        payload
    };
}

export function getAllTagLocationsAction(payload) {
    return {
        type: 'FETCH_TAGLOCATIONS',
        payload
    };
}

export function getAllPatientsAction(payload) {
    return {
        type: 'FETCH_PATIENTS',
        payload
    };
}

export function addPatientAction(payload) {
    return {
        type: 'ADD_PATIENT',
        payload
    }
}

export function addTagAction(payload) {
    return {
        type: 'ADD_SELECTED_TAG',
        payload
    }
}

export function selectTagAction(payload) {
    return {
        type: 'TOGGLE_SELECTED_TAG',
        payload
    }
}

export function selectPatientAction(payload) {
    return {
        type: 'TOGGLE_SELECTED_PATIENT',
        payload
    }
}

export function showModal() {
    return {
      type: 'SHOW_MODAL',
    }
  }
   
  export function hideModal() {
    return {
      type: 'HIDE_MODAL'
    }
  }

  