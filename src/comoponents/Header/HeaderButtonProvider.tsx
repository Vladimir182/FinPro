import React, { useState } from 'react';

export const HeaderButtonContext = React.createContext({
  link: '',
  setLink: (link: string): void => {}
});

const HeaderButtonContextProvider: React.FC = props => {

  const setLink = (link: string) => {
    sessionStorage.setItem('pinpro-backlink', link)
    setState({ ...state, link: link });
  }

  const initState = {
    link: '',
    setLink: setLink
  }

  const [state, setState] = useState(initState);

  return (
    <HeaderButtonContext.Provider value={state}>
      {props.children}
    </HeaderButtonContext.Provider>
  )
}

export default HeaderButtonContextProvider;