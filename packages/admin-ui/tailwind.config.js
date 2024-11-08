const { fontFamily } = require("tailwindcss/defaultTheme");
const { getProject } = require("@webiny/cli/utils");
const project = getProject();
const webinyPackagesGlob = `${project.root}/node_modules/@webiny/app*/**/*.js`;
const webinyAdminUiPackageGlob = `${project.root}/node_modules/@webiny/admin-ui/**/*.js`;
const adminAppSourceGlob = `${project.root}/apps/admin`;
const {
    backgroundColor,
    borderColor,
    borderRadius,
    borderWidth,
    fill,
    fontSize,
    margin,
    padding,
    ringColor,
    ringWidth,
    shadow,
    spacing,
    textColor
} = require("./tailwind.config.theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [webinyPackagesGlob, webinyAdminUiPackageGlob, adminAppSourceGlob],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px"
            }
        },

        backgroundColor,
        borderColor,
        borderRadius,
        borderWidth,
        fill,
        fontSize,
        margin,
        padding,
        ringColor,
        ringWidth,
        shadow,
        spacing,
        textColor,

        fontFamily: {
            sans: ["var(--font-sans)", ...fontFamily.sans],
            serif: ["var(--font-serif)", ...fontFamily.serif],
            mono: ["var(--font-mono)", ...fontFamily.mono]
        }
    },

    plugins: [require("tailwindcss-animate")]
};
