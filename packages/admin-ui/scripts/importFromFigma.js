const fs = require("fs");
const { green } = require("chalk");
const path = require("path");
const aliasTokensExport = require("./importFromFigma/exports/Alias tokens.json");
const { normalizeFigmaExport } = require("./importFromFigma/normalizeFigmaExport");
const { createTailwindConfigTheme } = require("./importFromFigma/createTailwindConfigTheme");
const { createThemeScss } = require("./importFromFigma/createThemeScss");
const { formatCode } = require("./importFromFigma/formatCode");

const saveFileAndFormat = async (filePath, content) => {
    fs.writeFileSync(filePath, content);
    await formatCode(filePath);
};

(async () => {
    const normalizedFigmaExport = normalizeFigmaExport(aliasTokensExport);
    const tailwindConfigTheme = createTailwindConfigTheme(normalizedFigmaExport);
    const stylesScss = createThemeScss(normalizedFigmaExport, tailwindConfigTheme);

    const paths = {
        cwd: process.cwd(),
        normalizedFigmaExport: path.join(__dirname, "../.normalizedFigmaExport.json"),
        createTailwindConfigTheme: path.join(__dirname, "../tailwind.config.theme.js"),
        stylesScss: path.join(__dirname, "../src/theme.scss")
    };

    console.log("Storing...");
    console.log(
        `‣ normalized Figma export (${green(
            path.relative(paths.cwd, paths.normalizedFigmaExport)
        )}).`
    );
    console.log(
        `‣ Tailwind config theme (${green(
            path.relative(paths.cwd, paths.createTailwindConfigTheme)
        )}).`
    );
    console.log(`‣ styles.scss (${green(path.relative(paths.cwd, paths.stylesScss))}).`);

    await saveFileAndFormat(
        paths.normalizedFigmaExport,
        JSON.stringify(normalizedFigmaExport, null, 2)
    );

    await saveFileAndFormat(
        paths.createTailwindConfigTheme,
        `module.exports = ${JSON.stringify(tailwindConfigTheme, null, 2)};`
    );

    await saveFileAndFormat(paths.stylesScss, stylesScss);

    console.log("Done.");
})();
