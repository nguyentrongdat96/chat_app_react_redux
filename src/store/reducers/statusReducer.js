import actionTypes from '../actions/actionTypes';

const initialState={
    status:'Disconnected'
}

function statusReducer(state=initialState,action){
    let reduced;
    switch(action.type){
        case actionTypes.STATUS_CHANGE:
            reduced=Object.assign({},state,{
               status:String(action.status) 
            });
            break;
        default:
            reduced=state;
    }
    return reduced;
}

export default statusReducer;