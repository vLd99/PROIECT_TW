import * as actionTypes from './actionTypes';

export const RETURN_USER = function (newUser) {
    return { type: actionTypes.RETURN_USER, user: newUser }
}

export const RETURN_USER2 = function () {
    return { type: actionTypes.RETURN_USER2, user:132 }
}

