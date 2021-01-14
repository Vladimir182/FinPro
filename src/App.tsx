import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { initStore } from './redux/store';
import Roads from './comoponents/Roads';
import ThemeContextProvider from './ThemeContextProvider';
import HeaderContextProvider from './comoponents/Header/HeaderContextProvider';
// import WSProvider from './WSProvider';
import CentProvider from './CentrifugeProvider';
import './App.css';

const getStateFromStorage = () => {
	const state = localStorage.getItem('finpro-state');
	if (!state) return undefined;

	const parsedState = JSON.parse(state);
	return parsedState;
};

export const store = initStore(getStateFromStorage());

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeContextProvider>
          <HeaderContextProvider>
            <CentProvider>
              <Roads />
            </CentProvider>
          </HeaderContextProvider>
        </ThemeContextProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
