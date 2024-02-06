const fs = require('fs');

const rawData = fs.readFileSync('autoModels.json');
const data = JSON.parse(rawData);
const groupedData = {};

data.forEach(carData => {
    const mark = carData["Марка"];

    if (!groupedData[mark]) {
        groupedData[mark] = [];
    }

    groupedData[mark].push({
        "Модель": carData["Модель"],
        "Модификация": carData["Модификация"],
        "Тип Двигателя": carData["Тип Двигателя"],
        "Мощность": carData["Мощность"],
        "Тип топлива": carData["Тип топлива"],
        "Год выпуска": carData["Год выпуска"],
        "Обьем двигателя": carData["Обьем двигателя"],
        "Объем масла": carData["Объем масла"]
    });
});

const resultArray = Object.keys(groupedData).map(mark => ({
    "Марка": mark,
    "Данные": groupedData[mark]
}));

const resultJson = JSON.stringify(resultArray, null, 2);
console.log(`Количество марок: ${Object.keys(groupedData).length}`);

fs.writeFileSync('result.json', resultJson);