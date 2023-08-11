import { useState, useEffect } from 'react';

export function useThemeSwitcher() {
  const [darkModeState, setDarkModeState] = useState(false);
  const handlerDarkMode = (state) => () => setDarkModeState(state);

  const html = document.querySelector('html');

  useEffect(() => {
    if (html === null) return;

    if (darkModeState) {
      html.classList.add('dark-mode');
    } else {
      html.classList.remove('dark-mode');
    }
  }, [darkModeState, html]);

  return { darkModeState, handlerDarkMode };
}
