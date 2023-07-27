// mock
const today = new Date('March 13, 2021 14:00:00');

const forecast = {
  days: [
    {
      description: 'default',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'rain',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'rain',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'thunderstorm',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'thunderstorm',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'thunderstorm',
      temperatureDay: 10,
      temperatureNight: 4,
    },
    {
      description: 'thunderstorm',
      temperatureDay: 10,
      temperatureNight: 4,
    },
  ],

  hours: [
    {
      description: 'default',
      temperature: 10,
    },
    {
      description: 'default',
      temperature: 10,
    },
    {
      description: 'default',
      temperature: 10,
    },
    {
      description: 'default',
      temperature: 10,
    },
    {
      description: 'thunderstorm',
      temperature: 10,
    },
    {
      description: 'thunderstorm',
      temperature: 10,
    },
    {
      description: 'default',
      temperature: 10,
    },
    {
      description: 'default',
      temperature: 10,
    },
    {
      description: 'default',
      temperature: 10,
    },
    {
      description: 'default',
      temperature: 10,
    },
    {
      description: 'thunderstorm',
      temperature: 10,
    },
    {
      description: 'thunderstorm',
      temperature: 10,
    },
  ],
};

forecast.days = forecast.days.map((dataDay, i) => {
  dataDay.date = new Date(today);
  dataDay.date.setDate(dataDay.date.getDate() + 1 + i);
  return dataDay;
});

forecast.hours = forecast.hours.map((dataDay, i) => {
  const date = new Date(today);
  date.setHours(date.getHours() + 1 + i);
  dataDay.time = date.getHours();
  return dataDay;
});
// mock

const renderPanelDay = (forecastDay) => {
  const itemEl = document.createElement('li')
  itemEl.className = 'panel-day';

  const year = forecastDay.date.getFullYear();
  const month = `${forecastDay.date.getMonth() + 1}`.padStart(2, '0');
  const day = `${forecastDay.date.getDate()}`.padStart(2, '0');
  const datatime = `${year}-${month}-${day}`

  let date;
  if (forecastDay.date.getDate() - today.getDate() === 1) {
    date = 'Завтра';
  } else {
    const dateString = forecastDay.date.toLocaleDateString('ru-RU', {
      month: 'short',
      weekday: 'short',
      day: 'numeric',
    });
    date = `${dateString[0].toUpperCase()}${dateString.slice(1, -1)}`;
  }

  itemEl.innerHTML = `
    <time class="panel-day__date" datatime="${datatime}">${date}</time>
    <img class="panel-day__image" src="./src/image/panel/${forecastDay.description}.svg" alt="${forecastDay.description}">
    <div class="panel-day__temperature">
      <span class="panel-day__temperature-day">${forecastDay.temperatureDay}°C</span>
      <span class="panel-day__temperature-night">${forecastDay.temperatureNight}°C</span>
    </div>
  `;
  return itemEl;
}

const renderPanelHour = (forecastHour) => {
  const itemEl = document.createElement('li')
  itemEl.className = 'panel-hour';

  const hours = forecastHour.time === 0 ? forecastHour.time : `${forecastHour.time}`.padStart(2, '0');
  itemEl.innerHTML = `
    <time class="panel-hour__date" datatime="${hours}:00">${hours}:00</time>
    <img class="panel-hour__image" src="./src/image/panel/${forecastHour.description}.svg" alt="${forecastHour.description}">
    <span class="panel-hour__temperature">${forecastHour.temperature}°C</span>
  `;

  return itemEl;
}

const renderPanels = (elements, forecast) => {
  const redrerPanel = {
    days: renderPanelDay,
    hours: renderPanelHour,
  };

  Object.keys(forecast).forEach((forecastName) => {
    const itemElements = forecast[forecastName]
      .map((currentForecast) => redrerPanel[forecastName](currentForecast))

    const swiperItemsEl = [...elements.swiperItemsElelements]
      .find((swiperItemsEl) => swiperItemsEl
        .getAttribute('aria-labelledby') === `swiper-${forecastName}`);

    swiperItemsEl.append(...itemElements);
  })
};

