const os = require("os");
const path = require("path");
const readJson = require("load-json-file");
const writeJson = require("write-json-file");

const configPath = path.join(os.homedir(), ".webiny", "config");

const ensureConfig = () => {
    // Check user ID
    try {
        const config = readJson.sync(configPath);
        if (!config.id) {
            throw Error("Invalid Webiny config.");
        }
    } catch (e) {
        const { v4: uuidv4 } = require("uuid");
        // A new config file is written if it doesn't exist or is invalid.
        writeJson.sync(configPath, { id: uuidv4(), telemetry: true });
    }
};

module.exports = { ensureConfig };
