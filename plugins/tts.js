
/* 
ANYWAY, YOU MUST GIVE CREDIT TO MY CODE WHEN COPY IT
CONTACT ME HERE +254112192119
YT: DADMARK01
Github: caseyweb
*/

const axios = require('axios');
const config = require('../config')
const {cmd , commands} = require('../command')
const googleTTS = require('google-tts-api')


cmd({
    pattern: "trt",
    alias: ["translate"],
    desc: "🌍 Translate text between languages",
    react: "⚡",
    category: "other",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) return reply("❗ Please provide a language code and text. Usage: .translate [language code] [text]\nEg: trt fr Hello");

        const targetLang = args[0];
        const textToTranslate = args.slice(1).join(' ');

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=en|${targetLang}`;

        const response = await axios.get(url);
        const translation = response.data.responseData.translatedText;

        const translationMessage = `
🌍 *DADMARK XMD TRANSLATION* 🌍

🔤 *Original*: ${textToTranslate}

🔠 *Translated*: ${translation}

🌐 *Language*: ${targetLang.toUpperCase()}

*DADMARK TECH CREATION*`;

        return reply(translationMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred data while translating the your text. Please try again later🤕");
    }
});

//____________________________TTS___________________________
cmd({
    pattern: "tts",
    desc: "Convert text to speech in specified language",
    category: "other",
    react: "👧",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        const args = q.split(' ');
        if (args.length < 2) {
            return reply("❗ Please provide a language code and text. Usage: .tts [language code] [text]\nEg: .tts en Hello");
        }

        const lang = args[0];
        const text = args.slice(1).join(' ');

        const url = googleTTS.getAudioUrl(text, {
            lang: lang,
            slow: false,
            host: 'https://translate.google.com',
        });

        await conn.sendMessage(from, { audio: { url: url }, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while converting your text to speech. Please try again later🤕");
    }
});
