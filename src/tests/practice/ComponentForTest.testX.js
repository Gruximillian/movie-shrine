import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from '../util/helpers';
import ComponentForTest from './ComponentForTest';

/**
 * Factory function to create a ShallowWrapper for the ComponentForTest component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param {object} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
const setup = (props={}, state=null) => {
    const wrapper = shallow(<ComponentForTest {...props} />);
    if (state) wrapper.setState(state);
    return wrapper;
};

test('renders without crashing', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-component-for-test');
    expect(component.length).toBe(1);
});

test('renders the title', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'title');
    expect(component.length).toBe(1);
});

test('renders the title with the default text if not props are passed', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'title');
    expect(component.text()).toContain('test');
});

test('renders the title with the text that are passed through props', () => {
    const testTitle = 'A new title for testing';
    const wrapper = setup({ title: testTitle });
    const component = findByTestAttr(wrapper, 'title');
    expect(component.text()).toBe(testTitle);
});

test('renders increment button', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'increment-button');
    expect(component.length).toBe(1);
});

test('renders counter display', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'counter-display');
    expect(component.length).toBe(1);
});

test('counter starts at 0', () => {
    // it is not possible to manipulate state of React hook with Enzyme
    // therefore, we can only check if the component rendered what it should
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'counter-display');
    expect(component.text()).toContain('0');
});

test('does not render the error message', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'error-message');
    expect(component.length).toBe(0);
});

test('clicking the increment button, increments the counter display', () => {
    // it is not possible to manipulate state of React hook with Enzyme
    // therefore, we can only check if the component rendered what it should
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click');
    wrapper.update();
    const component = findByTestAttr(wrapper, 'counter-display');
    expect(component.text()).toContain('1');

    // interestingly, we cannot reuse already queried elements
    // we need to query them again to get the proper result
    const buttonAgain = findByTestAttr(wrapper, 'increment-button');
    buttonAgain.simulate('click');
    wrapper.update();
    const componentAgain = findByTestAttr(wrapper, 'counter-display');
    expect(componentAgain.text()).toContain('2');
});


test('clicking the decrement button, decrements the counter display', () => {
    // since it is not possible to set the initial state (useState hook) in Enzyme
    // we will walk up to the higher counter value here
    const wrapper = setup();
    const incrementButton1 = findByTestAttr(wrapper, 'increment-button');
    incrementButton1.simulate('click');
    wrapper.update();
    const component1 = findByTestAttr(wrapper, 'counter-display');
    expect(component1.text()).toContain('1');

    // now again
    const incrementButton2 = findByTestAttr(wrapper, 'increment-button');
    incrementButton2.simulate('click');
    wrapper.update();
    const component2 = findByTestAttr(wrapper, 'counter-display');
    expect(component2.text()).toContain('2');

    // now the real thing
    const decrementButton1 = findByTestAttr(wrapper, 'decrement-button');
    decrementButton1.simulate('click');
    wrapper.update();
    const component3 = findByTestAttr(wrapper, 'counter-display');
    expect(component3.text()).toContain('1');

    // this is horrible, I kind of wish I used class based components
    const decrementButton2 = findByTestAttr(wrapper, 'decrement-button');
    decrementButton2.simulate('click');
    wrapper.update();
    const component4 = findByTestAttr(wrapper, 'counter-display');
    expect(component4.text()).toContain('0');
    // still do not show the error message
    const errorMessage = findByTestAttr(wrapper, 'error-message');
    expect(errorMessage.length).toBe(0);

    // if we try to decrement once more, it should not decrement the value
    // but it should show the error message
    const decrementButton3 = findByTestAttr(wrapper, 'decrement-button');
    decrementButton3.simulate('click');
    wrapper.update();
    const component5 = findByTestAttr(wrapper, 'counter-display');
    expect(component5.text()).toContain('0');
    const errorMessage1 = findByTestAttr(wrapper, 'error-message');
    expect(errorMessage1.length).toBe(1);

    // if we now click on the increment button, the error message should be gone again
    const incrementButton3 = findByTestAttr(wrapper, 'increment-button');
    incrementButton3.simulate('click');
    wrapper.update();
    const component6 = findByTestAttr(wrapper, 'counter-display');
    expect(component6.text()).toContain('1');
    const errorMessage2 = findByTestAttr(wrapper, 'error-message');
    expect(errorMessage2.length).toBe(0);
});
