import * as ACTIONS from './actions'
import { combineReducers } from 'redux';

import { initFood } from './constants'

var id = 0

const menuReducer = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.ADD_MENU_FOOD:
      return [
        {
          ...action.payload,
          menuId: id++,
          // 默认 100g
          weight: 100,
        },
        ...state
      ];

    case ACTIONS.DELETE_MENU_FOOD:
      debugger

      return state.filter(item => item.menuId !== action.payload.menuId)

    case ACTIONS.EDIT_MENU_FOOD:
      return state.map(item => {
        if (item.menuId === action.payload.menuId) {
          return action.payload
        }
        return item
      })

    default:
      return state;
  }
}


const foodReducer = (state = initFood, action) => {
  switch (action.type) {
    case ACTIONS.ADD_FOOD:
      return [
        {
          ...action.payload,
          id: state.length,
        },
        ...state,
      ]
    default:
      return state
  }
}

// const cartReducer = () => {}


export default combineReducers({
  menu: menuReducer,
  foods: foodReducer,
  // cartReducer,
});
