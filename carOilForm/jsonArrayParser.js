const fs = require('fs');

const rawData = fs.readFileSync('autoModels.json');
const data = JSON.parse(rawData);
const groupedData = {};

data.forEach(carData => {
    const mark = carData["Марка"];

    if (!groupedData[mark]) {
        groupedData[mark] = [];
    }
    const existingMarkData = groupedData[mark];
    const existingModel = existingMarkData.find(item => item["Модель"] === carData["Модель"]);

    if (existingModel) {
        existingModel["Модификации"].push({
            "Модификация": carData["Модификация"],
            "Тип Двигателя": carData["Тип Двигателя"],
            "Мощность": carData["Мощность"],
            "Тип топлива": carData["Тип топлива"],
            "Год выпуска": carData["Год выпуска"],
            "Обьем двигателя": carData["Обьем двигателя"],
            "Объем масла": carData["Объем масла"]
        });
    } else {
        existingMarkData.push({
            "Модель": carData["Модель"],
            "Модификации": [
                {
                    "Модификация": carData["Модификация"],
                    "Тип Двигателя": carData["Тип Двигателя"],
                    "Мощность": carData["Мощность"],
                    "Тип топлива": carData["Тип топлива"],
                    "Год выпуска": carData["Год выпуска"],
                    "Обьем двигателя": carData["Обьем двигателя"],
                    "Объем масла": carData["Объем масла"]
                }
            ]
        });
    }
});

const resultArray = Object.keys(groupedData).map(mark => ({
    "Марка": mark,
    "Модели": groupedData[mark]
}));

const resultJson = JSON.stringify(resultArray, null, 2);

fs.writeFileSync('result.json', resultJson);
