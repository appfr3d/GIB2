import React, { useReducer, useContext } from 'react';

const defaultFilterState = {
  search: '',
  filter: {
    price: {
      name: 'Pris',
      active: false,
      prefferedValue: 'low',
      weight: 2,
    },
    nearby: {
      name: 'I nærheten',
      active: false,
      weight: 2,
      position: null,
    },
    rating: {
      name: 'God rating',
      active: false,
      weight: 2,
    },
    kitchens: [],
  },
};

function filterReducer(state, action) {
  const { payload } = action;
  const { filter } = state;
  switch (action.type) {
    case 'set_search_string':
      return { ...state, mode: 'search', search: action.payload };
    case 'toggle_item':
      return {
        ...state,
        filter: {
          ...filter,
          [payload.item]: { ...filter[payload.item], active: !filter[payload.item].active },
        },
      };
    case 'set_weight':
      return {
        ...state,
        filter: { ...filter, [payload.item]: { ...filter[payload.item], weight: payload.value } },
      };
    case 'toggle_kitchen':
      if (filter.kitchens.includes(payload)) {
        // Remove kitchen
        const index = filter.kitchens.indexOf(payload);
        const newArray = filter.kitchens;
        newArray.splice(index, 1);
        return {
          ...state,
          filter: { ...filter, kitchens: newArray },
        };
      }
      return {
        ...state,
        filter: { ...filter, kitchens: [...filter.kitchens, payload] },
      };
    case 'set_position':
      return {
        ...state,
        filter: { ...filter, nearby: { ...filter.nearby, position: payload } },
      };
    case 'set_mode':
      return {
        ...state,
        mode: payload,
      };
    case 'set_prefferedPrice':
      return {
        ...state,
        filter: { ...filter, price: { ...filter.price, prefferedValue: payload } },
      };

    default:
      console.warning(action.type);
      return state;
  }
}

const FilterStateContext = React.createContext();
const FilterDispatchContext = React.createContext();

export function FilterProvider({ children }) {
  const [filterState, filterDispatch] = useReducer(filterReducer, defaultFilterState);
  return (
    <FilterStateContext.Provider value={filterState}>
      <FilterDispatchContext.Provider value={filterDispatch}>
        {children}
      </FilterDispatchContext.Provider>
    </FilterStateContext.Provider>
  );
}

export const useFilterDispatch = () => {
  return useContext(FilterDispatchContext);
};

export const useFilterState = () => {
  return useContext(FilterStateContext);
};
