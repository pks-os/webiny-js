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

        // Not in Figma export, so we're manually setting the values here.
        fontSize: {
            h1: [
                "var(--text-h1)",
                {
                    lineHeight: "var(--text-h1-leading)",
                    letterSpacing: "var(--text-h1-tracking)"
                }
            ],
            h2: [
                "var(--text-h2)",
                {
                    lineHeight: "var(--text-h2-leading)",
                    letterSpacing: "var(--text-h2-tracking)"
                }
            ],
            h3: [
                "var(--text-h3)",
                {
                    lineHeight: "var(--text-h3-leading)",
                    letterSpacing: "var(--text-h3-tracking)"
                }
            ],
            h4: [
                "var(--text-h4)",
                {
                    lineHeight: "var(--text-h4-leading)",
                    letterSpacing: "var(--text-h4-tracking)"
                }
            ],
            h5: [
                "var(--text-h5)",
                {
                    lineHeight: "var(--text-h5-leading)",
                    letterSpacing: "var(--text-h5-tracking)"
                }
            ],
            h6: [
                "var(--text-h6)",
                {
                    lineHeight: "var(--text-h6-leading)",
                    letterSpacing: "var(--text-h6-tracking)"
                }
            ],
            xl: [
                "var(--text-xl)",
                {
                    lineHeight: "var(--text-xl-leading)",
                    letterSpacing: "var(--text-xl-tracking)"
                }
            ],
            lg: [
                "var(--text-lg)",
                {
                    lineHeight: "var(--text-lg-leading)",
                    letterSpacing: "var(--text-lg-tracking)"
                }
            ],
            md: [
                "var(--text-md)",
                {
                    lineHeight: "var(--text-md-leading)",
                    letterSpacing: "var(--text-md-tracking)"
                }
            ],
            sm: [
                "var(--text-sm)",
                {
                    lineHeight: "var(--text-sm-leading)",
                    letterSpacing: "var(--text-sm-tracking)"
                }
            ]
        },

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
