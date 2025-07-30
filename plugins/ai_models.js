const axios = require("axios");
const { cmd } = require("../command");

const AI_IMAGE = 'https://i.imgur.com/KTnj2px.jpeg'; // Replace with a valid image URL

// ────────────────────────────────────────────────────────────────
// GPT Command (ChatGPT via Dreaded API)
// ────────────────────────────────────────────────────────────────
cmd({
    pattern: "gpt",
    alias: "ai",
    desc: "Ask a question to ChatGPT using the Dreaded API.",
    category: "ai",
    react: "🤖",
    use: "<your query>",
    filename: __filename,
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("⚠️ *Please provide a query for ChatGPT.*\n\nExample:\n.gpt What is AI?");

        const apiUrl = `https://api.dreaded.site/api/chatgpt?text=${encodeURIComponent(q)}`;

        const response = await axios.get(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json',
            }
        });

        const result = response?.data?.result?.prompt;

        if (!result) {
            return reply("❌ No valid response received from ChatGPT API.");
        }

        const caption = `*🤖 ᴄʜᴀᴛ.ɢᴘᴛ ʀᴇsᴘᴏɴsᴇ:*\n\n${result}`;

        await conn.sendMessage(from, {
            image: { url: AI_IMAGE },
            caption,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: 'DADMARK xᴍᴅ ᴀɪ 🤖',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("GPT Error:", error);
        const errMsg = error.response?.data?.error || error.message || "Unknown error";
        return reply(`❌ *GPT Error:*\n${errMsg}`);
    }
});

// ────────────────────────────────────────────────────────────────
// LLaMA3 Command (via DavidCyrilTech API)
// ────────────────────────────────────────────────────────────────
cmd({
    pattern: "llama3",
    alias: ["google"], // optional
    desc: "Get a response from LLaMA 3 AI model.",
    category: "ai",
    react: "🤖",
    use: "<your prompt>",
    filename: __filename,
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("⚠️ *Please provide a prompt for LLaMA3.*");

        await reply("> 🤖 *Processing your prompt...*");

        const apiUrl = `https://apis.davidcyriltech.my.id/ai/llama3?text=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);

        let result;
        if (typeof response.data === "string") {
            result = response.data.trim();
        } else if (typeof response.data === "object") {
            result = response.data.response || response.data.result || JSON.stringify(response.data);
        }

        if (!result) {
            return reply("❌ No valid response received from LLaMA3 API.");
        }

        const caption = `*🤖 ʟʟᴀᴍᴀ3 ʀᴇsᴘᴏɴsᴇ:*\n\n${result}`;

        await conn.sendMessage(from, {
            image: { url: AI_IMAGE },
            caption,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363302677217436@newsletter',
                    newsletterName: 'DADMARK xᴍᴅ ᴀɪ 🤖',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("LLaMA3 Error:", error);
        const errMsg = error.response?.data?.error || error.message || "Unknown error";
        return reply(`❌ *LLaMA3 Error:*\n${errMsg}`);
    }
});
