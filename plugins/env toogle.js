const fs = require('fs');
const path = require('path');
const { cmd } = require('../command');
const envFile = path.resolve('./config.env');

function updateEnv(key, value) {
  const lines = fs.readFileSync(envFile, 'utf8').split('\n');
  const newLines = lines.map(line =>
    line.startsWith(`${key}=`) ? `${key}=${value}` : line
  );
  fs.writeFileSync(envFile, newLines.join('\n'));
}

const validToggles = [
  'AUTO_REPLY', 'AUTO_VOICE', 'AUTO_REACT', 'AUTO_TYPING',
  'OWNER_REACT', 'PUBLIC_MODE', 'ANTI_BAD', 'ALWAYS_ONLINE',
  'READ_MESSAGE', 'AUTO_RECORDING', 'AUTO_STATUS_SEEN',
  'AUTO_STATUS_REPLY', 'ANTI_LINK', 'DELETE_LINKS', 'CUSTOM_REACT'
];

cmd({
  pattern: 'set',
  alias: ['toggle'],
  desc: 'Toggle .env config values on/off',
  category: 'settings',
  filename: __filename
}, async (conn, mek, m, { args, reply }) => {
  const key = args[0]?.toUpperCase();
  const val = args[1]?.toLowerCase();

  if (!validToggles.includes(key))
    return reply(`❌ Invalid key. Allowed:\n${validToggles.join(', ')}`);

  if (!['on', 'off'].includes(val))
    return reply('Usage:\n.set AUTO_REPLY on\n.set AUTO_VOICE off');

  const bool = val === 'on' ? 'true' : 'false';
  updateEnv(key, bool);

  await reply(`✅ ${key} has been set to ${bool.toUpperCase()}. Restarting bot...`);
  process.exit(0); // Auto-restart if nodemon/pm2 is used
});
