const express = require('express');
const cors = require('cors');
const app = express();


const fileName = './json/LowDataFinal.json'     // RU: Название вашего файла | EN: Your file name
const file = require(fileName);                 // RU: Читаем json | EN: Read json


// RU: Подключаем модуль cors для поддержки запросов из других сайтов | EN: Include cors module for support requests from other sites
app.use(cors());
// Ru: Подключаем модуль dotenv для поддержки переменных окружения | EN: Include dotenv module for support environment variables
require("dotenv").config();
// Ru: Подключаем модуль body-parser для поддержки запросов с телом | EN: Include body-parser module for support requests with body
app.use(express.json());


// RU: Обработка get запроса на получение всех данных | EN: Processing get request for getting all data
app.get("", async (req, res) => {
    console.log("trying to send data");
    res.json(file); // RU: Отправляем данные json в ответе | EN: Send json data in response
});


// RU: Слушаем порт 3001 | EN: Listen port 3001
app.listen(process.env.PORT || 3001, () => {
    console.log("server running on 'port 3001");

});

module.exports = app;
