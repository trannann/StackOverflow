import { combineReducers } from 'redux';

import TagsReducer from './tags-reducer';
import PatientsReducer from './patients-reducer';
import TagLocationsReducer from './tagLocations-reducer';
import TagEventsReducer from './tagEvents-reducer';


const urgentApp = combineReducers({
    TagsReducer, PatientsReducer, TagLocationsReducer, TagEventsReducer
});

export default urgentApp;