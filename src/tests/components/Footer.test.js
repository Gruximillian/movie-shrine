import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../util/helpers';
import Footer from '../../components/Footer';
import movieShrineConfig from '../../config/movieShrine';

describe('Footer component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Footer />);
    });

    test('renders without crashing', () => {
        const component = findByTestAttr(wrapper, 'component-footer');
        expect(component.length).toBe(1);
    });

    test('renders created by paragraph', () => {
        const component = findByTestAttr(wrapper, 'created-by');
        expect(component.length).toBe(1);
    });

    test('renders created by paragraph with the correct text', () => {
        const component = findByTestAttr(wrapper, 'created-by');
        expect(component.text()).toBe('Created by Vojislav Grujić');
    });

    test('renders github link', () => {
        const component = findByTestAttr(wrapper, 'github-link');
        expect(component.length).toBe(1);
    });

    test('renders linkedin link', () => {
        const component = findByTestAttr(wrapper, 'linkedin-link');
        expect(component.length).toBe(1);
    });

    test('renders tmdb link', () => {
        const component = findByTestAttr(wrapper, 'tmdb-link');
        expect(component.length).toBe(1);
    });

    test('renders github link with the correct url', () => {
        const component = findByTestAttr(wrapper, 'github-link');
        const componentByHrefAttr = wrapper.find(`[href="${movieShrineConfig.gitHubLink}"]`);
        expect(component).toEqual(componentByHrefAttr);
    });

    test('renders linkedin link with the correct url', () => {
        const component = findByTestAttr(wrapper, 'linkedin-link');
        const componentByHrefAttr = wrapper.find(`[href="${movieShrineConfig.linkedInLink}"]`);
        expect(component).toEqual(componentByHrefAttr);
    });

    test('renders tmdb link with the correct url', () => {
        const component = findByTestAttr(wrapper, 'tmdb-link');
        const componentByHrefAttr = wrapper.find(`[href="${movieShrineConfig.tmdbLink}"]`);
        expect(component).toEqual(componentByHrefAttr);
    });

    test('renders github icon under the correct link element', () => {
        const component = findByTestAttr(wrapper, 'github-link');
        const icon = findByTestAttr(component, 'icon-github');
        expect(icon.length).toBe(1);
    });

    test('renders linkedin icon under the correct link element', () => {
        const component = findByTestAttr(wrapper, 'linkedin-link');
        const icon = findByTestAttr(component, 'icon-linkedin');
        expect(icon.length).toBe(1);
    });

    test('renders tmdb icon under the correct link element', () => {
        const component = findByTestAttr(wrapper, 'tmdb-link');
        const icon = findByTestAttr(component, 'icon-tmdb');
        expect(icon.length).toBe(1);
    });
});
