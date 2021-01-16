import * as actionTypes from './actionTypes';

export const RETURN_USER = function (newUser) {
    return { type: actionTypes.RETURN_USER, user: newUser }
}


