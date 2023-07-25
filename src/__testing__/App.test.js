import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '../App';

const mockStore = configureMockStore([thunk]);

const initialState = {
  locationReducer: {
    postalCode: '98032',
    requestingLocation: false,
  },
};

test('renders header and footer', () => {
  const store = mockStore(initialState);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText('Adventure Time')).toBeInTheDocument();
  expect(screen.getByLabelText('menu')).toBeInTheDocument();
  expect(screen.getByText('Sign in')).toBeInTheDocument();

  expect(screen.getByText('©2023 AdventureTime')).toBeInTheDocument();
  expect(screen.getByAltText('Facebook')).toBeInTheDocument();
  expect(screen.getByAltText('GitHub')).toBeInTheDocument();
  expect(screen.getByAltText('Twitter')).toBeInTheDocument();
});


test('renders correct component for each route', () => {
  const store = mockStore(initialState);
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

});
