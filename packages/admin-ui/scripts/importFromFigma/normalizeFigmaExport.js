const aliasTokensExport = require("./exports/Alias tokens.json");
const { figmaRgbaToHsla } = require("./figmaRgbaToHsla");

const VARIABLE_TYPES = [
    "backgroundColor",
    "borderColor",
    "textColor",
    "padding",
    "shadow",
    "fill",
    "spacing",
    "margin",
    "borderRadius",
    "borderWidth"
];

const IGNORED_VARIABLE_TYPES = ["dimension"];

const isIgnoredVariableType = variableName => {
    for (const type of IGNORED_VARIABLE_TYPES) {
        if (variableName.startsWith(type + "/")) {
            return true;
        }
    }

    return false;
};

const getVariableType = variableName => {
    for (const type of VARIABLE_TYPES) {
        if (variableName.startsWith(type + "/")) {
            return type;
        }
    }

    throw new Error(`Unknown variable type for variable "${variableName}".`);
};

const normalizeFigmaExport = () => {
    return aliasTokensExport.variables
        .map(variable => {
            const { aliasName, resolvedValue } = variable.resolvedValuesByMode["37:2"];

            const [, variantName] = variable.name.match(/[a-zA-Z]*?\/[a-zA-Z]*?-(.*)/);

            if (isIgnoredVariableType(variable.name)) {
                return null;
            }

            const type = getVariableType(variable.name);

            return {
                type,
                name: variable.name,
                aliasName,
                hsla: figmaRgbaToHsla(resolvedValue),
                variantName,
                resolvedValue
            };
        })
        .filter(Boolean)
        .sort((variable1, variable2) => {
            // Order by variable.name, from A to Z.
            return variable1.name.localeCompare(variable2.name);
        });
};

module.exports = { normalizeFigmaExport };
