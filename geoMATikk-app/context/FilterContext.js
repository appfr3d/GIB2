import React, { useReducer } from 'react';

export const FilterStateContext = React.createContext();
export const FilterDispatchContext = React.createContext();

const initialFilterState = {
  search: '',
  price: {
    name: 'Pris',
    active: false,
    prefferedValue: 'low',
    priority: 1,
  },
  nearby: {
    name: 'I nærheten',
    active: false,
    priority: 1,
  },
  rating: {
    name: 'God rating',
    active: false,
    priority: 1,
  },
  kitchen: {
    name: 'Type kjøkken',
    active: false,
    kitchens: [],
  },
};

function filterReducer(state, action) {
  const { payload } = action;
  switch (action.type) {
    case 'set_search_string':
      return { ...state, search: action.payload };
    case 'toggle_item':
      return {
        ...state,
        [payload.item]: { ...state[payload.item], active: !state[payload.item].active },
      };
    case 'set_priority':
      return { ...state, [payload.item]: { ...state[payload.item], priority: payload.value } };
    case 'add_kitchen':
      return {
        ...state,
        kitchen: { ...state.kitchen, kitchens: [...state.kitchen.kitchens, payload] },
      };
    default:
      console.warning(action.type);
      return state;
  }
}

export function FilterProvider({ children }) {
  const [filterState, filterDispatch] = useReducer(filterReducer, initialFilterState);
  return (
    <FilterStateContext.Provider value={filterState}>
      <FilterDispatchContext.Provider value={filterDispatch}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterStateContext.Provider>
  );
}
