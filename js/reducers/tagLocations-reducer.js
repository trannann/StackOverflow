const tagLocationsInitialState = {
    tagLocations : []
}

const TagLocationsReducer = (state = tagLocationsInitialState, action) => {
    switch(action.type) {
        case 'FETCH_TAGLOCATIONS':
            state.tagLocations = action.payload
            return Object.assign({}, state);
        default:
            return state;
    }
}

export default TagLocationsReducer;