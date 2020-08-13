import React, { useState } from 'react';

export const HeaderButtonContext = React.createContext({
  link: '',
  setLink: (link: string): void => {}
});

const HeaderButtonContextProvider: React.FC = props => {
  const [link, setNewLink] = useState('');

  const setLink = (newLink: string) => {
    
    if (link === newLink) {
      return;
    }

    sessionStorage.setItem('finpro-backlink', newLink);
    setNewLink(newLink);
  }

  return (
    <HeaderButtonContext.Provider value={{ link, setLink }}>
      {props.children}
    </HeaderButtonContext.Provider>
  )
}

export default HeaderButtonContextProvider;