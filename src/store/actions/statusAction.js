import actionTypes from './actionTypes'

export const statusChanged=(status)=>{
    return {
        type:actionTypes.STATUS_CHANGE,
        status:status
    }
}

