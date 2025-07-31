const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "owner",
    react: "🦋",
    desc: "Get owner number",
    category: "main",
    filename: __filename
}, 
async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER;
        const ownerName = config.OWNER_NAME;
        const cleanOwnerNumber = ownerNumber.replace('+', '');

        if (!ownerNumber || !ownerName) {
            return m.reply("Owner details are not configured properly.");
        }

        // Send vCard contact
        const vcard = 'BEGIN:VCARD\n' +
                      'VERSION:3.0\n' +
                      `FN:${ownerName}\n` +
                      `TEL;type=CELL;type=VOICE;waid=${cleanOwnerNumber}:${ownerNumber}\n` +
                      'END:VCARD';

        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        });

        // Send image with caption
        await conn.sendMessage(from, {
            image: { url: 'https://i.imgur.com/KADOfEq.jpeg' },
            caption: `╭━━〔 *DADMARK 𝐓𝐄𝐂𝐇* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *Here is the owner details*
┃◈┃• *Name* - ${ownerName}
┃◈┃• *Number* ${ownerNumber}
┃◈┃• *Version*: 1.0.0
┃◈└───────────┈⊷
╰──────────────┈⊷
> ©DADMARK ᴛᴇᴄʜ`,
            contextInfo: {
                mentionedJid: [`${cleanOwnerNumber}@s.whatsapp.net`],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: 'DADMARK XMD',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send new audio/voice message (PTT)
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/qnkeip.mp3' },
            mimetype: 'audio/ogg; codecs=opus',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        m.reply(`An error occurred: ${error.message}`);
    }
});
