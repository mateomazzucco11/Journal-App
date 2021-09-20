
/* 
  {
    notes: [],
    active: null,
    active: {
      id:'AJKFNSJAKF123',
      title: '',
      body: '',
      imageUrl: '',
      date: 123123,
    }
  }
*/

import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null
}

export const notesReducer = ( state = initialState, action ) => {
  switch (action.type) {
    
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload
        }
      }

    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload]
      }

    default:
      return state;
  }
}
