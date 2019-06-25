import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import { findByTestAttr, storeFactory } from '../util/helpers';
import Header from '../../components/Header';
import movieShrineConfig from '../../config/movieShrine';
import actionTypes from '../../store/actionTypes';

const mockStore = configureMockStore();

describe('Header component', () => {
    const setup = (initialState={}) => {
        const store = storeFactory(initialState);
        return shallow(<Header store={store} resetState={jest.fn()} />).dive();
    };

    describe('render', () => {
        let wrapper;
        beforeEach(() => {
            const initialState = {};
            wrapper = setup(initialState);
        });

        test('renders without crashing', () => {
            const component = findByTestAttr(wrapper, 'component-header');
            expect(component.length).toBe(1);
        });

        test('renders the link to the home page', () => {
            const component = findByTestAttr(wrapper, 'link-home');
            expect(component.length).toBe(1);
        });

        test('renders the link to the home page with the correct "to" prop', () => {
            const component = findByTestAttr(wrapper, 'link-home');
            expect(component.prop('to')).toBe('/');
        });

        test('renders the logo icon', () => {
            const component = findByTestAttr(wrapper, 'icon-logo');
            expect(component.length).toBe(1);
        });

        test('renders the title heading', () => {
            const component = findByTestAttr(wrapper, 'app-title');
            expect(component.length).toBe(1);
        });

        test('renders the correct title text', () => {
            const component = findByTestAttr(wrapper, 'app-title');
            expect(component.text()).toBe(movieShrineConfig.appTitle);
        });

        test('renders the UserSection component', () => {
            const component = findByTestAttr(wrapper, 'component-user-section');
            expect(component.length).toBe(1);
        });
    });
    describe('when clicked on the "Home" link', () => {
        // solution from here (option 2):
        // https://jsramblings.com/2018/01/15/3-ways-to-test-mapStateToProps-and-mapDispatchToProps.html

        let wrapper, store;
        beforeEach(() => {
            const initialState = {};
            store = mockStore(initialState);
            wrapper = shallow(<Header store={store} />).dive();
        });

        test('"RESET_STATE" action should be dispatched', () => {
            const component = findByTestAttr(wrapper, 'link-home');
            component.simulate('click');
            const actions = store.getActions();

            expect(actions).toEqual([ { type: actionTypes.RESET_STATE } ]);
        });
    });
});
