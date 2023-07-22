const renderSearchPanel = (elements, state) => {
  const mapping = {
    hidden: (elements) => {
      elements.searchPanelEl.classList.add('search-panel-hidden');
    },
    shown: (elements) => {
      elements.searchPanelEl.classList.remove('search-panel-hidden');
      elements.searchFieldEl.focus();
    },
  };
  return mapping[state.searchPanelState](elements);
};

const renderTabs = (elements, state) => {
  elements.tabList.forEach((tab) => {
    const tabpanel = document.querySelector(`[aria-labelledby="${tab.id}"]`);
    if (state.activeTabId === tab.id) {
      tab.classList.add('active-switcher');
      tab.classList.remove('inactive-switcher');
      tabpanel.classList.remove('carusel-inactive');
    } else {
      tab.classList.remove('active-switcher');
      tab.classList.add('inactive-switcher');
      tabpanel.classList.add('carusel-inactive');
    }
  });
};

const app = () => {
  const state = {
    searchPanelState: 'hidden',
    activeTabId: 'carusel-days'
  }

  const elements = {
    btnShowSearch: document.getElementById('button-show-search'),
    btnHideSearch: document.getElementById('button-hide-search'),
    searchPanelEl: document.querySelector('.search-panel'),
    formSearchEl: document.getElementById('search-form'),
    searchFieldEl: document.getElementById('search-field'),
    tabList: document.querySelectorAll('[role="tab"]'),
  }

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
