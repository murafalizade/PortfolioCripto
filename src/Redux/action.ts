import { ICalc } from './reducer';
export const updateProperty = (property: ICalc) => {
  return {
    type: 'ADD_VALUE',
    payload: property,
  };
};

export const openModal = () => {
  return {
    type: 'OPEN_MODAL',
    payload: true,
  };
};

export const closeModal = () => {
  return {
    type: 'CLOSE_MODAL',
    payload: false,
  };
};
