[![Maintainability](https://api.codeclimate.com/v1/badges/555d27eb0f2e60efb263/maintainability)](https://codeclimate.com/github/zapupenec/Weather_app/maintainability)

EN | [RU](https://github.com/zapupenec/Weather_app/blob/master/README-ru.md)

# [Weather app](https://weather_app-zapupenec.vercel.app)
An application to search for weather by city name. Possibility of weather for 4-5 days or for 33 hours with an interval of 3 hours. The limitation is related to the selected free API.
![screenshot-ru](/image/weather_app-ru.png)

Created during an internship at
<a href="https://preax.ru" target="_blank" rel="noreferrer">
  <img src="./image/icon/preax.svg" height="20" alt="HTML5" title="HTML5"/>
</a>

**Condition**: use the stack 
<a href="https://developer.mozilla.org/en-US/docs/Glossary/html5" target="_blank" rel="noreferrer">
  <img src="./image/icon/html5.svg" width="20" height="20" alt="HTML5" title="HTML5"/>
</a>
<a href="https://www.w3.org/TR/CSS/#css" target="_blank" rel="noreferrer">
  <img src="./image/icon/css3.svg" width="20" height="20" alt="CSS3" title="CSS3"/>
</a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
  <img src="./image/icon/js.svg" width="20" height="20" alt="JavaScript" title="JavaScript"/>
</a>
<a href="https://react.dev" target="_blank" rel="noreferrer">
    <img src="./image/icon/react.svg" width="20" height="20" alt="webpack" title="webpack"/>
</a>
without additional libraries.

## Install for development
Developed using Node.js v20.4.0.

<a href="https://openweathermap.org" target="_blank" rel="noreferrer">
    <img src="./image/logo_openweather.png" height="40" alt="logo_openweathermap" title="openweathermap.org"/>
</a>

To work with the API, you need your own key. Register at [openweathermap.org](https://openweathermap.org) and generate your key.

Clone the repository locally.
```
git clone https://github.com/zapupenec/Weather_app.git
```
Install the dependencies.
```
make install
```
In the root folder, create a file ```.env``` and write down your key.
```
// contents of .env

REACT_APP_API_KEY = 'your-secret-api-key'
```
Runs the app in the development mode.
```
make start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Builds the app for production.
```
make build
```