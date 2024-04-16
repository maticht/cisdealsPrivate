const texts = {
    en: require('./locales/texts_en.js'),
    ua: require('./locales/texts_ua.js'),
    ru: require('./locales/texts_ru.js'),
    pl: require('./locales/texts_pl.js'),
};

function chunkArray(array, size) {
    const chunkedArr = [];
    let index = 0;
    while (index < array.length) {
        chunkedArr.push(array.slice(index, size + index));
        index += size;
    }
    return chunkedArr;
}

function propertyOutput(value, language) {
    if (value === 'House') {
        return texts[language].HOUSE;
    } else if (value === 'Room') {
        return texts[language].ROOM;
    } else if (value === 'Flat') {
        return texts[language].FLAT;
    }
}

function adTypeOutput(value, language) {
    if (value === 'Owner') {
        return texts[language].OWNER;
    } else if (value === 'Agency') {
        return texts[language].AGENCY;
    } else if (value === 'Any') {
        return texts[language].ANY_CALL;
    }
}

function dateOutput(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${day.toString().length === 1 ? `0${day}` : `${day}`}.${month.toString().length === 1 ? `0${month}` : `${month}`}.${year} | ${hours}:${minutes.toString().length === 1 ? `0${minutes}` : `${minutes}`}`;
}

function roomsNumberOutput(roomsValue) {
    if (roomsValue === 'Kawalerka') {
        return '1';
    } else if (roomsValue === '2 pokoje') {
        return '2';
    } else if (roomsValue === '3 pokoje') {
        return '3';
    } else if (roomsValue === '4 i więcej') {
        return '4+';
    }
}

function addToQueue(id, arr) {
    arr.unshift(id);
    if (arr.length > 60) {
        arr.pop();
    }
}

function pingServer() {
    setInterval(() => {
        fetch("http://test.server195361.nazwa.pl/")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Произошла ошибка при выполнении запроса');
                }
                return response.text();
            })
            .then(data => {
                console.log('Ответ от сервера:', data);
            })
            .catch(error => {
                console.error('Произошла ошибка:', error.message);
            })
    }, 3 * 60 * 60 * 1000);
}


module.exports = {chunkArray, propertyOutput, adTypeOutput, dateOutput, roomsNumberOutput, addToQueue, pingServer}