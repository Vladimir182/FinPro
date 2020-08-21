import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { SnackbarProvider } from 'notistack';
// import ThemeContext from './theme-context';
import { initStore } from './redux/store';
import './App.css';
import Header from './comoponents/Header';
// import logo from './logo.svg';
import Roads from './comoponents/Roads';
import ThemeContextProvider from './ThemeContextProvider';
import HeaderContextProvider from './comoponents/Header/HeaderContextProvider';

const getStateFromStorage = () => {
	const state = localStorage.getItem('finpro-state');
	if (!state) return undefined;

	const parsedState = JSON.parse(state);
	return parsedState;
};

export const store = initStore(getStateFromStorage());

const App = () => {

// console.log('ENV', process.env)
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeContextProvider>
          <HeaderContextProvider>
            <Roads />
          </HeaderContextProvider>
        </ThemeContextProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
