const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

function isEnabled(value) {
  return value && value.toString().toLowerCase() === "true";
}

cmd({
  pattern: "env",
  alias: ["setting", "allvar"],
  desc: "Display current bot environment settings",
  category: "menu",
  react: "⚙️",
  filename: __filename
},
async (conn, mek, m, { from, quoted, reply }) => {
  try {
    let envSettings = `╭─❖ *『 DADMARK XMD BOT ENV 』* ❖─
┃
┃ ⚙️ *Environment Settings Status*
┃
┃ • Auto Read Status: ${isEnabled(config.AUTO_STATUS_SEEN) ? "✅ Enabled" : "❌ Disabled"}
┃ • Auto Reply Status: ${isEnabled(config.AUTO_STATUS_REPLY) ? "✅ Enabled" : "❌ Disabled"}
┃ • Auto Reply: ${isEnabled(config.AUTO_REPLY) ? "✅ Enabled" : "❌ Disabled"}
┃ • Auto Sticker: ${isEnabled(config.AUTO_STICKER) ? "✅ Enabled" : "❌ Disabled"}
┃ • Auto Voice: ${isEnabled(config.AUTO_VOICE) ? "✅ Enabled" : "❌ Disabled"}
┃ • Owner React: ${isEnabled(config.OWNER_REACT) ? "✅ Enabled" : "❌ Disabled"}
┃ • Custom Reacts: ${isEnabled(config.CUSTOM_REACT) ? "✅ Enabled" : "❌ Disabled"}
┃ • Auto React: ${isEnabled(config.AUTO_REACT) ? "✅ Enabled" : "❌ Disabled"}
┃ • Delete Links: ${isEnabled(config.DELETE_LINKS) ? "✅ Enabled" : "❌ Disabled"}
┃ • Anti-Link: ${isEnabled(config.ANTI_LINK) ? "✅ Enabled" : "❌ Disabled"}
┃ • Anti-Bad Words: ${isEnabled(config.ANTI_BAD) ? "✅ Enabled" : "❌ Disabled"}
┃ • Auto Typing: ${isEnabled(config.AUTO_TYPING) ? "✅ Enabled" : "❌ Disabled"}
┃ • Auto Recording: ${isEnabled(config.AUTO_RECORDING) ? "✅ Enabled" : "❌ Disabled"}
┃ • Always Online: ${isEnabled(config.ALWAYS_ONLINE) ? "✅ Enabled" : "❌ Disabled"}
┃ • Public Mode: ${isEnabled(config.PUBLIC_MODE) ? "✅ Enabled" : "❌ Disabled"}
┃ • Read Message: ${isEnabled(config.READ_MESSAGE) ? "✅ Enabled" : "❌ Disabled"}
┃
╰─❖ *${config.DESCRIPTION}*`;

    // Send the settings image with caption
    await conn.sendMessage(
      from,
      {
        image: { url: 'https://i.ibb.co/Pvn4pKtJ/mrfrankofc.jpg' },
        caption: envSettings,
        contextInfo: {
          mentionedJid: [m.sender],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363302677217436@newsletter',
            newsletterName: "THE DADMARK XMD 🥰",
            serverMessageId: 143
          }
        }
      },
      { quoted: mek }
    );

    // Optional voice reply
    await conn.sendMessage(
      from,
      {
        audio: {
          url: 'https://github.com/JawadYTX/KHAN-DATA/raw/refs/heads/main/autovoice/sigma.m4a'
        },
        mimetype: 'audio/mp4',
        ptt: true
      },
      { quoted: mek }
    );

  } catch (error) {
    console.error(error);
    reply(`❌ Error: ${error.message}`);
  }
});
