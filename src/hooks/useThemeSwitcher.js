import { useState, useEffect } from 'react';

export function useThemeSwitcher() {
  const [darkModeState, setDarkModeState] = useState(false);
  const handlerDarkMode = (state) => () => setDarkModeState(state);

  const app = document.querySelector('.app');

  useEffect(() => {
    if (app === null) return;

    if (darkModeState) {
      app.classList.add('dark-mode');
    } else {
      app.classList.remove('dark-mode');
    }
  }, [darkModeState, app]);

  return { darkModeState, handlerDarkMode };
}
