import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';

import { findByTestAttr, storeFactory } from '../util/helpers';
import ShowUserListMedia from '../../components/ShowUserListMedia';
import movieShrineConfig from '../../config/movieShrine';

describe('ShowUserListMedia component', () => {
    const setup = (initialState = { userDetails: {} }, props, listType) => {
        const store = storeFactory(initialState);
        const propsToPass = {
            ...props,
            match: {
                params: { listType: listType }
            }
        };
        return shallow(<ShowUserListMedia {...propsToPass} store={store} />).dive();
    };

    let wrapper;
    const numberOfItemsToRender = 45;
    const itemsArray = Array(numberOfItemsToRender).fill({}).map((item, index) => (
        {
            id: index,
            poster_path: 'path/to/poster_image.jpg'
        }
    ));
    const state = {
        loggedIn: true,
        tmdbConfiguration: {
            images: {
                poster_sizes: ['size1', 'size2', 'size3', 'size4', 'size5', 'size6'],
                secure_base_url: 'http://imagesUrl'
            },
            languages: [
                { english_name: 'The language 1' },
                { english_name: 'The language 2' },
                { english_name: 'The language 3' },
            ]
        },
        userDetails: {}
    };

    describe('when user visits the /movies/:listType route', () => {
        const mediaType = 'movies';

        describe('when listType is "favorite"', () => {
            const listType = 'favorite';

            beforeEach(() => {
                wrapper = setup(undefined, { mediaType }, listType).dive();
            });

            test('renders without crashing', () => {
                const component = findByTestAttr(wrapper, 'component-main');
                expect(component.length).toBe(1);
            });

            test('renders the correct media message', () => {
                const component = findByTestAttr(wrapper, 'media-message');
                expect(component.length).toBe(1);
                expect(component.text()).toBe(`Your ${movieShrineConfig.mediaMessage[listType][mediaType]}:`);
            });

            describe('when there are no items in the list', () => {
                beforeEach(() => {
                    const state = {
                        userDetails: {
                            [listType]: { [mediaType]: [] }
                        }
                    };
                    wrapper = setup(state, { mediaType }, listType).dive();
                });

                test('renders the correct "no items" media message', () => {
                    const component = findByTestAttr(wrapper, 'no-items-message');
                    expect(component.length).toBe(1);
                    expect(component.text()).toBe(`${movieShrineConfig.mediaMessage.noItems} ${movieShrineConfig.mediaMessage[listType][mediaType]}`);
                });

                test('does not render the search results section', () => {
                    const component = findByTestAttr(wrapper, 'search-results-section');
                    expect(component.length).toBe(0);
                });

                test('does not render the "Load More" button', () => {
                    const component = findByTestAttr(wrapper, 'load-more-button');
                    expect(component.length).toBe(0);
                });
            });

            describe('when there are less than 20 items in the list', () => {
                beforeEach(() => {
                    const state = {
                        userDetails: {
                            [listType]: { [mediaType]: [ { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 } ] }
                        }
                    };
                    wrapper = setup(state, { mediaType }, listType).dive();
                });

                test('does not render "no items" media message', () => {
                    const component = findByTestAttr(wrapper, 'no-items-message');
                    expect(component.length).toBe(0);
                });

                test('renders the search results section', () => {
                    const component = findByTestAttr(wrapper, 'search-results-section');
                    expect(component.length).toBe(1);
                });

                test('does not render the "Load More" button', () => {
                    const component = findByTestAttr(wrapper, 'load-more-button');
                    expect(component.length).toBe(0);
                });
            });

            describe('when there are more than 20 items in the list', () => {
                beforeEach(() => {
                    state.userDetails = {
                        [listType]: { [mediaType]: itemsArray }
                    };

                    wrapper = setup(state, { mediaType }, listType).dive();
                });

                test('does not render "no items" media message', () => {
                    const component = findByTestAttr(wrapper, 'no-items-message');
                    expect(component.length).toBe(0);
                });

                test('renders the search results section', () => {
                    const component = findByTestAttr(wrapper, 'search-results-section');
                    expect(component.length).toBe(1);
                });

                test('renders only 20 search result items', () => {
                    const store = storeFactory(state);
                    const propsToPass = {
                        mediaType,
                        match: {
                            params: { listType: listType }
                        }
                    };
                    // must render the full DOM to see how many search result items are rendered
                    const wrapper = mount(
                        <Provider store={store}>
                            <BrowserRouter>
                                <ShowUserListMedia {...propsToPass} />
                            </BrowserRouter>
                        </Provider>
                    );

                    const items = findByTestAttr(wrapper, 'component-search-result');

                    expect(items.length).toBe(20);
                    wrapper.unmount();
                });

                test('renders the "Load More" button', () => {
                    const component = findByTestAttr(wrapper, 'load-more-button');
                    expect(component.length).toBe(1);
                    expect(component.text()).toBe(movieShrineConfig.loadMoreButtonText);
                });

                describe('after the "Load More" button is clicked', () => {
                    let wrapper;

                    beforeEach(() => {
                        const store = storeFactory(state);
                        const propsToPass = {
                            mediaType,
                            match: {
                                params: { listType: listType }
                            }
                        };
                        // must render the full DOM to see how many search result items are rendered
                        wrapper = mount(
                            <Provider store={store}>
                                <BrowserRouter>
                                    <ShowUserListMedia {...propsToPass} />
                                </BrowserRouter>
                            </Provider>
                        );
                    });

                    afterEach(() => {
                        wrapper.unmount();
                    });

                    test('when clicked once it renders 40 result items', () => {
                        const loadMoreButtonWrapper = findByTestAttr(wrapper, 'load-more-button');
                        const button = loadMoreButtonWrapper.find('button');
                        button.simulate('click');
                        const items = findByTestAttr(wrapper, 'component-search-result');

                        expect(items.length).toBe(40);
                    });

                    test(`when clicked second time it renders all ${numberOfItemsToRender} result items`, () => {
                        const loadMoreButtonWrapper = findByTestAttr(wrapper, 'load-more-button');
                        const button = loadMoreButtonWrapper.find('button');
                        button.simulate('click');
                        let items = findByTestAttr(wrapper, 'component-search-result');

                        expect(items.length).toBe(40);

                        button.simulate('click');
                        items = findByTestAttr(wrapper, 'component-search-result');

                        expect(items.length).toBe(numberOfItemsToRender);
                    });
                });
            });
        });

        describe('when listType is "watchlist"', () => {
            const listType = 'watchlist';

            beforeEach(() => {
                wrapper = setup(undefined, { mediaType }, listType).dive();
            });

            test('renders without crashing', () => {
                const component = findByTestAttr(wrapper, 'component-main');
                expect(component.length).toBe(1);
            });

            test('renders the correct media message', () => {
                const component = findByTestAttr(wrapper, 'media-message');
                expect(component.length).toBe(1);
                expect(component.text()).toBe(`Your ${movieShrineConfig.mediaMessage[listType][mediaType]}:`);
            });

            describe('when there are no items in the list', () => {
                beforeEach(() => {
                    const state = {
                        userDetails: {
                            [listType]: { [mediaType]: [] }
                        }
                    };
                    wrapper = setup(state, { mediaType }, listType).dive();
                });

                test('renders the correct "no items" media message', () => {
                    const component = findByTestAttr(wrapper, 'no-items-message');
                    expect(component.length).toBe(1);
                    expect(component.text()).toBe(`${movieShrineConfig.mediaMessage.noItems} ${movieShrineConfig.mediaMessage[listType][mediaType]}`);
                });

                test('does not render the search results section', () => {
                    const component = findByTestAttr(wrapper, 'search-results-section');
                    expect(component.length).toBe(0);
                });

                test('does not render the "Load More" button', () => {
                    const component = findByTestAttr(wrapper, 'load-more-button');
                    expect(component.length).toBe(0);
                });
            });

            describe('when there are less than 20 items in the list', () => {
                beforeEach(() => {
                    const state = {
                        userDetails: {
                            [listType]: { [mediaType]: [ { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 } ] }
                        }
                    };
                    wrapper = setup(state, { mediaType }, listType).dive();
                });

                test('does not render "no items" media message', () => {
                    const component = findByTestAttr(wrapper, 'no-items-message');
                    expect(component.length).toBe(0);
                });

                test('renders the search results section', () => {
                    const component = findByTestAttr(wrapper, 'search-results-section');
                    expect(component.length).toBe(1);
                });

                test('does not render the "Load More" button', () => {
                    const component = findByTestAttr(wrapper, 'load-more-button');
                    expect(component.length).toBe(0);
                });
            });

            describe('when there are more than 20 items in the list', () => {
                beforeEach(() => {
                    state.userDetails = {
                        [listType]: { [mediaType]: itemsArray }
                    };

                    wrapper = setup(state, { mediaType }, listType).dive();
                });

                test('does not render "no items" media message', () => {
                    const component = findByTestAttr(wrapper, 'no-items-message');
                    expect(component.length).toBe(0);
                });

                test('renders the search results section', () => {
                    const component = findByTestAttr(wrapper, 'search-results-section');
                    expect(component.length).toBe(1);
                });

                test('renders only 20 search result items', () => {
                    const store = storeFactory(state);
                    const propsToPass = {
                        mediaType,
                        match: {
                            params: { listType: listType }
                        }
                    };
                    // must render the full DOM to see how many search result items are rendered
                    const wrapper = mount(
                        <Provider store={store}>
                            <BrowserRouter>
                                <ShowUserListMedia {...propsToPass} />
                            </BrowserRouter>
                        </Provider>
                    );

                    const items = findByTestAttr(wrapper, 'component-search-result');

                    expect(items.length).toBe(20);
                    wrapper.unmount();
                });

                test('renders the "Load More" button', () => {
                    const component = findByTestAttr(wrapper, 'load-more-button');
                    expect(component.length).toBe(1);
                    expect(component.text()).toBe(movieShrineConfig.loadMoreButtonText);
                });

                describe('after the "Load More" button is clicked', () => {
                    let wrapper;

                    beforeEach(() => {
                        const store = storeFactory(state);
                        const propsToPass = {
                            mediaType,
                            match: {
                                params: { listType: listType }
                            }
                        };
                        // must render the full DOM to see how many search result items are rendered
                        wrapper = mount(
                            <Provider store={store}>
                                <BrowserRouter>
                                    <ShowUserListMedia {...propsToPass} />
                                </BrowserRouter>
                            </Provider>
                        );
                    });

                    afterEach(() => {
                        wrapper.unmount();
                    });

                    test('when clicked once it renders 40 result items', () => {
                        const loadMoreButtonWrapper = findByTestAttr(wrapper, 'load-more-button');
                        const button = loadMoreButtonWrapper.find('button');
                        button.simulate('click');
                        const items = findByTestAttr(wrapper, 'component-search-result');

                        expect(items.length).toBe(40);
                    });

                    test(`when clicked second time it renders all ${numberOfItemsToRender} result items`, () => {
                        const loadMoreButtonWrapper = findByTestAttr(wrapper, 'load-more-button');
                        const button = loadMoreButtonWrapper.find('button');
                        button.simulate('click');
                        let items = findByTestAttr(wrapper, 'component-search-result');

                        expect(items.length).toBe(40);

                        button.simulate('click');
                        items = findByTestAttr(wrapper, 'component-search-result');

                        expect(items.length).toBe(numberOfItemsToRender);
                    });
                });
            });
        });
    });

    describe('when user visits the /tvshows/:listType route', () => {
        const mediaType = 'tv';

        describe('when listType is "favorite"', () => {
            const listType = 'favorite';

            beforeEach(() => {
                wrapper = setup(undefined, { mediaType }, listType).dive();
            });

            test('renders without crashing', () => {
                const component = findByTestAttr(wrapper, 'component-main');
                expect(component.length).toBe(1);
            });

            test('renders the correct media message', () => {
                const component = findByTestAttr(wrapper, 'media-message');
                expect(component.length).toBe(1);
                expect(component.text()).toBe(`Your ${movieShrineConfig.mediaMessage[listType][mediaType]}:`);
            });

            describe('when there are no items in the list', () => {
                beforeEach(() => {
                    const state = {
                        userDetails: {
                            [listType]: { [mediaType]: [] }
                        }
                    };
                    wrapper = setup(state, { mediaType }, listType).dive();
                });

                test('renders the correct "no items" media message', () => {
                    const component = findByTestAttr(wrapper, 'no-items-message');
                    expect(component.length).toBe(1);
                    expect(component.text()).toBe(`${movieShrineConfig.mediaMessage.noItems} ${movieShrineConfig.mediaMessage[listType][mediaType]}`);
                });

                test('does not render the search results section', () => {
                    const component = findByTestAttr(wrapper, 'search-results-section');
                    expect(component.length).toBe(0);
                });

                test('does not render the "Load More" button', () => {
                    const component = findByTestAttr(wrapper, 'load-more-button');
                    expect(component.length).toBe(0);
                });
            });

            describe('when there are less than 20 items in the list', () => {
                beforeEach(() => {
                    const state = {
                        userDetails: {
                            [listType]: { [mediaType]: [ { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 } ] }
                        }
                    };
                    wrapper = setup(state, { mediaType }, listType).dive();
                });

                test('does not render "no items" media message', () => {
                    const component = findByTestAttr(wrapper, 'no-items-message');
                    expect(component.length).toBe(0);
                });

                test('renders the search results section', () => {
                    const component = findByTestAttr(wrapper, 'search-results-section');
                    expect(component.length).toBe(1);
                });

                test('does not render the "Load More" button', () => {
                    const component = findByTestAttr(wrapper, 'load-more-button');
                    expect(component.length).toBe(0);
                });
            });

            describe('when there are more than 20 items in the list', () => {
                beforeEach(() => {
                    state.userDetails = {
                        [listType]: { [mediaType]: itemsArray }
                    };

                    wrapper = setup(state, { mediaType }, listType).dive();
                });

                test('does not render "no items" media message', () => {
                    const component = findByTestAttr(wrapper, 'no-items-message');
                    expect(component.length).toBe(0);
                });

                test('renders the search results section', () => {
                    const component = findByTestAttr(wrapper, 'search-results-section');
                    expect(component.length).toBe(1);
                });

                test('renders only 20 search result items', () => {
                    const store = storeFactory(state);
                    const propsToPass = {
                        mediaType,
                        match: {
                            params: { listType: listType }
                        }
                    };
                    // must render the full DOM to see how many search result items are rendered
                    const wrapper = mount(
                        <Provider store={store}>
                            <BrowserRouter>
                                <ShowUserListMedia {...propsToPass} />
                            </BrowserRouter>
                        </Provider>
                    );

                    const items = findByTestAttr(wrapper, 'component-search-result');

                    expect(items.length).toBe(20);
                    wrapper.unmount();
                });

                test('renders the "Load More" button', () => {
                    const component = findByTestAttr(wrapper, 'load-more-button');
                    expect(component.length).toBe(1);
                    expect(component.text()).toBe(movieShrineConfig.loadMoreButtonText);
                });

                describe('after the "Load More" button is clicked', () => {
                    let wrapper;

                    beforeEach(() => {
                        const store = storeFactory(state);
                        const propsToPass = {
                            mediaType,
                            match: {
                                params: { listType: listType }
                            }
                        };
                        // must render the full DOM to see how many search result items are rendered
                        wrapper = mount(
                            <Provider store={store}>
                                <BrowserRouter>
                                    <ShowUserListMedia {...propsToPass} />
                                </BrowserRouter>
                            </Provider>
                        );
                    });

                    afterEach(() => {
                        wrapper.unmount();
                    });

                    test('when clicked once it renders 40 result items', () => {
                        const loadMoreButtonWrapper = findByTestAttr(wrapper, 'load-more-button');
                        const button = loadMoreButtonWrapper.find('button');
                        button.simulate('click');
                        const items = findByTestAttr(wrapper, 'component-search-result');

                        expect(items.length).toBe(40);
                    });

                    test(`when clicked second time it renders all ${numberOfItemsToRender} result items`, () => {
                        const loadMoreButtonWrapper = findByTestAttr(wrapper, 'load-more-button');
                        const button = loadMoreButtonWrapper.find('button');
                        button.simulate('click');
                        let items = findByTestAttr(wrapper, 'component-search-result');

                        expect(items.length).toBe(40);

                        button.simulate('click');
                        items = findByTestAttr(wrapper, 'component-search-result');

                        expect(items.length).toBe(numberOfItemsToRender);
                    });
                });
            });
        });

        describe('when listType is "watchlist"', () => {
            const listType = 'watchlist';

            beforeEach(() => {
                wrapper = setup(undefined, { mediaType }, listType).dive();
            });

            test('renders without crashing', () => {
                const component = findByTestAttr(wrapper, 'component-main');
                expect(component.length).toBe(1);
            });

            test('renders the correct media message', () => {
                const component = findByTestAttr(wrapper, 'media-message');
                expect(component.length).toBe(1);
                expect(component.text()).toBe(`Your ${movieShrineConfig.mediaMessage[listType][mediaType]}:`);
            });

            describe('when there are no items in the list', () => {
                beforeEach(() => {
                    const state = {
                        userDetails: {
                            [listType]: { [mediaType]: [] }
                        }
                    };
                    wrapper = setup(state, { mediaType }, listType).dive();
                });

                test('renders the correct "no items" media message', () => {
                    const component = findByTestAttr(wrapper, 'no-items-message');
                    expect(component.length).toBe(1);
                    expect(component.text()).toBe(`${movieShrineConfig.mediaMessage.noItems} ${movieShrineConfig.mediaMessage[listType][mediaType]}`);
                });

                test('does not render the search results section', () => {
                    const component = findByTestAttr(wrapper, 'search-results-section');
                    expect(component.length).toBe(0);
                });

                test('does not render the "Load More" button', () => {
                    const component = findByTestAttr(wrapper, 'load-more-button');
                    expect(component.length).toBe(0);
                });
            });

            describe('when there are less than 20 items in the list', () => {
                beforeEach(() => {
                    const state = {
                        userDetails: {
                            [listType]: { [mediaType]: [ { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 } ] }
                        }
                    };
                    wrapper = setup(state, { mediaType }, listType).dive();
                });

                test('does not render "no items" media message', () => {
                    const component = findByTestAttr(wrapper, 'no-items-message');
                    expect(component.length).toBe(0);
                });

                test('renders the search results section', () => {
                    const component = findByTestAttr(wrapper, 'search-results-section');
                    expect(component.length).toBe(1);
                });

                test('does not render the "Load More" button', () => {
                    const component = findByTestAttr(wrapper, 'load-more-button');
                    expect(component.length).toBe(0);
                });
            });

            describe('when there are more than 20 items in the list', () => {
                beforeEach(() => {
                    state.userDetails = {
                        [listType]: { [mediaType]: itemsArray }
                    };

                    wrapper = setup(state, { mediaType }, listType).dive();
                });

                test('does not render "no items" media message', () => {
                    const component = findByTestAttr(wrapper, 'no-items-message');
                    expect(component.length).toBe(0);
                });

                test('renders the search results section', () => {
                    const component = findByTestAttr(wrapper, 'search-results-section');
                    expect(component.length).toBe(1);
                });

                test('renders only 20 search result items', () => {
                    const store = storeFactory(state);
                    const propsToPass = {
                        mediaType,
                        match: {
                            params: { listType: listType }
                        }
                    };
                    // must render the full DOM to see how many search result items are rendered
                    const wrapper = mount(
                        <Provider store={store}>
                            <BrowserRouter>
                                <ShowUserListMedia {...propsToPass} />
                            </BrowserRouter>
                        </Provider>
                    );

                    const items = findByTestAttr(wrapper, 'component-search-result');

                    expect(items.length).toBe(20);
                    wrapper.unmount();
                });

                test('renders the "Load More" button', () => {
                    const component = findByTestAttr(wrapper, 'load-more-button');
                    expect(component.length).toBe(1);
                    expect(component.text()).toBe(movieShrineConfig.loadMoreButtonText);
                });

                describe('after the "Load More" button is clicked', () => {
                    let wrapper;

                    beforeEach(() => {
                        const store = storeFactory(state);
                        const propsToPass = {
                            mediaType,
                            match: {
                                params: { listType: listType }
                            }
                        };
                        // must render the full DOM to see how many search result items are rendered
                        wrapper = mount(
                            <Provider store={store}>
                                <BrowserRouter>
                                    <ShowUserListMedia {...propsToPass} />
                                </BrowserRouter>
                            </Provider>
                        );
                    });

                    afterEach(() => {
                        wrapper.unmount();
                    });

                    test('when clicked once it renders 40 result items', () => {
                        const loadMoreButtonWrapper = findByTestAttr(wrapper, 'load-more-button');
                        const button = loadMoreButtonWrapper.find('button');
                        button.simulate('click');
                        const items = findByTestAttr(wrapper, 'component-search-result');

                        expect(items.length).toBe(40);
                    });

                    test(`when clicked second time it renders all ${numberOfItemsToRender} result items`, () => {
                        const loadMoreButtonWrapper = findByTestAttr(wrapper, 'load-more-button');
                        const button = loadMoreButtonWrapper.find('button');
                        button.simulate('click');
                        let items = findByTestAttr(wrapper, 'component-search-result');

                        expect(items.length).toBe(40);

                        button.simulate('click');
                        items = findByTestAttr(wrapper, 'component-search-result');

                        expect(items.length).toBe(numberOfItemsToRender);
                    });
                });
            });
        });
    });
});
