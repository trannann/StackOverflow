import { findItemById } from '../helpers/helpers-operations';

const patientsInitialState = {
     patients : [],
     selectedPatient: {}
}

const PatientsReducer = (state = patientsInitialState, action) => {
    switch(action.type) {
        case 'TOGGLE_SELECTED_PATIENT':
        
            const toggledPatientId = action.payload;
            
            const index = findItemById(state.patients, toggledPatientId);
            const newPatients = state.patients.slice(0);
            if(index >= 0)
            {
                newPatients[index] = Object.assign(
                    {}, 
                    state.patients[index],
                    { selected: !state.patients[index].selected }
                );
                
                return Object.assign( {}, state, { patients: newPatients });
            }

            return state;
        case 'ADD_PATIENT':
            // return { 
            //     ...state,
            //     patients: [...state.patients, action.payload]
            // }
            // return {
            //     patients: [ ...state.patients, action.payload]
            // }
            return Object.assign({}, state, {patients:[...state.patients,action.payload]})
        case 'FETCH_PATIENTS':
            state.patients = action.payload
            return Object.assign({}, state);
        case 'MODIFY_PATIENT':
            const mappedPatients = state.patients.map((patient)=>{
                if (patient.id === action.payload.id) {
                    
                    return {...patient, ...action.payload};
                }
                
                return patient;
            });
            
            return mappedPatients;
        case 'REMOVE_PATIENT':
            const patientIndex = findItemById(state.patients, action.payload);
           
            const newState = Object.assign([], state);
            const indexOfPatientToDelete = state.patients.findIndex(patient => {
              return patient.id == patientIndex
            })
            newState.splice(indexOfPatientToDelete, 1);
            //browserHistory.push('/patients');
            return newState;
        default:
            return state;
    }
}

export default PatientsReducer;