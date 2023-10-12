[![Maintainability](https://api.codeclimate.com/v1/badges/555d27eb0f2e60efb263/maintainability)](https://codeclimate.com/github/zapupenec/Weather_app/maintainability)

[EN](https://github.com/zapupenec/Weather_app) | RU

# [Приложение погоды](https://weather-app-zapupenec.vercel.app)
Приложение поиска погоды по названию города. Возможность просматривать погоду на 4-5 дней или на 33 часа с промежутком в 3 часа. Ограничение связано с выбранным бесплатным API.
![screenshot-ru](/image/weather_app-ru.png)

Создано во время прохождения учебной стажировки в
<a href="https://preax.ru" target="_blank" rel="noreferrer">
  <img src="./image/icon/preax.svg" height="20" alt="HTML5" title="HTML5"/>
</a>

**Условие**: использовать стек 
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
без дополнительных библиотек.

## Установка для разработки
Во время разработки использовалась Node.js v20.4.0.

<a href="https://openweathermap.org" target="_blank" rel="noreferrer">
    <img src="./image/logo_openweather.png" height="40" alt="logo_openweathermap" title="openweathermap.org"/>
</a>

Для работы с API понадобиться свой ключ. Зарегистрируйтесь на [openweathermap.org](https://openweathermap.org) и создайте свой ключ.

Скопируйте репозиторий локально.
```
git clone https://github.com/zapupenec/Weather_app.git
```
Установите зависимости.
```
make install
```
В корневой папке создайте файл ```.env``` и запишите ваш ключ.
```
// contents of .env

REACT_APP_API_KEY = 'your-secret-api-key'
```
Запустите приложения в режиме разработки.
```
make start
```
Откройте [http://localhost:3000](http://localhost:3000), чтобы просмотреть его в браузере.

Команда для сборки продакшена.
```
make build
```