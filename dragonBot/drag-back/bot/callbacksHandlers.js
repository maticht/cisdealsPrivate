const {callbacks} = require('./callbacks');
const {chunkArray, propertyOutput, adTypeOutput} = require('./helpers');
const {User} = require("../models/user");
const texts = {
    en: require('./locales/texts_en.js'),
    ua: require('./locales/texts_ua.js'),
    ru: require('./locales/texts_ru.js'),
    pl: require('./locales/texts_pl.js'),
};

const languageMap = new Map(); // ключ: айди чата, значение: texts[выбранный язык]
const userChoiceArr = {}; // массив [айди чата] а в нем поля с выбором
const chatStates = {}; // массив [айди чата] а в нем состояние чата(ожидает ли бот сообщение от пользователя)
const msgId = {}; // массив [айди чата] а в нем айди сообщения

// const setUsersLanguages = async () => {
//     const users = await User.find();
//     users.map((user) => {
//         languageMap.set(user.chatId, user.language);
//         userChoiceArr[user.chatId] = {
//             city: '',
//             filters: {},
//             districts: [],
//             property_type: '',
//             rooms_number: [],
//             minPrice: 0,
//             maxPrice: 40000,
//             price: '',
//             minSquare: 0,
//             maxSquare: 800,
//             square: '',
//             ad_type: '',
//         }
//         console.log(`Для пользователя ${user.firstName} установлен язык ${user.language}`)
//     })
//     console.log(languageMap)
// }
//
//
// const langButtons = [
//     [{text: 'English 🇬🇧', callback_data: 'en'}, {text: 'Polski 🇵🇱', callback_data: 'pl'}],
//     [{text: 'Русский 🇷🇺', callback_data: 'ru'}, {text: 'Українська 🇺🇦', callback_data: 'ua'}],
// ];
// const langButtonsStart = [
//     [{text: 'English 🇬🇧', callback_data: 'start:en'}, {text: 'Polski 🇵🇱', callback_data: 'start:pl'}],
//     [{text: 'Русский 🇷🇺', callback_data: 'start:ru'}, {text: 'Українська 🇺🇦', callback_data: 'start:ua'}],
// ];


