import { AnyAction } from 'redux';

export interface ICalc {
  holdings: number;
  netCost: number;
  marketValue: number;
  marketValueChange: number;
  profit: number;
}

export interface State {
  myProperty: ICalc;
  openModal: boolean;
}

const Mystate: State = {
  myProperty: {
    holdings: 0,
    netCost: 0,
    marketValue: 0,
    marketValueChange: 0,
    profit: 0,
  },
  openModal: false,
};

// create your reducer
const reducer = (state: State = Mystate, action: AnyAction) => {
  switch (action.type) {
    case 'ADD_VALUE':
      return { ...state, myProperty: action.payload };
    case 'OPEN_MODAL':
      return { ...state, openModal: action.payload };
    case 'CLOSE_MODAL':
      return { ...state, openModal: action.payload };
    default:
      return state;
  }
};

export default reducer;
