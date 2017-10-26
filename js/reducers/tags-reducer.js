import { findItemById } from '../helpers/helpers-operations';

const tagsInitialState = {
    tags: [],
    activeTag: {},
    tagInfoModal: {}
}

const TagsReducer = (state = tagsInitialState, action) => {
    
    switch(action.type) {
        case 'TOGGLE_SELECTED_TAG':
            
            const toggledTagId = action.payload;
            const index = findItemById(state.tags, toggledTagId);
            const newTags = state.tags.slice(0);
            //let newTags;
            if(index >= 0)
            {
                newTags[index] = Object.assign(
                    {},
                    state.tags[index],
                    { selected: !state.tags[index].selected }
                  );
                //state.tags = newTags;   This line essentially mutates the state
                return Object.assign( {}, state, { tags: newTags });
            }

            return state;
        case 'ADD_SELECTED_TAG':
            const newTagsa = state.tags.map(a => Object.assign({}, a));
            
            const tag = action.payload;
            newTagsa.push(tag);
            // state.tags.push(tag);
            //return Object.assign({}, state);
            return newTagsa;
        case 'FETCH_TAGS':
            state.tags = action.payload
            return Object.assign({}, state);
        case 'SET_ACTIVE_TAG':
            return Object.assign({}, state, {activeTag: action.payload});
        case 'REMOVE_TAG':
            const tagIndex = findItemById(state.tags, action.payload);
            if(tagIndex >= 0)
            {
                state.tags.splice(tagIndex, 1)
                return Object.assign({}, state);
            }
        case 'OPEN_TAG_INFO':
            return Object.assign({}, state, {tagInfoModal: action.payload});
        default:
            return state;
    }
}

export default TagsReducer;