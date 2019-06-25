import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../util/helpers';
import UserBar from '../../components/UserBar';
import movieShrineConfig from '../../config/movieShrine';

describe('UserBar component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<UserBar/>);
    });

    test('renders without crashing', () => {
        const component = findByTestAttr(wrapper, 'component-userbar');
        expect(component.length).toBe(1);
    });

    test('renders "favourites" link', () => {
        const component = findByTestAttr(wrapper, 'link-favourites');
        expect(component.length).toBe(1);
    });

    test('renders "watchlist" link', () => {
        const component = findByTestAttr(wrapper, 'link-watchlist');
        expect(component.length).toBe(1);
    });

    test('renders secondary links wrapper', () => {
        const component = findByTestAttr(wrapper, 'secondary-links');
        expect(component.length).toBe(1);
    });

    test('renders "movies" link', () => {
        const component = findByTestAttr(wrapper, 'link-movies');
        expect(component.length).toBe(1);
    });

    test('renders "tvshows" link', () => {
        const component = findByTestAttr(wrapper, 'link-tvshows');
        expect(component.length).toBe(1);
    });

    test('"favourites" link does not have "Active" class set', () => {
        const component = findByTestAttr(wrapper, 'link-favourites');
        expect(component.hasClass(/Active/)).toBe(false);
    });

    test('"watchlist" link does not have "Active" class set', () => {
        const component = findByTestAttr(wrapper, 'link-watchlist');
        expect(component.hasClass(/Active/)).toBe(false);
    });

    test('secondary links wrapper does not have "Visible" class set', () => {
        const component = findByTestAttr(wrapper, 'secondary-links');
        expect(component.hasClass(/Visible/)).toBe(false);
    });

    test('"favourites" link has correct text set', () => {
        const component = findByTestAttr(wrapper, 'link-favourites');
        expect(component.text()).toBe(movieShrineConfig.userBarLinksText.favourites);
    });

    test('"watchlist" link has correct text set', () => {
        const component = findByTestAttr(wrapper, 'link-watchlist');
        expect(component.text()).toBe(movieShrineConfig.userBarLinksText.watchlist);
    });

    test('"movies" link has the correct "to" prop', () => {
        const component = findByTestAttr(wrapper, 'link-movies');
        // it should end with "null" before clicked on the primary link
        expect(component.prop('to')).toBe('/movies/null');
    });

    test('"tvshows" link has the correct "to" prop', () => {
        const component = findByTestAttr(wrapper, 'link-tvshows');
        // it should end with "null" before clicked on the primary link
        expect(component.prop('to')).toBe('/tvshows/null');
    });
    // don't know how to handle testing the <Link> child component text content

    describe('when clicked on a primary link', () => {
        describe('click on the "favourites" link', () => {
            test('toggles the "Active" class on the link', () => {
                const component = findByTestAttr(wrapper, 'link-favourites');
                component.simulate('click');
                // wrapper.update(); // useless in this case, probably because we're using React hook for state
                const componentActive = findByTestAttr(wrapper, 'link-favourites');
                expect(componentActive.hasClass(/Active/)).toBe(true);

                componentActive.simulate('click');
                // wrapper.update(); // useless in this case, probably because we're using React hook for state
                const componentInactive = findByTestAttr(wrapper, 'link-favourites');
                expect(componentInactive.hasClass(/Active/)).toBe(false);
            });

            test('toggles the "Visible" class on the secondary links wrapper', () => {
                const component = findByTestAttr(wrapper, 'link-favourites');
                component.simulate('click');
                const secondaryLinks = findByTestAttr(wrapper, 'secondary-links');
                expect(secondaryLinks.hasClass(/Visible/)).toBe(true);

                const componentUpdated = findByTestAttr(wrapper, 'link-favourites');
                componentUpdated.simulate('click');
                const secondaryLinksUpdated = findByTestAttr(wrapper, 'secondary-links');
                expect(secondaryLinksUpdated.hasClass(/Visible/)).toBe(false);
            });

            test('"movies" link has the correct "to" prop', () => {
                const favoritesLink = findByTestAttr(wrapper, 'link-favourites');
                favoritesLink.simulate('click');
                const component = findByTestAttr(wrapper, 'link-movies');
                expect(component.prop('to')).toBe('/movies/favorite');
            });

            test('"tvshows" link has the correct "to" prop', () => {
                const favoritesLink = findByTestAttr(wrapper, 'link-favourites');
                favoritesLink.simulate('click');
                const component = findByTestAttr(wrapper, 'link-tvshows');
                expect(component.prop('to')).toBe('/tvshows/favorite');
            });

            describe('then click on "watchlist" link', () => {
                test('removes "Active" class from "favorites" and adds it to "watchlist" link', () => {
                    const favoritesLink = findByTestAttr(wrapper, 'link-favourites');
                    const watchlistLink = findByTestAttr(wrapper, 'link-watchlist');
                    favoritesLink.simulate('click');

                    const favoritesLinkActive = findByTestAttr(wrapper, 'link-favourites');
                    expect(favoritesLinkActive.hasClass(/Active/)).toBe(true);
                    expect(watchlistLink.hasClass(/Active/)).toBe(false);

                    watchlistLink.simulate('click');
                    const favoritesLinkUpdated = findByTestAttr(wrapper, 'link-favourites');
                    const watchlistLinkUpdated = findByTestAttr(wrapper, 'link-watchlist');
                    expect(favoritesLinkUpdated.hasClass(/Active/)).toBe(false);
                    expect(watchlistLinkUpdated.hasClass(/Active/)).toBe(true);
                });

                test('"movies" link has the correct "to" prop', () => {
                    const favoritesLink = findByTestAttr(wrapper, 'link-favourites');
                    const watchlistLink = findByTestAttr(wrapper, 'link-watchlist');
                    favoritesLink.simulate('click');

                    const component = findByTestAttr(wrapper, 'link-movies');
                    expect(component.prop('to')).toBe('/movies/favorite');

                    watchlistLink.simulate('click');
                    const componentUpdated = findByTestAttr(wrapper, 'link-movies');
                    expect(componentUpdated.prop('to')).toBe('/movies/watchlist');
                });

                test('"tvshows" link has the correct "to" prop', () => {
                    const favoritesLink = findByTestAttr(wrapper, 'link-favourites');
                    const watchlistLink = findByTestAttr(wrapper, 'link-watchlist');
                    favoritesLink.simulate('click');

                    const component = findByTestAttr(wrapper, 'link-tvshows');
                    expect(component.prop('to')).toBe('/tvshows/favorite');

                    watchlistLink.simulate('click');
                    const componentUpdated = findByTestAttr(wrapper, 'link-tvshows');
                    expect(componentUpdated.prop('to')).toBe('/tvshows/watchlist');
                });
            });
        });

        describe('click on the "watchlist" link', () => {
            test('toggles the "Active" class on the link', () => {
                const component = findByTestAttr(wrapper, 'link-watchlist');
                component.simulate('click');
                const componentActive = findByTestAttr(wrapper, 'link-watchlist');
                expect(componentActive.hasClass(/Active/)).toBe(true);

                componentActive.simulate('click');
                const componentInactive = findByTestAttr(wrapper, 'link-watchlist');
                expect(componentInactive.hasClass(/Active/)).toBe(false);
            });

            test('toggles the "Visible" class on the secondary links wrapper', () => {
                const component = findByTestAttr(wrapper, 'link-watchlist');
                component.simulate('click');
                const secondaryLinks = findByTestAttr(wrapper, 'secondary-links');
                expect(secondaryLinks.hasClass(/Visible/)).toBe(true);

                const componentUpdated = findByTestAttr(wrapper, 'link-watchlist');
                componentUpdated.simulate('click');
                const secondaryLinksUpdated = findByTestAttr(wrapper, 'secondary-links');
                expect(secondaryLinksUpdated.hasClass(/Visible/)).toBe(false);
            });

            test('"movies" link has the correct "to" prop', () => {
                const watchlistLink = findByTestAttr(wrapper, 'link-watchlist');
                watchlistLink.simulate('click');
                const component = findByTestAttr(wrapper, 'link-movies');
                expect(component.prop('to')).toBe('/movies/watchlist');
            });

            test('"tvshows" link has the correct "to" prop', () => {
                const watchlistLink = findByTestAttr(wrapper, 'link-watchlist');
                watchlistLink.simulate('click');
                const component = findByTestAttr(wrapper, 'link-tvshows');
                expect(component.prop('to')).toBe('/tvshows/watchlist');
            });

            describe('then click on "favourites" link', () => {
                test('removes "Active" class from "watchlist" and adds it to "favorites" link', () => {
                    const favoritesLink = findByTestAttr(wrapper, 'link-favourites');
                    const watchlistLink = findByTestAttr(wrapper, 'link-watchlist');
                    watchlistLink.simulate('click');

                    const watchlistLinkActive = findByTestAttr(wrapper, 'link-watchlist');
                    expect(watchlistLinkActive.hasClass(/Active/)).toBe(true);
                    expect(favoritesLink.hasClass(/Active/)).toBe(false);

                    favoritesLink.simulate('click');
                    const favoritesLinkUpdated = findByTestAttr(wrapper, 'link-favourites');
                    const watchlistLinkUpdated = findByTestAttr(wrapper, 'link-watchlist');
                    expect(favoritesLinkUpdated.hasClass(/Active/)).toBe(true);
                    expect(watchlistLinkUpdated.hasClass(/Active/)).toBe(false);
                });

                test('"movies" link has the correct "to" prop', () => {
                    const favoritesLink = findByTestAttr(wrapper, 'link-favourites');
                    const watchlistLink = findByTestAttr(wrapper, 'link-watchlist');
                    watchlistLink.simulate('click');

                    const component = findByTestAttr(wrapper, 'link-movies');
                    expect(component.prop('to')).toBe('/movies/watchlist');

                    favoritesLink.simulate('click');
                    const componentUpdated = findByTestAttr(wrapper, 'link-movies');
                    expect(componentUpdated.prop('to')).toBe('/movies/favorite');
                });

                test('"tvshows" link has the correct "to" prop', () => {
                    const favoritesLink = findByTestAttr(wrapper, 'link-favourites');
                    const watchlistLink = findByTestAttr(wrapper, 'link-watchlist');
                    watchlistLink.simulate('click');

                    const component = findByTestAttr(wrapper, 'link-tvshows');
                    expect(component.prop('to')).toBe('/tvshows/watchlist');

                    favoritesLink.simulate('click');
                    const componentUpdated = findByTestAttr(wrapper, 'link-tvshows');
                    expect(componentUpdated.prop('to')).toBe('/tvshows/favorite');
                });
            });
        });
    });

    describe('when clicked on a secondary link', () => {
        test('removes the "Active" class from the primary link and removes "Visible" class fromt he secondary links wrapper', () => {
            const primaryLink = findByTestAttr(wrapper, 'link-watchlist');
            primaryLink.simulate('click');

            const primaryLinkUpdated = findByTestAttr(wrapper, 'link-watchlist');
            const secondaryLinksWrapper = findByTestAttr(wrapper, 'secondary-links');
            expect(primaryLinkUpdated.hasClass(/Active/)).toBe(true);
            expect(secondaryLinksWrapper.hasClass(/Visible/)).toBe(true);

            const secondaryLink = findByTestAttr(wrapper, 'link-movies');
            secondaryLink.simulate('click');

            const primaryLinkFinal = findByTestAttr(wrapper, 'link-watchlist');
            const secondaryLinksFinal = findByTestAttr(wrapper, 'secondary-links');
            expect(primaryLinkFinal.hasClass(/Active/)).toBe(false);
            expect(secondaryLinksFinal.hasClass(/Visible/)).toBe(false);
        });
    });
});
