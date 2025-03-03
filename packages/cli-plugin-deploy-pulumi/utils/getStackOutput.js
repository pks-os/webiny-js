const cache = {};

const getOutputJson = ({ folder, env, cwd, variant }) => {
    const { getProject } = require("@webiny/cli/utils");
    const project = getProject();
    const execa = require("execa");

    const cacheKey = [folder, env, variant].filter(Boolean).join("_");

    if (cache[cacheKey]) {
        return cache[cacheKey];
    }

    try {
        const command = ["webiny", "output", folder, "--env", env, "--json", "--no-debug"];
        if (variant) {
            command.push("--variant", variant);
        }

        const { stdout } = execa.sync("yarn", command.filter(Boolean), {
            cwd: cwd || project.root
        });

        // Let's get the output after the first line break. Everything before is just yarn stuff.
        const extractedJSON = stdout.substring(stdout.indexOf("{"));
        return (cache[cacheKey] = JSON.parse(extractedJSON));
    } catch (e) {
        return null;
    }
};

module.exports = (folderOrArgs, env, map) => {
    if (!folderOrArgs) {
        throw new Error("Missing initial argument.");
    }

    // Normalize arguments.
    let args = {};
    if (typeof folderOrArgs === "string") {
        args = {
            folder: folderOrArgs,
            env: env,
            map: map
        };
    } else {
        args = folderOrArgs;
    }

    if (!args.folder) {
        throw new Error(`Please specify a project application folder, for example "admin".`);
    }

    if (!args.env) {
        throw new Error(`Please specify environment, for example "dev".`);
    }

    const output = getOutputJson(args);
    if (!output) {
        return output;
    }

    if (!args.map) {
        return output;
    }

    const mapStackOutput = require("./mapStackOutput");
    return mapStackOutput(output, args.map);
};
