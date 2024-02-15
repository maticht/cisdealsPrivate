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

    const rawModel = carData["Модель"];
    let translatedModel;

    if (typeof rawModel === 'string') {
        const parts = rawModel.split(/[,\s]*(?:\/[,\s]*)+/).map(part => part.trim());
        const filteredParts = parts.length > 3 ? parts.slice(0, 1) : parts;
        translatedModel = translateTitle(filteredParts.join(', '));
    } else {
        translatedModel = translateTitle(rawModel);
    }





    if (carData["Модификация"]) {
        const translatedModification = translateVol(carData["Модификация"]);
        const translatedEngineType = translateEngineType(carData["Тип Двигателя"]);
        const translatedPower = translatePower(carData["Мощность"]);
        const translatedFuelType = translateFuelType(carData["Тип топлива"]);
        const translatedVolume = translateVolume(carData["Объем двигателя"]);
        const translatedOilVolume = translateVolume(carData["Объем масла"]);

        const productionYear = carData["Год выпуска"];
        const productionYearRange = productionYear ? productionYear.split('-') : [];
        const startYear = productionYearRange.length > 0 && !isNaN(parseInt(productionYearRange[0])) ? productionYearRange[0].trim() : '';
        const endYear = productionYearRange.length > 1 && !isNaN(parseInt(productionYearRange[1])) ? productionYearRange[1].trim() : startYear;

        const modificationObject = {
            "Модификация": translatedModification,
            "Rodzaj silnika": translatedEngineType,
            "Moc": translatedPower,
            "Rodzaj paliwa": translatedFuelType,
            "Rok produkcji": `${startYear}-${endYear}`,
            "Pojemność silnika": translatedVolume,
            "Objętość oleju": translatedOilVolume
        };

        const existingModelIndex = existingMarkData.findIndex(item => item["Модель"] === translatedModel);

        if (existingModelIndex !== -1) {
            existingMarkData[existingModelIndex]["Модификации"].push(modificationObject);
            if (startYear && endYear) {
                existingMarkData[existingModelIndex]["Rok produkcji"] = updateProductionYearRange(existingMarkData[existingModelIndex]["Rok produkcji"], `${startYear}-${endYear}`);
            }
        } else {
            existingMarkData.push({
                "Модель": translatedModel,
                "Rok produkcji": `${startYear}-${endYear}`,
                "Модификации": [modificationObject]
            });
        }
        existingMarkData.sort(sortByModel);
    }
});


function updateProductionYearRange(existingRange, newRange) {
    if (!existingRange) {
        return newRange;
    }
    const existingStartYear = parseInt(existingRange.split('-')[0]);
    const existingEndYear = parseInt(existingRange.split('-')[1]);
    const newStartYear = parseInt(newRange.split('-')[0]);
    const newEndYear = parseInt(newRange.split('-')[1]);

    const updatedStartYear = isNaN(existingStartYear) ? newStartYear : Math.min(existingStartYear, newStartYear);
    const updatedEndYear = isNaN(existingEndYear) ? newEndYear : Math.max(existingEndYear, newEndYear);

    return `${updatedStartYear}-${updatedEndYear}`;
}




function translateEngineType(engineType) {
    const translations = {
        "Дизельный": "Diesel",
        "Электрический": "Electric",
        "Бензиновый": "Petrol",
        "Бензиновый + электричество (гибрид)": "Petrol + Electric Hybrid",
        "Биоэтанол/Бензиновый": "Bioetanol/benzyna",
        "Сжиженный нефтяной газ/сжиженный природный газ": "Gaz płynny/skroplony gaz ziemny",
        "Сжиженный нефтяной газ/Бензиновый": "Gaz skroplony/benzyna",
        "Сжиженный природный газ/Бензиновый": "LNG/benzyna",
        "Дизельный + электричество (гибрид)": "Diesel + elektryczny (hybryda)",
    };
    return translations[engineType] || engineType;
}
function translateFuelType(fuelType) {
    const translations = {
        "Дизель": "Diesel",
        "Электрический": "Electric",
        "Бензин": "Petrol",
        "Бензин + электричество (гибрид)": "Petrol + Electric Hybrid",
        "Биоэтанол/Бензин": "Bioetanol/benzyna",
        "Сжиженный нефтяной газ/сжиженный природный газ": "Gaz płynny/skroplony gaz ziemny",
        "Сжиженный нефтяной газ/Бензин": "Gaz skroplony/benzyna",
        "Сжиженный природный газ/Бензин": "LNG/benzyna",
        "Дизель + электричество (гибрид)": "Diesel + elektryczny (hybryda)",
    };
    return translations[fuelType] || fuelType;
}
function translateVolume(volume) {
    if (typeof volume !== 'string') {
        console.error(`Invalid volume format: ${volume}`);
        return volume;
    }
    const unitTranslations = {
        "кВт)": "kW)",
        "кВт": "kW",
        "куб.": "cubic",
        "см.": "cm",
        "л": "l"
    };
    const splitResult = volume.split('  ');
    if (splitResult.length === 2) {
        const [number, unit] = splitResult;
        const translatedUnit = unitTranslations[unit] || unit;
        return `${number} ${translatedUnit}`;
    } else {
        console.error(`Invalid volume format: ${volume}`);
        return volume;
    }
}
function translateVol(volume) {
    if (typeof volume !== 'string') {
        console.error(`Invalid volume format: ${volume}`);
        return volume;
    }
    const replacedVolume = volume.replace(/кВт/g, 'kW');
    return replacedVolume.replace(/[а-яА-Я]/g, '');
}
function removeCyrillic(input) {
    const cyrillicToLatinMap = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e',
        'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k',
        'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r',
        'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts',
        'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'y', 'ь': '',
        'э': 'e', 'ю': 'yu', 'я': 'ya',
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E',
        'Ё': 'E', 'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K',
        'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R',
        'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts',
        'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch', 'Ъ': '', 'Ы': 'Y', 'Ь': '',
        'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
    };
    return input.replace(/[а-яА-ЯёЁ]/g, match => cyrillicToLatinMap[match] || match);
}
function translateTitle(title) {
    if (typeof title !== 'string') {
        console.error(`Invalid title format: ${title}`);
        return title;
    }
    return removeCyrillic(title);
}
function translatePower(power) {
    if (typeof power !== 'string') {
        console.error(`Invalid power format: ${power}`);
        return power;
    }
    const regexMatch = power.match(/(\d+)\s*л\.с\.\s*\/\s*(\d+)\s*кВт|\d+\s*kW/);
    if (regexMatch) {
        const horsepower = regexMatch[1] || '';
        const kilowatts = regexMatch[2] || '';
        return `${horsepower} k.m. / ${kilowatts} kW`;
    } else {
        console.error(`Invalid power format: ${power}`);
        return power;
    }
}
function sortByModel(a, b) {
    const modelA = (a["Модель"]);
    const modelB = (b["Модель"]);

    if (modelA < modelB) {
        return -1;
    }
    if (modelA > modelB) {
        return 1;
    }
    return 0;
}


const resultArray = Object.keys(groupedData).map(mark => ({
    "Марка": mark,
    "Модели": groupedData[mark]
}));

const resultJson = JSON.stringify(resultArray, null, 2);

fs.writeFileSync('result4.json', resultJson);




