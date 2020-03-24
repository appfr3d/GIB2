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
    position: null,
  },
  rating: {
    name: 'God rating',
    active: false,
    priority: 1,
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
    case 'set_position':
      return { ...state, nearby: { ...state.nearby, position: payload } };

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
