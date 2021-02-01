import { createStore } from 'redux';

const initialState = {
    loading : false,
}
const reducer = (state = initialState, action) =>{
   if (action.type === 'loading'){
       return {
           ...state,
           loading: action.value,
       }
   }
    return state
}
const store = createStore(reducer);

export default store;