const axios = require("axios");
const { cmd } = require("../command");

const AI_IMAGE = 'https://i.imgur.com/KTnj2px.jpeg';

cmd({
  pattern: "gpt",
  alias: ["ai"],
  desc: "Ask ChatGPT anything using the new API.",
  category: "ai",
  react: "🤖",
  use: "<your prompt>",
  filename: __filename,
}, async (conn, mek, m, { from, q, reply }) => {
  try {
    if (!q) return reply("*⚠️ Please provide a query for ChatGPT.*\n\n*Example:*\n.gpt What is quantum computing?*");

    const apiUrl = 'https://apis-keith.vercel.app/ai/gpt?q=' + encodeURIComponent(q);

    const response = await axios.get(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });

    const gptText = response.data.result;

    if (!gptText) return reply("❌ No valid response received from the ChatGPT API.");

    // Send formatted message with footer
    await conn.sendMessage(from, {
      text: `*🤖 ChatGPT Response:*\n\n${gptText}`,
      contextInfo: {
        externalAdReply: {
          title: "Powered by KeithKeizzah AI",
          body: "Ask me anything!",
          thumbnailUrl: AI_IMAGE,
          sourceUrl: "https://chat.openai.com",
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    }, { quoted: mek });

  } catch (error) {
    console.error("GPT Plugin Error:", error);
    const errMsg = error.response?.data?.error || error.message || "Unknown error occurred.";
    return reply(`❌ *Error while contacting GPT API:*\n${errMsg}`);
  }
});
