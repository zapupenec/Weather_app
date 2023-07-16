const button = document.getElementById('button-show-search');
button.addEventListener('click', () => {
  const sideBarSearchEl = document.querySelector('.side-bar-search');
  sideBarSearchEl.classList.remove('hidden');
  sideBarSearchEl.classList.add('shown');
});

const canselButton = document.getElementById('button-hide-search');
canselButton.addEventListener('click', () => {
  const sideBarSearchEl = document.querySelector('.side-bar-search');
  sideBarSearchEl.classList.remove('shown');
  sideBarSearchEl.classList.add('hidden');
});

const formSearch = document.getElementById('search-form');
formSearch.addEventListener('submit', (e) => {
  e.preventDefault();
});
