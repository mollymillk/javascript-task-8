'use strict';

const async = require('./async');
const fetch = require('node-fetch')


const API_KEY = 'AQVN0Xgq7786CGyTkPSrFf0Vi6UfN2-RY6PQulLV';

/**
 * Возвращает функцию, которая возвращает промис
 * @param {String} lang - язык на который нужно перевести
 * @param {String} text - переводимый текст
 * @returns {Function<Promise>}
 */ 
 
 const createTranslationJob = async(language, text) => {

    const data = {
        "targetLanguageCode": language,
        "texts": text
    }
 
        let response= await fetch('https://translate.api.cloud.yandex.net/translate/v2/translate', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Api-Key ${API_KEY}`
            }
        });
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            console.log('errorrrrr' + response.status);
        }

    }


const languages = ['be', 'uk', 'en', 'fr', 'de', 'it', 'pl', 'tr', 'th', 'ja'];
const text = ['дайте мне воды'];

const jobs = languages.map(language => createTranslationJob(language, text));

async
    .runParallel(jobs, 2)
    .then(result => result.map(item => item instanceof Error ? item : item.value.translations[0].text))
    .then(translations => translations.join('\n'))
    .then(console.info);

// async
//     .runParallel(jobs, 2).then(result => console.log(result))


/*
    дайце мне вады
    дайте мені води
    give me wat
    donnez-moi de l'eau
    gib mir Wasser
    dammi dell'acqua
    daj mi wody
    verin bana su
    ให้ฉัน้ำ
    い水
*/