const renderSwiper = (state) => {
  const activeSwiperEl = document.querySelector(`[aria-labelledby="${state.activeTabId}"]`);
  const itemsElelements = activeSwiperEl.childNodes;
  const widthSwiperEl = activeSwiperEl.clientWidth;
  const styleSwiperEl = window.getComputedStyle(activeSwiperEl);
  const gap = Number(`${styleSwiperEl.gap}`.replace(/[^0-9]/g, ""));
  const sidePadding = Number(`${styleSwiperEl.paddingLeft}`.replace(/[^0-9]/g, ""));
  const widthItemEl = itemsElelements[0].clientWidth;

  const visibleItemsCount = Math.floor((widthSwiperEl - sidePadding * 2) / (widthItemEl + gap));
  itemsElelements.forEach((itemEl, i) => {
    if (window.matchMedia('(max-width: 720px)').matches) {
      // itemEl.classList.remove('swiper__item_hidden');
      itemEl.style.display = 'flex';
      return;
    }
    if (i < visibleItemsCount) {
      // itemEl.classList.remove('swiper__item_hidden');
      itemEl.style.display = 'flex';
      return;
    }
    // itemEl.classList.toggle('swiper__item_hidden');
    itemEl.style.display = 'none';
  });
};

const renderSearchPanel = (elements, state) => {
  const mapping = {
    hidden: (elements) => {
      elements.searchPanelEl.classList.remove('search-panel_shown');
    },
    shown: (elements) => {
      elements.searchPanelEl.classList.add('search-panel_shown');
      elements.searchFieldEl.focus();
    },
  };
  return mapping[state.searchPanelState](elements);
};

const renderTabs = (elements, state) => {
  elements.tabList.forEach((tab) => {
    const tabpanel = document.querySelector(`[aria-labelledby="${tab.id}"]`);
    if (state.activeTabId === tab.id) {
      tab.classList.add('switchers__button_active');
      tabpanel.classList.add('swiper__items_shown');
      return;
    }
    tab.classList.remove('switchers__button_active');
    tabpanel.classList.remove('swiper__items_shown');
  });
};

const toggleThemeMode = (elements, state) => {
  if (state.darkMode) {
    elements.switcherThemeCheckboxEl.classList.add('theme-switcher__checkbox_dark');
    document.documentElement.classList.add('dark-mode', state.darkMode);
  } else {
    elements.switcherThemeCheckboxEl.classList.remove('theme-switcher__checkbox_dark');
    document.documentElement.classList.remove('dark-mode', state.darkMode);
  }

  localStorage.setItem('darkMode', state.darkMode);
}

const setInitialThemeMode = (clientTheme) => {
  if (localStorage.getItem('darkMode')) {
    return localStorage.getItem('darkMode') === 'true';
  }
  return clientTheme.matches;
};

const app = () => {
  const clientTheme = window.matchMedia('(prefers-color-scheme: dark)');
  clientTheme.addEventListener('change', (e) => {
    state.darkMode = e.matches;
    toggleThemeMode(elements, state)
  });

  const state = {
    searchPanelState: 'hidden',
    activeTabId: localStorage.getItem('activeTabId') ?? 'swiper-days',
    darkMode: setInitialThemeMode(clientTheme),
  }

  const elements = {
    btnShowSearch: document.getElementById('button-show-search-panel'),
    btnHideSearch: document.getElementById('button-close-search-panel'),
    searchPanelEl: document.querySelector('.search-panel'),
    formSearchEl: document.getElementById('search-form'),
    searchFieldEl: document.getElementById('search-field'),
    tabList: document.querySelectorAll('[role="tab"]'),
    swiperItemsElelements: document.querySelectorAll('.swiper__items'),
    switcherThemeEl: document.getElementById('theme-switcher'),
    switcherThemeCheckboxEl: document.querySelector('.theme-switcher__checkbox'),
  }

  renderPanels(elements, forecast);
  toggleThemeMode(elements, state);
  renderTabs(elements, state);
  renderSwiper(state);
  window.addEventListener('resize', () => renderSwiper(state));

  elements.tabList.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      state.activeTabId = e.target.id;
      localStorage.setItem('activeTabId', state.activeTabId)
      renderTabs(elements, state);
      renderSwiper(state);
    })
  })

  elements.btnShowSearch.addEventListener('click', () => {
    state.searchPanelState = 'shown';
    renderSearchPanel(elements, state);
  });

  elements.btnHideSearch.addEventListener('click', () => {
    state.searchPanelState = 'hidden';
    renderSearchPanel(elements, state);
  });

  elements.formSearchEl.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  elements.switcherThemeEl.addEventListener('click', () => {
    state.darkMode = !state.darkMode;
    toggleThemeMode(elements, state);
  })
};

app();
