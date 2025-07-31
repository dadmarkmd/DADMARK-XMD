const config = require('../config');
const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');
const fetch = require('node-fetch'); // Remove if on Node 18+

// Helper to sanitize filenames
const sanitize = (str) => str.replace(/[^a-z0-9_\-\.]/gi, '_').slice(0, 50);

// MP4 Command
cmd({
    pattern: "mp4",
    alias: ["video"],
    react: "🎥",
    desc: "Download YouTube video",
    category: "main",
    use: '.mp4 < Yt url or Name >',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("Please provide a YouTube URL or video name.");
        const yt = await ytsearch(q);
        if (!yt.results || yt.results.length === 0) return reply("No results found!");

        const yts = yt.results[0];
        const apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status !== 200 || !data.success || !data.result?.download_url) {
            return reply("❌ Failed to fetch video.");
        }

        const ytmsg = `📹 *Video Details*
🎬 *Title:* ${yts.title}
⏳ *Duration:* ${yts.timestamp}
👀 *Views:* ${yts.views}
👤 *Author:* ${yts.author.name}
🔗 *Link:* ${yts.url}

*Choose format:*
1. 📄 Document
2. ▶️ Normal Video

_Reply with 1 or 2 to this message._`;

        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true
        };

        const videoMsg = await conn.sendMessage(from, {
            image: { url: yts.thumbnail },
            caption: ytmsg,
            contextInfo
        }, { quoted: mek });

        const listener = async (msgUpdate) => {
            const msg = msgUpdate.messages?.[0];
            if (!msg?.message?.extendedTextMessage) return;

            const text = msg.message.extendedTextMessage.text.trim();
            const repliedTo = msg.message.extendedTextMessage.contextInfo?.stanzaId;

            if (repliedTo === videoMsg.key.id) {
                conn.ev.off("messages.upsert", listener);
                await conn.sendMessage(from, { react: { text: "⬇️", key: msg.key } });

                const fileUrl = data.result.download_url;
                const fileName = `${sanitize(yts.title)}.mp4`;

                switch (text) {
                    case "1":
                        await conn.sendMessage(from, {
                            document: { url: fileUrl },
                            mimetype: "video/mp4",
                            fileName,
                            contextInfo
                        }, { quoted: msg });
                        break;
                    case "2":
                        await conn.sendMessage(from, {
                            video: { url: fileUrl },
                            mimetype: "video/mp4",
                            contextInfo
                        }, { quoted: msg });
                        break;
                    default:
                        await conn.sendMessage(from, { text: "❌ Invalid option. Reply with 1 or 2." }, { quoted: msg });
                }
            }
        };
        conn.ev.on("messages.upsert", listener);

    } catch (e) {
        console.error("MP4 Error:", e);
        reply(`An error occurred: ${e.message || e}`);
    }
});

// MP3 Command
cmd({
    pattern: "song",
    alias: ["play", "ytdl3"],
    react: "🎶",
    desc: "Download YouTube song",
    category: "main",
    use: '.song < Yt url or Name >',
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return await reply("Please provide a YouTube URL or song name.");
        const yt = await ytsearch(q);
        if (!yt.results || yt.results.length === 0) return reply("No results found!");

        const yts = yt.results[0];
        const apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(yts.url)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status !== 200 || !data.success || !data.result?.downloadUrl) {
            return reply("❌ Failed to fetch audio.");
        }

        const ytmsg = `🎵 *Song Details*
🎶 *Title:* ${yts.title}
⏳ *Duration:* ${yts.timestamp}
👀 *Views:* ${yts.views}
👤 *Author:* ${yts.author.name}
🔗 *Link:* ${yts.url}

*Choose format:*
1. 📄 MP3 as Document
2. 🎧 MP3 as Audio
3. 🎙️ MP3 as Voice Note

_Reply with 1, 2, or 3._`;

        const contextInfo = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true
        };

        const songMsg = await conn.sendMessage(from, {
            image: { url: yts.thumbnail },
            caption: ytmsg,
            contextInfo
        }, { quoted: mek });

        const listener = async (msgUpdate) => {
            const msg = msgUpdate.messages?.[0];
            if (!msg?.message?.extendedTextMessage) return;

            const text = msg.message.extendedTextMessage.text.trim();
            const repliedTo = msg.message.extendedTextMessage.contextInfo?.stanzaId;

            if (repliedTo === songMsg.key.id) {
                conn.ev.off("messages.upsert", listener);
                await conn.sendMessage(from, { react: { text: "⬇️", key: msg.key } });

                const fileUrl = data.result.downloadUrl;
                const fileName = `${sanitize(yts.title)}.mp3`;

                switch (text) {
                    case "1":
                        await conn.sendMessage(from, {
                            document: { url: fileUrl },
                            mimetype: "audio/mpeg",
                            fileName,
                            contextInfo
                        }, { quoted: msg });
                        break;
                    case "2":
                        await conn.sendMessage(from, {
                            audio: { url: fileUrl },
                            mimetype: "audio/mpeg",
                            contextInfo
                        }, { quoted: msg });
                        break;
                    case "3":
                        await conn.sendMessage(from, {
                            audio: { url: fileUrl },
                            mimetype: "audio/mpeg",
                            ptt: true,
                            contextInfo
                        }, { quoted: msg });
                        break;
                    default:
                        await conn.sendMessage(from, { text: "❌ Invalid option. Reply with 1, 2, or 3." }, { quoted: msg });
                }
            }
        };
        conn.ev.on("messages.upsert", listener);

    } catch (e) {
        console.error("MP3 Error:", e);
        reply(`An error occurred: ${e.message || e}`);
    }
});
