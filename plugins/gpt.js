const axios = require("axios");
const { cmd } = require("../command");

const AI_IMAGE = 'https://i.imgur.com/KTnj2px.jpeg'; // Optional: Replace with your own branding

cmd({
    pattern: "gpt",
    alias: ["ai"],
    desc: "Ask ChatGPT anything using the Dreaded API.",
    category: "ai",
    react: "🤖",
    use: "<your prompt>",
    filename: __filename,
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        // If no question is provided
        if (!q) return reply("*⚠️ Please provide a query for ChatGPT.*\n\n*Example:*\n.gpt What is quantum computing?");

        const encodedQuery = encodeURIComponent(q);
        const apiUrl = `https://api.dreaded.site/api/chatgpt?text=${encodedQuery}`;

        // Fetch GPT response
        const response = await axios.get(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json'
            }
        });

        const gptText = response?.data?.result?.prompt;

        if (!gptText) {
            return reply("❌ No valid response received from the ChatGPT API.");
        }

        // Format reply
        const caption = `*🤖 ᴄʜᴀᴛɢᴘᴛ ʀᴇsᴘᴏɴsᴇ:*\n\n${gptText}`;

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
        console.error("GPT Plugin Error:", error);
        const errMsg = error.response?.data?.error || error.message || "Unknown error occurred.";
        return reply(`❌ *Error while contacting GPT API:*\n${errMsg}`);
    }
});
