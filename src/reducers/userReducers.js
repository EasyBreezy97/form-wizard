import * as actionTypes from "../actions/userActions";

const initialState = {
  userInfo: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INSERT_INFO:
      return {
        ...state,
        userInfo: [...state.userInfo, action.payload],
      };
    case actionTypes.DELETE_ITEM:
      return {
        ...state,
        userInfo: state.userInfo.filter((info) => info.id !== action.payload),
      };

    case actionTypes.INSERT_THING:
      let updatedState = [...state.userInfo];
      let currentObject = updatedState.find(
        (element) => element.id === action.payload.id,
      );
      if(currentObject)
      Object.assign(currentObject, action.payload);

      return {
        ...state,
        userInfo: [...state.userInfo],
      };

    case actionTypes.EDIT_ITEM:return{
      ...state,
      userInfo:[...state.userInfo]
    }

    default:
      return state;
  }
}

export default userReducer;
