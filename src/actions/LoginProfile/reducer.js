import { SET_GLOBAL_VARIABLE } from './actions';

const initialState = {
  user: [],
 };
 
 const globalVariablesReducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_GLOBAL_VARIABLE:
        return {
          ...state,
          [action.payload.variableName]: action.payload.variableValue,
        };
      case 'REMOVE_USER':
        return {
          ...state,
          user: 0
        };
     default:
       return state;
  }
 };
 
 export default globalVariablesReducer;