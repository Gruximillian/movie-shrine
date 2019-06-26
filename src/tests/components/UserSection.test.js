import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import { findByTestAttr, storeFactory } from '../util/helpers';
import UserSection from '../../components/UserSection';
import movieShrineConfig from '../../config/movieShrine';
import actionTypes from '../../store/actionTypes';

const mockStore = configureMockStore();

describe('UserSection component', () => {
    const setup = (initialState = { loggedIn: false }) => {
        const store = storeFactory(initialState);
        return shallow(<UserSection store={store} />).dive();
    };

    let wrapper;
    beforeEach(() => {
        wrapper = setup().dive();
    });

    test('renders without crashing', () => {
        const component = findByTestAttr(wrapper, 'component-user-section');
        expect(component.length).toBe(1);
    });

    describe('when the user is not logged in', () => {
        test('renders the login icon container', () => {
            const component = findByTestAttr(wrapper, 'login-icon-container');
            expect(component.length).toBe(1);
        });

        test('renders the login icon', () => {
            const component = findByTestAttr(wrapper, 'icon-key');
            expect(component.length).toBe(1);
        });

        describe('when clicked on the login icon container', () => {
            // solution from here (option 2):
            // https://jsramblings.com/2018/01/15/3-ways-to-test-mapStateToProps-and-mapDispatchToProps.html

            let wrapper, store;
            beforeEach(() => {
                const initialState = { loggedIn: false };
                store = mockStore(initialState);
                wrapper = shallow(<UserSection store={store} />).dive().dive();
            });

            test('trigger SET_SHOW_BACKDROP and SET_SHOW_LOGIN_MODAL actions', () => {
                const component = findByTestAttr(wrapper, 'login-icon-container');
                component.simulate('click');
                const dispatchedActions = store.getActions();

                expect(dispatchedActions).toEqual([
                    { type: actionTypes.SET_SHOW_BACKDROP, show: true },
                    { type: actionTypes.SET_SHOW_LOGIN_MODAL, show: true },
                ]);
            });
        });
    });

    describe('when the user is logged in', () => {
        const gravatarHash = '029jfo9j4pwom4fo23fm';
        const initialState = {
            loggedIn: true,
            userDetails: {
                avatar: {
                    gravatar: {
                        hash: gravatarHash
                    }
                }
            }
        };

        beforeEach(() => {
            wrapper = setup(initialState).dive();
        });

        test('does not render the login icon container', () => {
            const component = findByTestAttr(wrapper, 'login-icon-container');
            expect(component.length).toBe(0);
        });

        test('renders the user avatar container', () => {
            const component = findByTestAttr(wrapper, 'user-avatar-container');
            expect(component.length).toBe(1);
        });

        test('renders the user gravatar icon with the correct src attribute', () => {
            const component = findByTestAttr(wrapper, 'user-gravatar');
            expect(component.length).toBe(1);
            expect(component.props().src).toBe(`${movieShrineConfig.gravatarBaseUrl}${gravatarHash}`);
        });

        test('renders the user gravatar icon without the "scale-in" class', () => {
            const component = findByTestAttr(wrapper, 'user-gravatar');
            expect(component.hasClass(/scale-in/)).toBe(false);
        });

        test('renders the logout popup', () => {
            const component = findByTestAttr(wrapper, 'logout-popup');
            expect(component.length).toBe(1);
        });

        test('renders the close icon container', () => {
            const component = findByTestAttr(wrapper, 'close-icon-container');
            expect(component.length).toBe(1);
        });

        test('renders the close icon', () => {
            const component = findByTestAttr(wrapper, 'icon-close');
            expect(component.length).toBe(1);
        });

        test('renders the logout message with the correct text', () => {
            const component = findByTestAttr(wrapper, 'logout-message');
            expect(component.length).toBe(1);
            expect(component.text()).toBe(movieShrineConfig.logoutMessage);
        });

        test('renders the logout button', () => {
            const component = findByTestAttr(wrapper, 'logout-button');
            expect(component.length).toBe(1);
            expect(component.text()).toBe(movieShrineConfig.logoutButtonText);
        });

        describe('when clicked on the user gravatar icon', () => {
            test('toggle "scale-in" logout popup class', () => {
                let gravatar = findByTestAttr(wrapper, 'user-gravatar');
                gravatar.simulate('click');
                let logoutPoput = findByTestAttr(wrapper, 'logout-popup');
                expect(logoutPoput.hasClass(/scale-in/)).toBe(true);

                gravatar = findByTestAttr(wrapper, 'user-gravatar');
                gravatar.simulate('click');
                logoutPoput = findByTestAttr(wrapper, 'logout-popup');
                expect(logoutPoput.hasClass(/scale-in/)).toBe(false);
            });

            describe('and clicked on the close icon on the popup', () => {
                test('remove "scale-in" logout popup class', () => {
                    const gravatar = findByTestAttr(wrapper, 'user-gravatar');
                    gravatar.simulate('click');
                    let logoutPoput = findByTestAttr(wrapper, 'logout-popup');
                    expect(logoutPoput.hasClass(/scale-in/)).toBe(true);

                    const closeButton = findByTestAttr(wrapper, 'close-icon-container');
                    closeButton.simulate('click');
                    logoutPoput = findByTestAttr(wrapper, 'logout-popup');
                    expect(logoutPoput.hasClass(/scale-in/)).toBe(false);
                });
            });

            describe('and clicked on the logout button', () => {
                // solution from here (option 2):
                // https://jsramblings.com/2018/01/15/3-ways-to-test-mapStateToProps-and-mapDispatchToProps.html

                let wrapper, store;
                beforeEach(() => {
                    store = mockStore(initialState);
                    wrapper = shallow(<UserSection store={store} />).dive().dive();
                    const gravatar = findByTestAttr(wrapper, 'user-gravatar');
                    gravatar.simulate('click');
                });

                test('initiate SET_USER_DETAILS and SET_LOGGED_IN actions', () => {
                    const logoutPoput = findByTestAttr(wrapper, 'logout-popup');
                    expect(logoutPoput.hasClass(/scale-in/)).toBe(true);
                    const logoutButton = findByTestAttr(wrapper, 'logout-button');
                    logoutButton.simulate('click');

                    const dispatchedActions = store.getActions();

                    expect(dispatchedActions).toEqual([
                        { type: actionTypes.SET_USER_DETAILS, details: {} },
                        { type: actionTypes.SET_LOGGED_IN, loggedIn: false }
                    ]);
                });

                test('call the "removeItem" method of "localStorage" with the "movieShrineSession" as parameter', () => {
                    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'removeItem');
                    const logoutButton = findByTestAttr(wrapper, 'logout-button');
                    logoutButton.simulate('click');

                    expect(localStorage.removeItem).toBeCalledWith('movieShrineSession');
                });
            });
        });
    });
});
