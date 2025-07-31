const { cmd } = require("../command");
const axios = require("axios");

cmd({
    pattern: "img",
    alias: ["pinterest", "image", "searchpin"],
    react: "🔍",
    desc: "Search and download Pinterest images using the API.",
    category: "fun",
    use: ".img <keywords> | .pinterest <keywords>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("*❗ Please provide a search query.*");
        }

        await reply(`*🔎 Searching Pinterest for:* _${query}_ ...`);

        const apiUrl = `https://api.diioffc.web.id/api/search/pinterest?query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);

        if (
            !response.data ||
            !Array.isArray(response.data.result) ||
            response.data.result.length === 0
        ) {
            return reply("*⚠️ No results found. Try different keywords.*");
        }

        const results = response.data.result;

        // Randomly select up to 5 unique images
        const selectedImages = [];
        const maxImages = Math.min(5, results.length);
        const usedIndexes = new Set();

        while (selectedImages.length < maxImages) {
            const i = Math.floor(Math.random() * results.length);
            if (!usedIndexes.has(i) && results[i]?.src) {
                selectedImages.push(results[i].src);
                usedIndexes.add(i);
            }
        }

        for (const imgUrl of selectedImages) {
            await conn.sendMessage(
                from,
                {
                    image: { url: imgUrl },
                    caption: `*🔍 Search results for:* _${query}_\n\n> *Powered by DADMARK-𝕏𝕄𝔻 ✨*`
                },
                { quoted: mek }
            );
        }
    } catch (error) {
        console.error("Pinterest Search Error:", error?.response?.data || error.message);
        reply("*❌ An error occurred while fetching images. Please try again later.*");
    }
});
