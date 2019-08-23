
import actionTypes from '../../actions/actionTypes';

const initialState={
    status:false,
    port:1336
}

function socketReducer(state=initialState,action){
    let reduced;
    switch(action.type){
        case actionTypes.CONNECT_SOCKET:
            reduced=Object.assign({},state,{
               status:String(action.status) 
            });
            break;
        default:
            reduced=state;
    }
    return reduced;
}

export default socketReducer;