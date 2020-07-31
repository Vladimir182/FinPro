import React, { useState } from 'react';

enum ThemeTypeList {
  light = 'light',
  dark = 'dark'
}

type ThemeType = {
  [key in ThemeTypeList]: { [x: string]: string | number }
}

type SetTheme = (type: ThemeTypeList) => void;

const defaultTheme = {
  type: 'light',
  background: 'radial-gradient(100% 316.05% at 0% 48.15%, #2C004F 0%, #7C2FB9 50.04%, #32005A 100%)',
  backgroundButton: 'gray',
  primary: '#0277bd',
  text: 'black',
  color: 'yellow'
}

export const ThemeContext = React.createContext({
  theme: defaultTheme,
  setTheme: (type: ThemeTypeList): void => {}
});

const ThemeContextProvider: React.FC = props => {
  const theme  = {
    light: defaultTheme,
    dark:{
      type: 'dark',
      background: 'radial-gradient(100% 316.05% at 0% 48.15%, #2C004F 0%, #7C2FB9 50.04%, #32005A 100%)',
      backgroundButton: 'gray',
      primary: '#212121',
      text: 'white',
      color: 'red',
    },
  }

  const setTheme: SetTheme = (type) => {
    setState({ ...state, theme: type === 'dark' ? theme.light : theme.dark })
  }

  const initState = {
    theme: theme.light,
    setTheme: setTheme
  }

  const [state, setState] = useState(initState);

  return (
    <ThemeContext.Provider value={state}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider;