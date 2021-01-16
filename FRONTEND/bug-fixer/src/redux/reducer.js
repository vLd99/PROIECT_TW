import initialState from "./initialState";
import * as actionTypes from "./actionTypes";

const userReducer = function (state = initialState.user, action) {

    switch (action.type) {
        case actionTypes.RETURN_USER:
            {
                return{
                    
                    user:action.user
                }
            }

           
        default:
           return state
    }


}

export default userReducer;