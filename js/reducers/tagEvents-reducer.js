const tagEventsInitialState = {
    tagEvents : []
}

const TagEventsReducer = (state = tagEventsInitialState, action) => {
    switch(action.type) {
        case 'FETCH_TAGEVENTS':
            state.tagEvents = action.payload
            return Object.assign({}, state);
        default:
            return state;
    }
}

export default TagEventsReducer;