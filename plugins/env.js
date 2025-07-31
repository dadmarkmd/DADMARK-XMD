// env.js
require('dotenv').config(); // Load .env

// Helper to safely fetch boolean envs
function getEnv(name, defaultValue = "false") {
  return (process.env[name] || defaultValue).toString().toLowerCase();
}

function getConfig() {
  return {
    AUTO_STATUS_SEEN: getEnv("AUTO_STATUS_SEEN", "true"),
    AUTO_STATUS_REPLY: getEnv("AUTO_STATUS_REPLY", "false"),
    AUTO_REPLY: getEnv("AUTO_REPLY", "false"),
    AUTO_STICKER: getEnv("AUTO_STICKER", "false"),
    AUTO_VOICE: getEnv("AUTO_VOICE", "true"),
    OWNER_REACT: getEnv("OWNER_REACT", "false"),
    CUSTOM_REACT: getEnv("CUSTOM_REACT", "false"),
    AUTO_REACT: getEnv("AUTO_REACT", "false"),
    DELETE_LINKS: getEnv("DELETE_LINKS", "true"),
    ANTI_LINK: getEnv("ANTI_LINK", "true"),
    ANTI_BAD: getEnv("ANTI_BAD", "false"),
    AUTO_TYPING: getEnv("AUTO_TYPING", "true"),
    AUTO_RECORDING: getEnv("AUTO_RECORDING", "false"),
    ALWAYS_ONLINE: getEnv("ALWAYS_ONLINE", "true"),
    PUBLIC_MODE: getEnv("PUBLIC_MODE", "true"),
    READ_MESSAGE: getEnv("READ_MESSAGE", "false"),
    DESCRIPTION: process.env.DESCRIPTION || "DADMARK XMD BOT",
  };
}

module.exports = { getConfig };
