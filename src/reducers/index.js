import { combineReducers } from 'redux'
// import sidebar from './sidebar'
// import comments from './comments'
// import user from './user'

function main (state=null, action) {
    switch(action.type) {
        case 'MAP_SAVED' :
            console.log('Reducer', action.map)
            return action.map;
        default :
            return state;
    }
}

export default combineReducers({
    // sidebar
    main
})