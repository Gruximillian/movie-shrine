import { createStore } from 'redux';

import reducer from '../../store/reducer';

/**
 * Create a testing store with imported reducers, middleware and initial state.
 * globals: reducer
 * @function storeFactory
 * @param {object} initialState - Initial store state.
 * @returns {Store} - Redux store.
 */
export const storeFactory = (initialState) => {
  return createStore(reducer, initialState);
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test attribute value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value od data-test attribute for search.
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};
