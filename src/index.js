// mock
const today = new Date('March 13, 2021 14:00:00');

const dataPanelDays = [
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
].map((dataDay, i) => {
  dataDay.date = new Date(today);
  dataDay.date.setDate(dataDay.date.getDate() + 1 + i);
  return dataDay;
});

const dataPanelHours = [
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
]
// mock

const renderPanelsDaysV1 = (elements, dataPanelDays) => {
  const itemElements = dataPanelDays.map((data) => {
    const timeEl = document.createElement('time');
    timeEl.className = 'panel-day__date';

    const year = data.date.getFullYear();
    const month = `${data.date.getMonth() + 1}`.padStart(2, '0');
    const day = `${data.date.getDate()}`.padStart(2, '0');
    const datatime = `${year}-${month}-${day}`
    timeEl.setAttribute('datatime', datatime);

    if (data.date.getDate() - today.getDate() === 1) {
      timeEl.textContent = 'Завтра';
    } else {
      const dateString = data.date.toLocaleDateString('ru-RU', {
        month: 'short',
        weekday: 'short',
        day: 'numeric',
      });
      timeEl.textContent = `${dateString[0].toUpperCase()}${dateString.slice(1, -1)}`;
    }

    const imgEl = document.createElement('img');
    imgEl.className = 'panel-day__image';
    imgEl.src = `./src/image/panel/${data.description}.svg`;
    imgEl.alt = data.description;

    const temperatureDayEl = document.createElement('span');
    temperatureDayEl.className = 'panel-day__temperature-day';
    temperatureDayEl.textContent = `${data.temperatureDay}°C`;

    const temperatureNightEl = document.createElement('span');
    temperatureNightEl.className = 'panel-day__temperature-night';
    temperatureNightEl.textContent = `${data.temperatureNight}°C`;

    const temperatureEl = document.createElement('div');
    temperatureEl.className = 'panel-day__temperature';
    temperatureEl.append(temperatureDayEl, temperatureNightEl);

    const itemEl = document.createElement('li')
    itemEl.className = 'panel-day';
    itemEl.append(timeEl, imgEl, temperatureEl);

    return itemEl;
  });

  elements.swiperDaysEl.append(...itemElements);
};
const renderPanelsDaysV2 = (elements, dataPanelDays) => {
  const innerHTML = dataPanelDays.map((data) => {
    const year = data.date.getFullYear();
    const month = `${data.date.getMonth() + 1}`.padStart(2, '0');
    const day = `${data.date.getDate()}`.padStart(2, '0');
    const datatime = `${year}-${month}-${day}`

    let date;
    if (data.date.getDate() - today.getDate() === 1) {
      date = 'Завтра';
    } else {
      const dateString = data.date.toLocaleDateString('ru-RU', {
        month: 'short',
        weekday: 'short',
        day: 'numeric',
      });
      date = `${dateString[0].toUpperCase()}${dateString.slice(1, -1)}`;
    }

    const itemInnerHTML = `
      <li class="panel-day">
        <time class="panel-day__date" datatime="${datatime}">${date}</time>
        <img class="panel-day__image" src="./src/image/panel/${data.description}.svg" alt="${data.description}">
        <div class="panel-day__temperature">
          <span class="panel-day__temperature-day">${data.temperatureDay}°C</span>
          <span class="panel-day__temperature-night">${data.temperatureNight}°C</span>
        </div>
      </li>
    `;
    return itemInnerHTML;
  });

  elements.swiperDaysEl.insertAdjacentHTML('afterbegin', innerHTML.join(''))
};

const renderPanelsHoursV1 = (elements, dataPanelHours) => {
  const itemElements = dataPanelHours.map((data, i) => {
    const timeEl = document.createElement('time');
    timeEl.className = 'panel-hour-time';

    const hours = today.getHours() + 1 + i;
    const time = `${hours}:00`
    timeEl.setAttribute('datatime', time);
    timeEl.textContent = time;

    const imgEl = document.createElement('img');
    imgEl.src = `./src/image/panel/${data.description}.svg`;
    imgEl.alt = data.description;

    const temperatureEl = document.createElement('span');
    temperatureEl.className = 'hour-temperature';
    temperatureEl.textContent = `${data.temperature}°C`;

    const itemEl = document.createElement('li')
    itemEl.className = 'panel-hour';
    itemEl.append(timeEl, imgEl, temperatureEl);

    return itemEl;
  });

  elements.swiperHoursEl.append(...itemElements);
};
const renderPanelsHoursV2 = (elements, dataPanelHours) => {
  const innerHTML = dataPanelHours.map((data, i) => {
    const hours = today.getHours() + 1 + i;

    const itemInnerHTML = `
      <li class="panel-hour">
        <time class="panel-hour__date" datatime="${hours}:00">${hours}:00</time>
        <img class="panel-hour__image" src="./src/image/panel/${data.description}.svg" alt="${data.description}">
        <span class="panel-hour__temperature">${data.temperature}°C</span>
      </li>
    `;

    return itemInnerHTML;
  });

  elements.swiperHoursEl.insertAdjacentHTML('afterbegin', innerHTML.join(''))
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

const renderTabs = (elements) => {
  elements.tabList.forEach((tab) => {
    const tabpanel = document.querySelector(`[aria-labelledby="${tab.id}"]`);
    tab.classList.toggle('switchers__button_active');
    tabpanel.classList.toggle('swiper__items_shown');
  });
};

const app = () => {
  const state = {
    searchPanelState: 'hidden',
    activeTabId: 'swiper-days',
  }

  const elements = {
    btnShowSearch: document.getElementById('button-show-search-panel'),
    btnHideSearch: document.getElementById('button-close-search-panel'),
    searchPanelEl: document.querySelector('.search-panel'),
    formSearchEl: document.getElementById('search-form'),
    searchFieldEl: document.getElementById('search-field'),
    tabList: document.querySelectorAll('[role="tab"]'),
    swiperDaysEl: document.querySelector('[aria-labelledby="swiper-days"]'),
    swiperHoursEl: document.querySelector('[aria-labelledby="swiper-hours"]'),
  }

  renderPanelsDaysV2(elements, dataPanelDays);
  renderPanelsHoursV2(elements, dataPanelHours);

  elements.tabList.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      state.activeTabId = e.target.id;
      renderTabs(elements, state);
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
};

app();
