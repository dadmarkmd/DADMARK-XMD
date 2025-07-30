const config = require('../config');
const { cmd } = require('../command');

// BLOCK COMMAND
cmd({
    pattern: "block",
    desc: "Block a user.",
    category: "owner",
    react: "🚫",
    filename: __filename
}, async (conn, mek, m, { isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted || !quoted.sender) return reply("❌ Please reply to the user you want to block.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'block');
        reply(`🚫 User @${user.split('@')[0]} blocked successfully.`, { mentions: [user] });
    } catch (error) {
        console.error('Block Error:', error);
        reply('❌ Error blocking user: ' + error.message);
    }
});

// UNBLOCK COMMAND
cmd({
    pattern: "unblock",
    desc: "Unblock a user.",
    category: "owner",
    react: "✅",
    filename: __filename
}, async (conn, mek, m, { isOwner, quoted, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    if (!quoted || !quoted.sender) return reply("❌ Please reply to the user you want to unblock.");

    const user = quoted.sender;
    try {
        await conn.updateBlockStatus(user, 'unblock');
        reply(`✅ User @${user.split('@')[0]} unblocked successfully.`, { mentions: [user] });
    } catch (error) {
        console.error('Unblock Error:', error);
        reply('❌ Error unblocking user: ' + error.message);
    }
});

// BLOCKLIST COMMAND
cmd({
    pattern: "blocklist",
    desc: "Show all blocked contacts.",
    category: "owner",
    react: "📃",
    filename: __filename
}, async (conn, mek, m, { isOwner, reply }) => {
    if (!isOwner) return reply("❌ You are not the owner!");
    
    try {
        const blocklist = await conn.fetchBlocklist();
        if (!blocklist || blocklist.length === 0) {
            return reply("✅ No blocked users.");
        }

        const list = blocklist.map((jid, i) => `${i + 1}. @${jid.split('@')[0]}`).join("\n");
        reply(`🚫 Blocked Users:\n\n${list}`, {
            mentions: blocklist
        });
    } catch (error) {
        console.error('Blocklist Error:', error);
        reply('❌ Error fetching blocklist: ' + error.message);
    }
});
