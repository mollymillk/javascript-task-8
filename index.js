'use strict';

const async = require('./async');

const translation = {
    "be": "дайце мне вады",
    "uk": "дайте мені води",
    "en": "give me water",
    "fr": "donnez-moi de l'eau",
    "de": "gib mir Wasser",
    "it": "dammi dell'acqua",
    "pl": "daj mi wody",
    "tr": "verin bana su",
    "th": "ให้ฉัน้ำ", 
    "ja": "い水" 
}

function createTranslationJob(lang) {
    return translation[lang];
}

const languages = ['be', 'uk', 'en', 'fr', 'de', 'it', 'pl', 'tr', 'th', 'ja'];
const text = 'дайте мне воды';

const jobs = languages.map(language => createTranslationJob(language));

// async
//     .runParallel(jobs, 2)
//     .then(result => result.map(item => item instanceof Error ? 'error': item))
//     .then(translations => translations.join('\n'))
//     .then(console.info);

async
    .runParallel(jobs, 2)
    .then(result => result.map(item => item instanceof Error ? 'error': item))
    .then(translations => translations.join('\n'))
    .then(console.info);

/*
    дайце мне вады
    дайте мені води
    give me water
    donnez-moi de l'eau
    gib mir Wasser
    dammi dell'acqua
    daj mi wody
    verin bana su
    ให้ฉัน้ำ
    い水
*/
