import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import { findByTestAttr, storeFactory } from '../util/helpers';
import SearchForm from '../../components/SearchForm';
import movieShrineConfig from '../../config/movieShrine';
import actionTypes from '../../store/actionTypes';

const mockStore = configureMockStore();

describe('SearchForm component', () => {
    const setup = (initialState={}) => {
        const store = storeFactory(initialState);
        return shallow(<SearchForm store={store} />).dive();
    };

    describe('render', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup();
        });

        test('renders without crashing', () => {
            const component = findByTestAttr(wrapper, 'component-search-form');
            expect(component.length).toBe(1);
        });

        test('renders the input field', () => {
            const component = findByTestAttr(wrapper, 'input-field');
            expect(component.length).toBe(1);
        });

        test('renders the input label', () => {
            const component = findByTestAttr(wrapper, 'input-label');
            expect(component.length).toBe(1);
        });

        test('renders the submit button', () => {
            const component = findByTestAttr(wrapper, 'submit-button');
            expect(component.length).toBe(1);
        });

        test('renders the input field with no text', () => {
            const component = findByTestAttr(wrapper, 'input-field');
            expect(component.props().value).toBe('');
        });

        test('renders the input label with the correct text', () => {
            const component = findByTestAttr(wrapper, 'input-label');
            expect(component.text()).toBe(movieShrineConfig.searchLabelText);
        });
    });

    describe('when clicked on the submit button', () => {
        // solution from here (option 2):
        // https://jsramblings.com/2018/01/15/3-ways-to-test-mapStateToProps-and-mapDispatchToProps.html

        let wrapper, store;
        beforeEach(() => {
            const initialState = {};
            store = mockStore(initialState);
            wrapper = shallow(<SearchForm store={store} />).dive();
        });

        describe('if search field is empty', () => {
            test('do not trigger any action and prevent default action', () => {
                const preventDefault = jest.fn();
                const form = findByTestAttr(wrapper, 'component-search-form');
                form.simulate('submit', { preventDefault });
                const dispatchedActions = store.getActions();

                expect(preventDefault).toBeCalled();
                expect(dispatchedActions).toEqual([]);
            });
        });

        describe('if search field is not empty', () => {
            let inputField;
            const searchTerm = ' The moviee  ';
            beforeEach(() => {
                inputField = findByTestAttr(wrapper, 'input-field');
                inputField.simulate('change', { target: { value: searchTerm } });
                inputField = findByTestAttr(wrapper, 'input-field');
            });

            test('trigger "SET_SEARCH_HAS_RESULTS", "SET_QUERY_TERM" and "INITIATE_SEARCH" actions', () => {
                const preventDefault = jest.fn();
                const form = findByTestAttr(wrapper, 'component-search-form');
                form.simulate('submit', { preventDefault });
                const dispatchedActions = store.getActions();

                expect(dispatchedActions).toEqual([
                    {
                        type: actionTypes.SET_SEARCH_HAS_RESULTS,
                        hasResults: true
                    },
                    {
                        type: actionTypes.SET_QUERY_TERM,
                        term: encodeURIComponent(searchTerm.trim())
                    },
                    {
                        type: actionTypes.INITIATE_SEARCH,
                        page: 1,
                        queryString: encodeURIComponent(searchTerm.trim())
                    }
                ]);
            });
        });
    });
});