function handleCallbacks(bot) {

    bot.onText(/\/start/, async (msg) => {
        try {
            const chatId = msg.chat.id;

            let user = await User.findOne({chatId: chatId});

            if (!user) {
                user = await new User({
                    firstName: msg.from.first_name,
                    lastName: msg.from.last_name,
                    username: msg.from.username,
                    chatId: chatId
                }).save();
            }
            console.log(user)
            // const botMessage = await bot.sendMessage(chatId, `Пользователь создан`, {
            //     reply_markup: {
            //         inline_keyboard: langButtonsStart
            //     },
            // });
            // msgId[chatId] = botMessage.message_id;
        } catch (e) {
            console.log(e.message);
        }

    });


    // bot.onText(/\/info/, async (msg) => {
    //     try {
    //         const chatId = msg.chat.id;
    //         try {
    //             await bot.deleteMessage(chatId, msgId[chatId]);
    //         } catch (e) {
    //             console.error(e.message)
    //         }
    //
    //         let user = await User.findOne({chatId: chatId});
    //         const language = texts[user.language];
    //         languageMap.set(chatId, user.language);
    //         const infoButtons = [
    //             [{text: `${language.CHANGE_LANG} 🙊`, callback_data: callbacks.CHANGE_LANG}],
    //             [{text: language.MY_SEARCHES, callback_data: callbacks.CHECK_SEARCHES}],
    //         ];
    //         const botMessage = await bot.sendMessage(chatId, `${language.LANGUAGE_SELECTED}\n${language.SUB_STATUS}: ${user.subscription ? language.SUB_STATUS_PREMIUM : language.SUB_STATUS_FREE}`, {
    //             reply_markup: {
    //                 inline_keyboard: infoButtons
    //             },
    //         });
    //         msgId[chatId] = botMessage.message_id;
    //         try {
    //             await bot.deleteMessage(chatId, msg.message_id);
    //         } catch (e) {
    //             console.error(e.message)
    //         }
    //     } catch (e) {
    //         console.log(e.message);
    //     }
    // });
    //
    //
    // bot.onText(/\/searches/, async (msg) => {
    //     try {
    //         const chatId = msg.chat.id;
    //         try {
    //             await bot.deleteMessage(chatId, msgId[chatId]);
    //         } catch (e) {
    //             console.error(e.message)
    //         }
    //         const user = await User.findOne({chatId: chatId});
    //         const language = texts[user.language];
    //         languageMap.set(chatId, user.language);
    //         if (user.searches.length === 0) {
    //             const botMessage = await bot.sendMessage(chatId, `${language.NO_SEARCHES}`, {
    //                 reply_markup: {
    //                     inline_keyboard: [
    //                         [
    //                             {text: language.YES, callback_data: callbacks.SET_SEARCH_FLAG_TRUE},
    //                             {text: language.NO, callback_data: callbacks.SET_SEARCH_FLAG_FALSE},
    //                         ]
    //                     ]
    //                 },
    //             });
    //             msgId[chatId] = botMessage.message_id;
    //
    //         } else {
    //             const searchesButtons = user.searches.map((search) => ({
    //                 text: `${search.city} 🌆 ${search.filters ? `, ${propertyOutput(search.property_type, languageMap.get(chatId))}🏠` : ''}`,
    //                 callback_data: `get_search:${search.id}`,
    //             }));//кнопки
    //             const newButtons = chunkArray([...searchesButtons], 1);
    //             if (user.searches.length < 2 && user.subscription) {
    //                 const addNewSearch = {
    //                     text: language.ADD_NEW_SEARCH,
    //                     callback_data: callbacks.SET_SEARCH_FLAG_TRUE
    //                 };
    //                 newButtons.push([addNewSearch]);
    //             }
    //             const botMessage = await bot.sendMessage(chatId, `${language.YOUR_SEARCHES}`, {
    //                 reply_markup: {
    //                     inline_keyboard: newButtons
    //                 }
    //             });
    //             msgId[chatId] = botMessage.message_id;
    //         }
    //         try {
    //             await bot.deleteMessage(chatId, msg.message_id);
    //         } catch (e) {
    //             console.error(e.message)
    //         }
    //     } catch (e) {
    //         console.log(e.message);
    //     }
    // });


//     bot.on('callback_query', async (callbackQuery) => {
//
//         try {
//
//
//             const chatId = callbackQuery.message.chat.id;
//             const data = callbackQuery.data;
//             console.log(data, languageMap.get(chatId))
//             console.log(chatId)
//             if (msgId[chatId] !== callbackQuery.message.message_id) {
//                 const user = await User.findOne({chatId: chatId});
//                 const language = texts[user.language];
//                 await bot.answerCallbackQuery(callbackQuery.id, `${language.OLD_MESSAGE}`);
//                 //await bot.answerCallbackQuery(callbackQuery.id, `${texts[languageMap.get(chatId)].OLD_MESSAGE}`); //TODO ПОЧЕМУ НЕ РАБОТАЕТ
//                 return;
//             }
//
//             msgId[chatId] = callbackQuery.message.message_id;
//
//
//             /* Изменение языка, после нажатия на кнопку изменить язык, в команде Info*/
//             if (data === callbacks.CHANGE_LANG) {
//                 const language = texts[languageMap.get(chatId)];
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//
//                     const botMessage = await bot.sendMessage(chatId, `${language.CHOOSE_LANG}`, {
//                         reply_markup: {
//                             inline_keyboard: langButtons
//                         },
//                     });
//                     msgId[chatId] = botMessage.message_id;
//                 } catch (e) {
//                     console.error(e.message)
//                     return
//                 }
//                 return
//             }
//
//
//             /* Обработка выбора языка, после нажатия на кнопку с языком */
//             if (data === 'en' || data === 'ua' || data === 'ru' || data === 'pl') {
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//                 } catch (e) {
//                     console.error(e.message)
//                 }
//                 languageMap.set(chatId, data || 'en');
//                 let user = await User.findOne({chatId: chatId});
//                 user.language = data;
//                 await user.save();
//                 await bot.answerCallbackQuery(callbackQuery.id, `${texts[languageMap.get(chatId)].LANGUAGE_SELECTED}`);
//                 return
//             }
//
//             /* Обработка выбора языка, после команды /start */
//             if (data.startsWith('start')) {
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//                 } catch (e) {
//                     console.error(e.message)
//                 }
//                 const lang = data.split(":")[1];
//                 languageMap.set(chatId, lang || 'en');
//                 const language = texts[languageMap.get(chatId)];
//                 let user = await User.findOne({chatId: chatId});
//                 user.language = lang;
//                 await user.save();
//                 //await bot.answerCallbackQuery(callbackQuery.id, `${language.LANGUAGE_SELECTED}`);
//                 if (user.searches.length === 0) {
//                     const botMessage = await bot.sendMessage(chatId, `${language.HI}, ${user.firstName}!👋 ${language.GREETING}`, {
//                         parse_mode: "HTML",
//                         reply_markup: {
//                             inline_keyboard: [
//
//                                 [{text: language.START_SEARCH, callback_data: callbacks.SET_SEARCH_FLAG_TRUE}],
//                                 [{
//                                     text: language.START_SEARCH_LATER,
//                                     callback_data: callbacks.SET_SEARCH_FLAG_FALSE
//                                 }],
//
//                             ]
//                         },
//                     });
//                     msgId[chatId] = botMessage.message_id;
//                     return
//                 }
//             }
//
//
//             /* Отображение сохраненных поисков */
//             if (data === callbacks.CHECK_SEARCHES) {
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//                 } catch (e) {
//                     console.error(e.message)
//                 }
//                 const user = await User.findOne({chatId: chatId});
//                 const language = texts[languageMap.get(chatId)];
//                 if (user.searches.length === 0) {
//                     const botMessage = await bot.sendMessage(chatId, `${language.NO_SEARCHES}`, {
//                         reply_markup: {
//                             inline_keyboard: [
//                                 [
//                                     {text: language.YES, callback_data: callbacks.SET_SEARCH_FLAG_TRUE},
//                                     {text: language.NO, callback_data: callbacks.SET_SEARCH_FLAG_FALSE},
//                                 ]
//                             ]
//                         },
//                     });
//                     msgId[chatId] = botMessage.message_id;
//                 } else {
//                     const searchesButtons = user.searches.map((search) => ({
//                         text: `${search.city} 🌆 ${search.filters ? `, ${propertyOutput(search.property_type, languageMap.get(chatId))}🏠` : ''}`,
//                         callback_data: `get_search:${search.id}`,
//                     }));//кнопки
//                     const newButtons = chunkArray([...searchesButtons], 1);
//                     if (user.searches.length < 2 && user.subscription) {
//                         const addNewSearch = {
//                             text: language.ADD_NEW_SEARCH,
//                             callback_data: callbacks.SET_SEARCH_FLAG_TRUE
//                         };
//                         newButtons.push([addNewSearch]);
//                     }
//                     const botMessage = await bot.sendMessage(chatId, `${language.YOUR_SEARCHES}`, {
//                         reply_markup: {
//                             inline_keyboard: newButtons
//                         }
//                     })
//                     msgId[chatId] = botMessage.message_id;
//                 }
//                 return
//             }
//
//
//             /* Отобразить конкретный поиск*/
//             if (data.startsWith("get_search")) {
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//                 } catch (e) {
//                     console.error(e.message)
//                 }
//                 const searchId = data.split(":")[1];
//                 console.log(searchId)
//                 const user = await User.findOne({chatId: chatId});
//                 const language = texts[languageMap.get(chatId)];
//                 const search = user.searches.find((search) => search.id === searchId);
//                 console.log(search)
//                 const resultString = `<b>${language.CITY}:</b> ${search.city} ${search.filters ?
//                     `${search.districts.length !== 0 ? `\n<b>${language.DISTRICTS}:</b> ${search.districts}` : ''}
// <b>${language.PROPERTY_TYPE}:</b> ${propertyOutput(search.property_type, languageMap.get(chatId))} ${search.property_type === 'Flat' ?
//                         `\n<b>${language.ROOMS_NUMBER}:</b> ${search.rooms_number}` : ``}
// <b>${language.RENT_PRICE}:</b> ${search.price} zł ${search.property_type !== 'Room' ?
//                         `\n<b>${language.RENT_AREA}:</b> ${search.square} ${language.M2}` : ``}
// <b>${language.AD_TYPE}:</b> ${adTypeOutput(search.ad_type, languageMap.get(chatId))}` : ''}`;
//
//                 const botMessage = await bot.sendMessage(chatId, `${resultString}`, {
//                     parse_mode: "HTML",
//                     reply_markup: {
//                         inline_keyboard: [
//
//                             [{text: `${language.CONTINUE}`, callback_data: callbacks.CONTINUE}],
//                             [{text: `${language.DELETE_SEARCH}`, callback_data: `delete_search:${searchId}`}],
//
//                         ]
//                     }
//                 });
//                 msgId[chatId] = botMessage.message_id;
//                 return
//             }
//
//
//             if (data === callbacks.CONTINUE) {
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//                 } catch (e) {
//                     console.error(e.message);
//                 }
//                 return
//             }
//
//
//             /* Удалить конкретный поиск*/
//             if (data.startsWith("delete_search")) {
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//                 } catch (e) {
//                     console.error(e.message);
//                 }
//                 const searchId = data.split(":")[1];
//                 console.log(searchId)
//                 const user = await User.findOne({chatId: chatId});
//                 const language = texts[languageMap.get(chatId)];
//                 user.searches = user.searches.filter((search) => search.id !== searchId);
//                 await user.save();
//
//                 // const botMessage = await bot.sendMessage(chatId, `${language.SEARCH_DELETED}`);
//                 // setTimeout(async () => {
//                 //     try {
//                 //         await bot.deleteMessage(chatId, botMessage.message_id);
//                 //     } catch (e) {
//                 //         console.error(e)
//                 //     }
//                 // }, 5000);
//
//                 await bot.answerCallbackQuery(callbackQuery.id, `${language.SEARCH_DELETED}`);
//                 return;
//             }
//
//
//             /* При старте нового поиска первое диалоговое окно с выбором города */
//             if (data === callbacks.SET_SEARCH_FLAG_TRUE) {
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//                 } catch (e) {
//                     console.error(e.message);
//                 }
//                 const language = texts[languageMap.get(chatId)];
//                 const cityButtons = Object.keys(callbacks.cities).map((cityKey) => ({
//                     text: callbacks.cities[cityKey],
//                     callback_data: `city:${cityKey}`,
//                 }));
//                 const buttons = chunkArray(cityButtons, 3)
//                 buttons.push([{text: language.NO_CITY, callback_data: callbacks.NO_CITY}]);
//                 const botMessage = await bot.sendMessage(chatId, `${language.CHOOSE_CITY}`, {
//                     reply_markup: {
//                         inline_keyboard: buttons
//                     },
//                 });
//                 msgId[chatId] = botMessage.message_id;
//                 return;
//             }
//
//
//             /* При отказе в старте нового поиска просто удаляется последнее сообщение от бота */
//             if (data === callbacks.SET_SEARCH_FLAG_FALSE) {
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//                 } catch (e) {
//                     console.error(e.message)
//                 }
//                 return
//             }
//
//
//             /* После выбора города идет предложение выставить дополнительные фильтры */
//             if (data.startsWith('city:')) {
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//                 } catch (e) {
//                     console.error(e.message)
//                 }
//                 const language = texts[languageMap.get(chatId)];
//                 const cityKey = data.split(':')[1];
//                 userChoiceArr[chatId].city = callbacks.cities[cityKey];
//                 const chooseFilterButtons = [
//                     [{text: `${language.SET_FILTERS}`, callback_data: callbacks.SET_FILTERS}],
//                     [{text: language.SET_NO_FILTERS, callback_data: callbacks.SET_NO_FILTERS}],
//                 ]
//                 const botMessage = await bot.sendMessage(chatId, `${language.QUESTION_ABOUT_FILTERS}`, {
//                     reply_markup: {
//                         inline_keyboard: chooseFilterButtons
//                     },
//                 });
//                 msgId[chatId] = botMessage.message_id;
//                 return
//             }
//
//
//             /* Если города нет на кнопках, пользователь нажимает на кнопку, что города нет в списке, бот включает режим ожидания ввода города */
//             if (data === callbacks.NO_CITY) {
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//                 } catch (e) {
//                     console.error(e.message)
//                 }
//                 const language = texts[languageMap.get(chatId)];
//                 //включение ожидания
//                 chatStates[chatId] = 'waiting_for_city';
//                 const botMessage = await bot.sendMessage(chatId, language.MANUAL_CITY_INPUT);
//                 //сохранение айди сообщения с просьбой ввести город вручную, это надо, чтобы мы потом могли удалить это сообщение, когда город будет введен
//                 msgId[chatId] = botMessage.message_id;
//                 return;
//             }
//
//
//             /* Если фильтры не заданы, то отображение имеющихся поисков*/
//             if (data === callbacks.SET_NO_FILTERS) {
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//                 } catch (e) {
//                     console.error(e.message)
//                 }
//                 userChoiceArr[chatId].filters = false;
//                 const language = texts[languageMap.get(chatId)];
//                 const user = await User.findOne({chatId: chatId});
//                 user.searches.push({
//                     city: userChoiceArr[chatId].city,
//                     filters: userChoiceArr[chatId].filters,
//                 });
//                 await user.save();
//                 const botMessage = await bot.sendMessage(chatId, `${language.SUCCESS_SEARCH_ADD}`, {parse_mode: "HTML"});
//                 setTimeout(async () => {
//                     try {
//                         await bot.deleteMessage(chatId, botMessage.message_id);
//                     } catch (e) {
//                         console.error(e.message)
//                     }
//                 }, 15000);
//                 return
//             }
//
//
//             /* Если пользователь решил выбрать дополнительные фильтры, то проверяем есть ли город в списке заданных городов,
//              у которых есть районы, если город в списке есть, то выбираем район, если такого города в списке нет, то предлагаем
//              выбрать тип жилья*/
//             if (data === callbacks.SET_FILTERS) {
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//                 } catch (e) {
//                     console.error(e.message)
//                 }
//                 const language = texts[languageMap.get(chatId)];
//                 userChoiceArr[chatId].filters = true;
//                 userChoiceArr[chatId].districts = [];
//                 // Получаем ключ (название города в капсе) из объекта cities
//                 const cityKey = Object.keys(callbacks.cities).find((key) => callbacks.cities[key] === userChoiceArr[chatId].city);
//                 // Проверяем, есть ли такой ключ в объекте districts
//                 if (callbacks.districts[cityKey]) {
//                     // Если ключ существует, выводим все районы для этого города
//                     const cityDistricts = callbacks.districts[cityKey]; //массив
//                     const districtButtons = Object.keys(cityDistricts).map((districtKey) => ({
//                         text: `⚪️ ${cityDistricts[districtKey]}`,
//                         callback_data: `district:${cityDistricts[districtKey]}`,
//                     }));//кнопки
//                     const selectionButton = {
//                         text: userChoiceArr[chatId].districts.length === 0 ? language.CHOOSE_ALL : language.CANCEL_SELECTION,
//                         callback_data: userChoiceArr[chatId].districts.length === 0 ? 'district:all' : 'district:none'
//                     };
//                     const newButtons = chunkArray(districtButtons, 3);
//                     newButtons.push([selectionButton]);
//                     const botMessage = await bot.sendMessage(chatId, `${language.CHOOSE_DISTRICTS}`, {
//                         reply_markup: {
//                             inline_keyboard: newButtons
//                         },
//                     });
//                     msgId[chatId] = botMessage.message_id;
//                 } else {
//                     const typeOfPropertyButtons = [
//                         [
//                             {text: language.FLAT, callback_data: callbacks.property_type.FLAT},
//                             {text: language.ROOM, callback_data: callbacks.property_type.ROOM},
//                             {text: language.HOUSE, callback_data: callbacks.property_type.HOUSE}
//                         ],
//                     ];
//                     const botMessage = await bot.sendMessage(chatId, `${language.CHOOSE_TYPE_OF_PROPERTY}`, {
//                         reply_markup: {
//                             inline_keyboard: typeOfPropertyButtons
//                         },
//                     });
//                     msgId[chatId] = botMessage.message_id;
//                     return
//                 }
//             }
//
//
//             /* Обработчик нажатий на кнопки районов, это нужно для того, чтобы менялись белые эмодзи на зеленые и было видно,
//              какие районы выбрал пользователь, этот обработчик просто редактирует сообщение с выбором районов  */
//             if (data.startsWith('district:')) {
//                 const selectedCity = Object.keys(callbacks.cities).find((key) => callbacks.cities[key] === userChoiceArr[chatId].city);
//                 let districtButtons = {}
//                 const language = texts[languageMap.get(chatId)];
//                 if (data.split(':')[1] === 'all') {
//                     for (const distKey in callbacks.districts[selectedCity]) {
//                         if (callbacks.districts[selectedCity].hasOwnProperty(distKey)) {
//                             const distValue = callbacks.districts[selectedCity][distKey];
//                             userChoiceArr[chatId].districts.push(distValue);
//                         }
//                     }
//                     districtButtons = Object.keys(callbacks.districts[selectedCity]).map((districtKey) => ({
//                         text: `🟢 ${callbacks.districts[selectedCity][districtKey]}`,
//                         callback_data: `district:${callbacks.districts[selectedCity][districtKey]}`,
//                     }));
//                 } else if (data.split(':')[1] === 'none') {
//                     userChoiceArr[chatId].districts = [];
//                     districtButtons = Object.keys(callbacks.districts[selectedCity]).map((districtKey) => ({
//                         text: `⚪️ ${callbacks.districts[selectedCity][districtKey]}`,
//                         callback_data: `district:${callbacks.districts[selectedCity][districtKey]}`,
//                     }));
//                 } else {
//
//                     const selectedDistrict = data.split(':')[1];
//
//                     // Проверяем, есть ли район уже в выбранных, если есть - удаляем, если нет - добавляем
//                     if (userChoiceArr[chatId].districts.includes(selectedDistrict)) {
//                         userChoiceArr[chatId].districts = userChoiceArr[chatId].districts.filter((district) => district !== selectedDistrict);
//                     } else {
//                         userChoiceArr[chatId].districts.push(selectedDistrict);
//                     }
//                     districtButtons = Object.keys(callbacks.districts[selectedCity]).map((districtKey) => ({
//                         text: `${userChoiceArr[chatId].districts.includes(callbacks.districts[selectedCity][districtKey]) ? '🟢' : '⚪️'} ${callbacks.districts[selectedCity][districtKey]}`,
//                         callback_data: `district:${callbacks.districts[selectedCity][districtKey]}`,
//                     }));
//                 }
//
//                 // Формируем кнопки для районов и кнопку подтверждения
//
//                 const confirmationButton = {
//                     text: language.CONFIRM_SELECTION,
//                     callback_data: 'confirm_selection_districts',
//                 };
//
//                 const selectionButton = {
//                     text: userChoiceArr[chatId].districts.length === 0 ? language.CHOOSE_ALL : language.CANCEL_SELECTION,
//                     callback_data: userChoiceArr[chatId].districts.length === 0 ? 'district:all' : 'district:none'
//                 };
//
//                 const newButtons = chunkArray([...districtButtons], 3);
//                 newButtons.push([selectionButton])
//                 if (userChoiceArr[chatId].districts.length !== 0) {
//                     newButtons.push([confirmationButton])
//                 }
//
//                 // Обновляем сообщение с новыми кнопками и эмодзи
//                 await bot.editMessageText(language.CHOOSE_DISTRICTS, {
//                     chat_id: chatId,
//                     message_id: callbackQuery.message.message_id,
//                     reply_markup: {
//                         inline_keyboard: newButtons,
//                     },
//                 });
//
//
//             }
//
//
//             /* После нажатия кнопки подтверждения при выборе районов, предлагаем выбрать тип жилья*/
//             if (data === 'confirm_selection_districts') {
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//                 } catch (e) {
//                     console.error(e.message)
//                 }
//                 const language = texts[languageMap.get(chatId)];
//                 const typeOfPropertyButtons = [
//                     [
//                         {text: language.FLAT, callback_data: callbacks.property_type.FLAT},
//                         {text: language.ROOM, callback_data: callbacks.property_type.ROOM},
//                         {text: language.HOUSE, callback_data: callbacks.property_type.HOUSE}
//                     ],
//                 ];
//                 const botMessage = await bot.sendMessage(chatId, `${language.CHOOSE_TYPE_OF_PROPERTY}`, {
//                     reply_markup: {
//                         inline_keyboard: typeOfPropertyButtons
//                     },
//                 });
//                 msgId[chatId] = botMessage.message_id;
//                 return
//             }
//
//
//             /* После выбора типа жилья предлагаем выбрать кол-во комнат*/
//             if (data.startsWith('property_type:')) {
//                 userChoiceArr[chatId].property_type = data.split(':')[1];
//                 userChoiceArr[chatId].rooms_number = []
//                 const language = texts[languageMap.get(chatId)];
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//                 } catch (e) {
//                     console.error(e.message)
//                 }
//
//                 if (data.split(':')[1] === 'Flat') {
//                     const numberOfRoomsButtons = [
//                         {text: "⚪️ 1", callback_data: callbacks.number_of_rooms.ONE}, {
//                             text: "⚪️ 2",
//                             callback_data: callbacks.number_of_rooms.TWO
//                         },
//                         {text: "⚪️ 3", callback_data: callbacks.number_of_rooms.THREE}, {
//                             text: "⚪️ 4+",
//                             callback_data: callbacks.number_of_rooms.FOUR_PLUS
//                         },
//                     ];
//                     const selectionButton = {
//                         text: userChoiceArr[chatId].rooms_number.length === 0 ? language.CHOOSE_ALL : language.CANCEL_SELECTION,
//                         callback_data: userChoiceArr[chatId].rooms_number.length === 0 ? 'number_of_rooms:all' : 'number_of_rooms:none'
//                     };
//                     const newButtons = chunkArray(numberOfRoomsButtons, 2);
//                     newButtons.push([selectionButton]);
//
//                     const botMessage = await bot.sendMessage(chatId, `${language.CHOOSE_NUMBER_OF_ROOMS}`, {
//                         reply_markup: {
//                             inline_keyboard: newButtons
//                         },
//                     });
//                     msgId[chatId] = botMessage.message_id;
//                     return;
//                 } else {
//                     chatStates[chatId] = 'waiting_for_price';
//                     const botMessage = await bot.sendMessage(chatId, language.CHOOSE_RENT_PRICE);
//                     //сохранение айди сообщения с просьбой ввести цену, это надо, чтобы мы потом могли удалить это сообщение, когда цена будет введена
//                     msgId[chatId] = botMessage.message_id;
//                     return;
//                 }
//
//             }
//
//
//             /* Обработчик нажатий на кнопки кол-ва комнат, это нужно для того, чтобы менялись белые эмодзи на зеленые и было видно,
//             какие варианты выбрал пользователь, этот обработчик просто редактирует сообщение с выбором кол-ва комнат */
//             if (data.startsWith('number_of_rooms:')) {
//                 let numberOfRoomsButtons = {}
//                 const language = texts[languageMap.get(chatId)];
//                 if (data.split(':')[1] === 'all') {
//                     for (const numberOfRoomsKey in callbacks.number_of_rooms) {
//                         if (callbacks.number_of_rooms.hasOwnProperty(numberOfRoomsKey)) {
//                             const numOfRoomValue = callbacks.number_of_rooms[numberOfRoomsKey];
//                             userChoiceArr[chatId].rooms_number.push(numOfRoomValue.split(":")[1]);
//                         }
//                     }
//                     numberOfRoomsButtons = Object.keys(callbacks.number_of_rooms).map((roomKey) => ({
//                         text: `🟢 ${callbacks.number_of_rooms[roomKey].split(":")[1]}`,
//                         callback_data: `${callbacks.number_of_rooms[roomKey]}`,
//                     }));
//
//                 } else if (data.split(':')[1] === 'none') {
//                     userChoiceArr[chatId].rooms_number = []
//                     numberOfRoomsButtons = Object.keys(callbacks.number_of_rooms).map((roomKey) => ({
//                         text: `⚪️ ${callbacks.number_of_rooms[roomKey].split(":")[1]}`,
//                         callback_data: `${callbacks.number_of_rooms[roomKey]}`,
//                     }));
//                 } else {
//                     const selectedRoomChoice = data.split(':')[1];
//                     // Проверяем, есть ли количество комнат уже в выбранных, если есть - удаляем, если нет - добавляем
//                     if (userChoiceArr[chatId].rooms_number.includes(selectedRoomChoice)) {
//                         userChoiceArr[chatId].rooms_number = userChoiceArr[chatId].rooms_number.filter((roomChoice) => roomChoice !== selectedRoomChoice);
//                     } else {
//                         userChoiceArr[chatId].rooms_number.push(selectedRoomChoice);
//                     }
//                     numberOfRoomsButtons = Object.keys(callbacks.number_of_rooms).map((roomKey) => ({
//                         text: `${userChoiceArr[chatId].rooms_number.includes(callbacks.number_of_rooms[roomKey].split(":")[1]) ? '🟢' : '⚪️'} ${callbacks.number_of_rooms[roomKey].split(":")[1]}`,
//                         callback_data: `${callbacks.number_of_rooms[roomKey]}`,
//                     }));
//                 }
//
//                 const confirmationButton = {
//                     text: language.CONFIRM_SELECTION,
//                     callback_data: 'confirm_selection_rooms',
//                 };
//
//                 const selectionButton = {
//                     text: userChoiceArr[chatId].rooms_number.length === 0 ? language.CHOOSE_ALL : language.CANCEL_SELECTION,
//                     callback_data: userChoiceArr[chatId].rooms_number.length === 0 ? 'number_of_rooms:all' : 'number_of_rooms:none'
//                 };
//
//                 const newButtons = chunkArray([...numberOfRoomsButtons], 2);
//                 newButtons.push([selectionButton])
//                 if (userChoiceArr[chatId].rooms_number.length !== 0) {
//                     newButtons.push([confirmationButton])
//                 }
//
//                 // Обновляем сообщение с новыми кнопками и эмодзи
//                 await bot.editMessageText(language.CHOOSE_NUMBER_OF_ROOMS, {
//                     chat_id: chatId,
//                     message_id: callbackQuery.message.message_id,
//                     reply_markup: {
//                         inline_keyboard: newButtons,
//                     },
//                 });
//             }
//
//
//             /* После нажатия кнопки подтверждения при выборе кол-ва комнат, предлагаем написать цену аренды*/
//             if (data === 'confirm_selection_rooms') {
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//                 } catch (e) {
//                     console.error(e.message)
//                 }
//                 const language = texts[languageMap.get(chatId)];
//                 //включение ожидания цены
//                 chatStates[chatId] = 'waiting_for_price';
//                 const botMessage = await bot.sendMessage(chatId, language.CHOOSE_RENT_PRICE);
//                 //сохранение айди сообщения с просьбой ввести цену, это надо, чтобы мы потом могли удалить это сообщение, когда цена будет введена
//                 msgId[chatId] = botMessage.message_id;
//                 return;
//             }
//
//
//             /*После выбора типа объявления сохраняем поиск и отравляем его в бд*/
//             if (data.startsWith("ad_type")) {
//                 try {
//                     await bot.deleteMessage(chatId, msgId[chatId]);
//                 } catch (e) {
//                     console.error(e.message)
//                 }
//                 const user = await User.findOne({chatId: chatId});
//                 const language = texts[user.language];
//                 userChoiceArr[chatId].ad_type = data.split(":")[1];
//                 const botMessage = await bot.sendMessage(chatId, `${language.SUCCESS_SEARCH_ADD} \n\n<b>${language.CITY}</b>: ${userChoiceArr[chatId].city}\n${userChoiceArr[chatId].filters ? `${userChoiceArr[chatId].districts.length !== 0 ? `<b>${language.DISTRICTS}:</b> ${userChoiceArr[chatId].districts}\n` : ''}<b>${language.PROPERTY_TYPE}</b>: ${propertyOutput(userChoiceArr[chatId].property_type, user.language)}\n${userChoiceArr[chatId].property_type === 'Flat' ? `<b>${language.ROOMS_NUMBER}</b>: ${userChoiceArr[chatId].rooms_number}\n` : ''}<b>${language.AD_TYPE}</b>: ${adTypeOutput(userChoiceArr[chatId].ad_type, user.language)}\n<b>${language.RENT_PRICE}</b>: ${userChoiceArr[chatId].price} zł\n${userChoiceArr[chatId].property_type !== 'Room' ? `<b>${language.RENT_AREA}</b>: ${userChoiceArr[chatId].square} ${language.M2}\n` : ''}` : ''}`, {parse_mode: "HTML"});
//                 setTimeout(async () => {
//                     try {
//                         await bot.deleteMessage(chatId, botMessage.message_id);
//                     } catch (e) {
//                         console.error(e.message)
//                     }
//                 }, 15000);
//
//                 user.searches.push({
//                     city: userChoiceArr[chatId].city,
//                     filters: userChoiceArr[chatId].filters,
//                     districts: userChoiceArr[chatId].districts.toString(),
//                     property_type: userChoiceArr[chatId].property_type,
//                     rooms_number: userChoiceArr[chatId].rooms_number.toString(),
//                     min_price: userChoiceArr[chatId].minPrice,
//                     max_price: userChoiceArr[chatId].maxPrice,
//                     price: userChoiceArr[chatId].price,
//                     min_square: userChoiceArr[chatId].minSquare,
//                     max_square: userChoiceArr[chatId].maxSquare,
//                     square: userChoiceArr[chatId].square,
//                     ad_type: userChoiceArr[chatId].ad_type
//                 });
//                 await user.save();
//             }
//         } catch (e) {
//             console.log(e.message);
//         }
//     });


    /*Обработка сообщений от пользователей (ответы на вопросы о городе, цене, площади)*/
    // bot.onText(/^(?!\/).*$/, async (msg) => {
    //     try {
    //
    //
    //         const chatId = msg.chat.id;
    //         const messageFromCustomer = msg.text.trim();
    //         const language = texts[languageMap.get(chatId)];
    //         const hasDigits = /\d/.test(messageFromCustomer);
    //         let isValidRangeNumbers = /^\d+-\d+$/.test(messageFromCustomer);
    //         let isValidRange;
    //         console.log(messageFromCustomer);
    //         if (isValidRangeNumbers) {
    //
    //             const firstNumber = parseInt(messageFromCustomer.split("-")[0]);
    //             const secondNumber = parseInt(messageFromCustomer.split("-")[1]);
    //             console.log(firstNumber, secondNumber)
    //             isValidRange = firstNumber > 0 && secondNumber > 0 && firstNumber < secondNumber;
    //         }
    //         console.log(isValidRangeNumbers, isValidRange)
    //         // Если бот находится в режиме ожидания ввода города, обрабатываем его здесь
    //         if (chatStates[chatId] === 'waiting_for_city') {
    //             try {
    //                 await bot.deleteMessage(chatId, msgId[chatId]);
    //             } catch (e) {
    //                 console.error(e.message)
    //             }
    //             chatStates[chatId] = undefined; // Сбрасываем состояние чата
    //             if (messageFromCustomer && !messageFromCustomer.startsWith('/') && !hasDigits) {
    //                 userChoiceArr[chatId].city = messageFromCustomer;
    //                 const chooseFilterButtons = [
    //                     [{text: `${language.SET_FILTERS}`, callback_data: callbacks.SET_FILTERS}],
    //                     [{text: language.SET_NO_FILTERS, callback_data: callbacks.SET_NO_FILTERS}],
    //                 ]
    //                 const botMessage = await bot.sendMessage(chatId, `${language.QUESTION_ABOUT_FILTERS}`, {
    //                     reply_markup: {
    //                         inline_keyboard: chooseFilterButtons
    //                     },
    //                 });
    //                 msgId[chatId] = botMessage.message_id;
    //                 //удаление сообщения от пользователя
    //                 try {
    //                     await bot.deleteMessage(chatId, msg.message_id);
    //                 } catch (e) {
    //                     console.error(e.message)
    //                 }
    //
    //             }
    //
    //             // Если бот находится в режиме ожидания ввода цены, обрабатываем его здесь
    //         } else if (chatStates[chatId] === 'waiting_for_price') {
    //
    //
    //             chatStates[chatId] = undefined; // Сбрасываем состояние чата
    //             const language = texts[languageMap.get(chatId)];
    //             if (isValidRangeNumbers && isValidRange) {
    //
    //                 try {
    //                     await bot.deleteMessage(chatId, msgId[chatId]);
    //                 } catch (e) {
    //                     console.error(e.message)
    //                 }
    //
    //                 let firstNumber = parseInt(messageFromCustomer.split("-")[0]);
    //                 let secondNumber = parseInt(messageFromCustomer.split("-")[1]);
    //
    //                 if (firstNumber < 300) {
    //                     firstNumber = 300;
    //                 } else if (firstNumber > 40000) {
    //                     firstNumber = 25000;
    //                 }
    //
    //                 if (secondNumber > 40000) {
    //                     secondNumber = 40000;
    //                 } else if (secondNumber < 500) {
    //                     secondNumber = 500;
    //                 }
    //                 userChoiceArr[chatId].price = `${firstNumber}-${secondNumber}`;
    //                 userChoiceArr[chatId].minPrice = firstNumber;
    //                 userChoiceArr[chatId].maxPrice = secondNumber;
    //
    //                 //т.к. в комнате нельзя выбрать площадь
    //                 if (userChoiceArr[chatId].property_type !== 'Room') {
    //
    //                     const botMessage = await bot.sendMessage(chatId, `${language.CHOOSE_RENT_AREA}`);
    //                     //сохранение айди сообщения с просьбой ввести площадь аренды, это надо, чтобы мы потом могли удалить это сообщение, когда площадь будет введена
    //                     msgId[chatId] = botMessage.message_id;
    //                     await bot.deleteMessage(chatId, msg.message_id);
    //                     chatStates[chatId] = 'waiting_for_area';
    //
    //                 } else {
    //                     const chooseTypeOfAd = [
    //                         [{text: `${language.OWNER}  🏠👤`, callback_data: callbacks.ad_type.OWNER}, {
    //                             text: `${language.AGENCY}  🏢👥`,
    //                             callback_data: callbacks.ad_type.AGENCY
    //                         }],
    //                         [{text: language.ANY, callback_data: callbacks.ad_type.ANY}]
    //                     ]
    //                     const botMessage = await bot.sendMessage(chatId, `${language.CHOOSE_AD_TYPE}`, {
    //                         reply_markup: {
    //                             inline_keyboard: chooseTypeOfAd
    //                         },
    //                     });
    //                     msgId[chatId] = botMessage.message_id;
    //                     await bot.deleteMessage(chatId, msg.message_id);
    //                 }
    //
    //             } else {
    //                 try {
    //                     await bot.deleteMessage(chatId, msg.message_id);
    //                 } catch (e) {
    //                     console.error(e.message)
    //                 }
    //                 chatStates[chatId] = 'waiting_for_price';
    //                 const botMessage = await bot.sendMessage(chatId, `${language.INVALID_PRICE_RANGE_MESSAGE}`);
    //                 setTimeout(async () => {
    //                     try {
    //                         await bot.deleteMessage(chatId, botMessage.message_id);
    //                     } catch (e) {
    //                         console.error(e.message)
    //                     }
    //                 }, 10000);
    //             }
    //
    //             // Если бот находится в режиме ожидания ввода площади, обрабатываем его здесь
    //         } else if (chatStates[chatId] === 'waiting_for_area') {
    //
    //             chatStates[chatId] = undefined; // Сбрасываем состояние чата
    //             if (isValidRangeNumbers && isValidRange) {
    //
    //                 try {
    //                     await bot.deleteMessage(chatId, msgId[chatId]);
    //                 } catch (e) {
    //                     console.error(e.message)
    //                 }
    //
    //                 let firstNumber = parseInt(messageFromCustomer.split("-")[0]);
    //                 let secondNumber = parseInt(messageFromCustomer.split("-")[1]);
    //
    //                 if (firstNumber < 5) {
    //                     firstNumber = 5;
    //                 } else if (firstNumber > 500) {
    //                     firstNumber = 400;
    //                 }
    //
    //                 if (secondNumber > 800) {
    //                     secondNumber = 800;
    //                 } else if (secondNumber < 20) {
    //                     secondNumber = 20;
    //                 }
    //                 userChoiceArr[chatId].square = `${firstNumber}-${secondNumber}`;
    //                 userChoiceArr[chatId].minSquare = firstNumber;
    //                 userChoiceArr[chatId].maxSquare = secondNumber;
    //
    //                 const chooseTypeOfAd = [
    //                     [{text: `${language.OWNER}  🏠👤`, callback_data: callbacks.ad_type.OWNER}, {
    //                         text: `${language.AGENCY}  🏢👥`,
    //                         callback_data: callbacks.ad_type.AGENCY
    //                     }],
    //                     [{text: language.ANY, callback_data: callbacks.ad_type.ANY}]
    //                 ]
    //                 const botMessage = await bot.sendMessage(chatId, `${language.CHOOSE_AD_TYPE}`, {
    //                     reply_markup: {
    //                         inline_keyboard: chooseTypeOfAd
    //                     },
    //                 });
    //                 msgId[chatId] = botMessage.message_id;
    //                 await bot.deleteMessage(chatId, msg.message_id);
    //             } else {
    //                 try {
    //                     await bot.deleteMessage(chatId, msg.message_id);
    //                 } catch (e) {
    //                     console.error(e.message)
    //                 }
    //                 chatStates[chatId] = 'waiting_for_area';
    //                 const botMessage = await bot.sendMessage(chatId, `${language.INVALID_AREA_RANGE_MESSAGE}`);
    //                 setTimeout(async () => {
    //                     try {
    //                         await bot.deleteMessage(chatId, botMessage.message_id);
    //                     } catch (e) {
    //                         console.error(e.message)
    //                     }
    //                 }, 10000);
    //             }
    //         } else {
    //             await bot.deleteMessage(chatId, msg.message_id);
    //         }
    //     } catch (e) {
    //         console.log(e.message);
    //     }
    // });
    //
    // bot.on('sticker', async (msg) => {
    //     try {
    //         const chatId = msg.chat.id;
    //         await bot.deleteMessage(chatId, msg.message_id);
    //     } catch (e) {
    //         console.log(e.message)
    //     }
    // });

}

module.exports = {handleCallbacks};