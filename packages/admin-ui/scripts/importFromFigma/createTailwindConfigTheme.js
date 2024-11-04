const createTailwindConfigTheme = normalizedFigmaExport => {
    return {
        backgroundColor: normalizedFigmaExport.reduce((acc, { type, variantName }) => {
            if (type === "backgroundColor") {
                const [color, variant] = variantName.split("-");
                if (!acc[color]) {
                    acc[color] = {
                        DEFAULT: `hsl(var(--bg-${color}-default))`
                    };
                }

                acc[color][variant] = `hsl(var(--bg-${variantName}))`;
            }
            return acc;
        }, {}),
        borderColor: normalizedFigmaExport.reduce((acc, { type, variantName }) => {
            if (type === "borderColor") {
                const [color, variant] = variantName.split("-");
                if (!acc[color]) {
                    acc[color] = {
                        DEFAULT: `hsl(var(--border-${color}-default))`
                    };
                }

                acc[color][variant] = `hsl(var(--border-${variantName}))`;
            }
            return acc;
        }, {}),
        borderRadius: normalizedFigmaExport.reduce((acc, { type, variantName }) => {
            if (type === "borderRadius") {
                acc[variantName] = `var(--radius-${variantName})`;
            }
            return acc;
        }, {}),
        borderWidth: normalizedFigmaExport.reduce((acc, { type, variantName }) => {
            if (type === "borderWidth") {
                acc[variantName] = `var(--border-width-${variantName})`;
            }
            return acc;
        }, {}),
        fill: normalizedFigmaExport.reduce((acc, { type, variantName }) => {
            if (type === "fill") {
                const [color, variant] = variantName.split("-");
                if (!acc[color]) {
                    acc[color] = {
                        DEFAULT: `hsl(var(--fill-${color}-default))`
                    };
                }

                acc[color][variant] = `hsl(var(--fill-${variantName}))`;
            }
            return acc;
        }, {}),
        fontSize: normalizedFigmaExport.reduce((acc, { type, variantName }) => {
            if (type === "textFont") {
                if (!variantName.startsWith("font-size-")) {
                    return acc;
                }

                const size = variantName.replace("font-size-", "");
                acc[size] = [
                    `var(--text-${size})`,
                    {
                        lineHeight: `var(--text-${size}-leading)`,
                        letterSpacing: `var(--text-${size}-tracking)`
                    }
                ];

                return acc;
            }

            return acc;
        }, {}),
        margin: normalizedFigmaExport.reduce((acc, { type, variantName }) => {
            if (type === "margin") {
                acc[variantName] = `var(--margin-${variantName})`;
            }
            return acc;
        }, {}),
        padding: normalizedFigmaExport.reduce((acc, { type, variantName }) => {
            if (type === "padding") {
                acc[variantName] = `var(--padding-${variantName})`;
            }
            return acc;
        }, {}),
        ringColor: normalizedFigmaExport.reduce((acc, { type, variantName }) => {
            if (type === "ringColor") {
                const [color, variant] = variantName.split("-");
                if (!acc[color]) {
                    acc[color] = {
                        DEFAULT: `hsl(var(--ring-${color}-default))`
                    };
                }

                acc[color][variant] = `hsl(var(--ring-${variantName}))`;
            }
            return acc;
        }, {}),
        ringWidth: normalizedFigmaExport.reduce((acc, { type, variantName }) => {
            if (type === "ringWidth") {
                acc[variantName] = `var(--ring-width-${variantName})`;
            }
            return acc;
        }, {}),
        shadow: normalizedFigmaExport.reduce((acc, { type, variantName }) => {
            if (type === "shadow") {
                acc[variantName] = `var(--shadow-${variantName})`;
            }
            return acc;
        }, {}),
        spacing: normalizedFigmaExport.reduce((acc, { type, variantName }) => {
            if (type === "spacing") {
                acc[variantName] = `var(--spacing-${variantName})`;
            }
            return acc;
        }, {}),
        textColor: normalizedFigmaExport.reduce((acc, { type, variantName }) => {
            if (type === "textColor") {
                const [color, variant] = variantName.split("-");
                if (!acc[color]) {
                    acc[color] = {
                        DEFAULT: `hsl(var(--text-${color}-default))`
                    };
                }

                acc[color][variant] = `hsl(var(--text-${variantName}))`;
            }
            return acc;
        }, {})
    };
};
module.exports = { createTailwindConfigTheme };
