import React, { useContext } from 'react'
import { ThemeContext } from './index';

function ToggleTheme() {
  const state = useContext(ThemeContext)

  const btn = {
    color: state.theme.color,
    marginTop: '20px',
    marginBottom: '20px',
    background: state.theme.backgroundButton
  }

  return (
    <button
      // variant='contained'
      onClick={() => {
        state.setTheme(state.theme.type)
      }}
      style={btn}
    >
      Toggle Theme
    </button>
  )
}

export default ToggleTheme