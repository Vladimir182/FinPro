import React, { useState } from 'react';

type HeaderArguments = {
  link: string,
  setLink: (link: string) => void,
  setStopVoucherSession: (newStopVoucherSession: boolean) => void
  stopVoucherSession: boolean,
  hideLogo: boolean,
  setHideLogo: (newHideLogo: boolean) => void,
  showOptionalCheck: boolean,
  setShowOptionalCheck: (state: boolean) => void,
  shouldFetchDepositInit: boolean,
  setShouldFetchDepositInit: (state: boolean) => void,
  resetDepositSum: boolean,
  setResetDepositSum: (state: boolean) => void
}

export const HeaderContext = React.createContext<HeaderArguments>({
  link: '',
  setLink: (link: string): void => {},
  stopVoucherSession: false,
  setStopVoucherSession: (newStopVoucherSession: boolean): void => {},
  hideLogo: false,
  setHideLogo: (newHideLogo: boolean): void => {},
  showOptionalCheck: false,
  setShowOptionalCheck: (state: boolean) : void => {},
  shouldFetchDepositInit: false,
  setShouldFetchDepositInit: (state: boolean): void => {},
  resetDepositSum: false,
  setResetDepositSum: (state: boolean): void => {}
});

const HeaderContextProvider: React.FC = props => {
  const [link, setNewLink] = useState<string>('');
  const [ stopVoucherSession, setStopVoucherSession ] = useState<boolean>(false);
  const [ showOptionalCheck, setShowOptionalCheck ] = useState<boolean>(false);
  const [ shouldFetchDepositInit, setShouldFetchDepositInit ] = useState<boolean>(false);
  const [ resetDepositSum, setResetDepositSum ] = useState<boolean>(false);
  const [ hideLogo, setHideLogo ] = useState<boolean>(false);

  const setLink = (newLink: string) => {
    if (link === newLink) {
      return;
    }

    sessionStorage.setItem('finpro-backlink', newLink);
    setNewLink(newLink);
  }

  return  (
    <HeaderContext.Provider value={{ 
      link,
      setLink,
      stopVoucherSession,
      setStopVoucherSession,
      hideLogo,
      setHideLogo,
      showOptionalCheck,
      setShowOptionalCheck,
      shouldFetchDepositInit,
      setShouldFetchDepositInit,
      resetDepositSum,
      setResetDepositSum
    }}>
      {props.children}
    </HeaderContext.Provider>
  )
}

export default HeaderContextProvider;