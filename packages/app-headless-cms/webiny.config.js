const { createWatchPackage, createBuildPackage } = require("@webiny/app-lexical-editor");

module.exports = {
    commands: {
        build: createBuildPackage({ cwd: __dirname }),
        watch: createWatchPackage({ cwd: __dirname })
    }
};
