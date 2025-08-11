const axios = require("axios");
const { cmd } = require("../command");
require("dotenv").config();

const AI_IMAGE = 'https://i.imgur.com/KTnj2px.jpeg';
const OPENAI_KEY = process.env.OPENAI_API_KEY; // <-- Add your key in .env

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

    let gptText;

    // 1️⃣ Try Keith API first
    try {
      const apiUrl = 'https://apis-keith.vercel.app/ai/gpt?q=' + encodeURIComponent(q);
      const response = await axios.get(apiUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          'Accept': 'application/json'
        },
        timeout: 8000 // 8 sec timeout
      });

      gptText = response.data.result;
    } catch (e) {
      console.warn("⚠️ Keith API failed. Falling back to OpenAI API...");
    }

    // 2️⃣ If Keith API failed, use OpenAI API
    if (!gptText && OPENAI_KEY) {
      try {
        const openaiRes = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: q }],
            temperature: 0.7
          },
          {
            headers: {
              "Authorization": `Bearer ${OPENAI_KEY}`,
              "Content-Type": "application/json"
            }
          }
        );
        gptText = openaiRes.data.choices[0].message.content.trim();
      } catch (e) {
        console.error("❌ OpenAI API Error:", e.message);
      }
    }

    // 3️⃣ If still no result
    if (!gptText) {
      return reply("❌ Sorry, both Keith API and OpenAI API failed.");
    }

    // 4️⃣ Send message with preview
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
    return reply(`❌ *Error while contacting GPT API:*\n${error.message}`);
  }
});
