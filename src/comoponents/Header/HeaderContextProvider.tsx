import React, { useState } from 'react';

type HeaderArguments = {
  hideLogo: boolean,
  setHideLogo: (newHideLogo: boolean) => void,
}

export const HeaderContext = React.createContext<HeaderArguments>({
  hideLogo: false,
  setHideLogo: (newHideLogo) => {},
});

const HeaderContextProvider: React.FC = props => {
  const [ hideLogo, setHideLogo ] = useState<boolean>(false);

  return  (
    <HeaderContext.Provider value={{ 
      hideLogo,
      setHideLogo,
    }}>
      {props.children}
    </HeaderContext.Provider>
  )
}

export default HeaderContextProvider;