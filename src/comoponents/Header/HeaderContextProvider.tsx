import React, { useState } from 'react';
type voidFunc = () => void

type HeaderArguments = {
  link: string,
  setLink: (link: string) => void,
  setStopVoucherSession: (newStopVoucherSession: boolean) => void
  stopVoucherSession: boolean,
  hideLogo: boolean,
  setHideLogo: (newHideLogo: boolean) => void,
}

export const HeaderContext = React.createContext<HeaderArguments>({
  link: '',
  setLink: (link: string): void => {},
  stopVoucherSession: false,
  setStopVoucherSession: (newStopVoucherSession: boolean): void => {},
  hideLogo: false,
  setHideLogo: (newHideLogo: boolean): void => {},
});

const HeaderContextProvider: React.FC = props => {
  const [link, setNewLink] = useState<string>('');
  const [ stopVoucherSession, setStopVoucherSession ] = useState<boolean>(false);
  const [ hideLogo, setHideLogo ] = useState<boolean>(false);

  const setLink = (newLink: string) => {
    if (link === newLink) {
      return;
    }

    sessionStorage.setItem('finpro-backlink', newLink);
    setNewLink(newLink);
  }
  
  return  (
    <HeaderContext.Provider value={{ link, setLink, stopVoucherSession, setStopVoucherSession, hideLogo, setHideLogo }}>
      {props.children}
    </HeaderContext.Provider>
  )
}

export default HeaderContextProvider;