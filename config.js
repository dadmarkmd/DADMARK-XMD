const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
  return text === fault ? true : false;
}

module.exports = {
  SESSION_ID: process.env.SESSION_ID || '',
  PREFIX: process.env.PREFIX || '.',
  BOT_NAME: process.env.BOT_NAME || '✦ DADMARK ✦ XMD ✦',
  CUSTOM_REACT: convertToBool(process.env.CUSTOM_REACT || 'false'),
  CUSTOM_REACT_EMOJIS: process.env.CUSTOM_REACT_EMOJIS || '💝,💖,💗,❤️‍🔥,❤️‍🩹,❤️,🩷,🧡,💛,💚,💙,🩵,💜,🤎,🖤,🤍',
  DELETE_LINKS: convertToBool(process.env.DELETE_LINKS || 'false'),
  OWNER_NUMBER: process.env.OWNER_NUMBER || '254714342128',
  OWNER_NAME: process.env.OWNER_NAME || '✦ DADMARK ✦ XMD ✦',
  DESCRIPTION: process.env.DESCRIPTION || '*© ✦ DADMARK ✦ XMD ✦*',
  ALIVE_IMG: process.env.ALIVE_IMG || 'https://i.imgur.com/PEZ5QL2.jpeg',
  LIVE_MSG: process.env.LIVE_MSG || '> Silva Spark is active and live! Keep using DADMARK XMD from Dadmark Tech Inc ⚡',
  READ_MESSAGE: convertToBool(process.env.READ_MESSAGE || 'false'),
  AUTO_REACT: convertToBool(process.env.AUTO_REACT || 'false'),
  ANTI_BAD: convertToBool(process.env.ANTI_BAD || 'false'),
  AUTO_STATUS_SEEN: convertToBool(process.env.AUTO_STATUS_SEEN || 'true'),
  AUTO_STATUS_REPLY: convertToBool(process.env.AUTO_STATUS_REPLY || 'true'),
  AUTO_STATUS_MSG: process.env.AUTO_STATUS_MSG || '*🎉👀 Seen by DADMARK XMD 🚀🔥*',
  MODE: process.env.MODE || 'public',
  ANTI_LINK: convertToBool(process.env.ANTI_LINK || 'true'),
  AUTO_VOICE: convertToBool(process.env.AUTO_VOICE || 'false'),
  AUTO_STICKER: convertToBool(process.env.AUTO_STICKER || 'false'),
  AUTO_REPLY: convertToBool(process.env.AUTO_REPLY || 'false'),
  HEART_REACT: convertToBool(process.env.HEART_REACT || 'false'),
  OWNER_REACT: convertToBool(process.env.OWNER_REACT || 'true'),
  ALWAYS_ONLINE: convertToBool(process.env.ALWAYS_ONLINE || 'true'),
  PUBLIC_MODE: convertToBool(process.env.PUBLIC_MODE || 'true'),
  AUTO_TYPING: convertToBool(process.env.AUTO_TYPING || 'true'),
  AUTO_RECORDING: convertToBool(process.env.AUTO_RECORDING || 'false')
};
