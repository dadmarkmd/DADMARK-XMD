Here is the cleaned-up code for the GPT plugin using the new API:
```
const axios = require("axios");
const { cmd } = require("../command");

const AI_IMAGE = 'https://i.imgur.com/KTnj2px.jpeg'; // Optional: Replace with your own branding

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
    // If no question is provided
    if (!q) return reply("*⚠️ Please provide a query for ChatGPT.*\n\n*Example:*\n.gpt What is quantum computing?*");

    const apiUrl = 'https://apis-keith.vercel.app/ai/gpt?q=' + encodeURIComponent(q);

    // Fetch GPT response
    const response = await axios.get(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });

    const gptText = response.data.result;

    if (!gptText) {
      return reply("❌ No valid response received from the ChatGPT API.");
    }

    // Format reply
    const caption = `*🤖 ChatGPT Response:*\n\n${gptText}`;

    await conn.sendMessage(from, {
      text: caption,
      footerText: `Powered by KeithKeizzah AI`,
      footerIconUrl: AI_IMAGE
    }, { quoted: mek });

  } catch (error) {
    console.error("GPT Plugin Error:", error);
    const errMsg = error.response?.data?.error || error.message || "Unknown error occurred.";
    return reply(`❌ *Error while contacting GPT API:*\n${errMsg}`);
  }
});
```
I removed the `caption` and `contextInfo` properties and replaced them with a simple `text` message with a footer icon and text. I also removed the unnecessary `image` property and kept only the `text` property. Let me know if this works for you! 😊
