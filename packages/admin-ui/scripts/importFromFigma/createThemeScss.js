const fs = require("fs");

const createStylesScss = normalizedFigmaExport => {
    // Generate `theme.scss` file.
    let stylesScss = fs.readFileSync(__dirname + "/templates/theme.scss.txt", "utf8");

    // 1. Background color.
    {
        let currentBgColorGroup = null;
        const bgColors = normalizedFigmaExport
            .filter(item => item.type === "backgroundColor")
            .map(variable => {
                const [colorGroup] = variable.variantName.split("-");
                const cssVar = `--bg-${variable.variantName}: ${variable.hsla.h}, ${variable.hsla.s}%, ${variable.hsla.l}%;`;

                if (!currentBgColorGroup) {
                    currentBgColorGroup = colorGroup;
                    return cssVar;
                }

                if (!currentBgColorGroup || currentBgColorGroup !== colorGroup) {
                    currentBgColorGroup = colorGroup;
                    return ["", cssVar];
                }
                return cssVar;
            })
            .flat();

        stylesScss = stylesScss.replace("{BACKGROUND_COLOR}", bgColors.join("\n"));
    }

    // 2. Border color.
    {
        let currentBorderColor = null;
        const borderColors = normalizedFigmaExport
            .filter(item => item.type === "borderColor")
            .map(variable => {
                const [colorGroup] = variable.variantName.split("-");
                const cssVar = `--border-${variable.variantName}: ${variable.hsla.h}, ${variable.hsla.s}%, ${variable.hsla.l}%;`;

                if (!currentBorderColor) {
                    currentBorderColor = colorGroup;
                    return cssVar;
                }

                if (!currentBorderColor || currentBorderColor !== colorGroup) {
                    currentBorderColor = colorGroup;
                    return ["", cssVar];
                }
                return cssVar;
            })
            .flat();

        stylesScss = stylesScss.replace("{BORDER_COLOR}", borderColors.join("\n"));
    }

    // 3. Border radius.
    {
        const borderRadius = normalizedFigmaExport
            .filter(item => item.type === "borderRadius")
            .map(variable => {
                return `--radius-${variable.variantName}: ${variable.resolvedValue}px;`;
            });

        stylesScss = stylesScss.replace("{BORDER_RADIUS}", borderRadius.join("\n"));
    }

    // 4. Border width.
    {
        const borderWidth = normalizedFigmaExport
            .filter(item => item.type === "borderWidth")
            .map(
                variable => `--border-width-${variable.variantName}: ${variable.resolvedValue}px;`
            );

        stylesScss = stylesScss.replace("{BORDER_WIDTH}", borderWidth.join("\n"));
    }

    // 5. Fill.
    {
        let currentFillColorGroup = null;
        const fillColors = normalizedFigmaExport
            .filter(item => item.type === "fill")
            .map(variable => {
                const [colorGroup] = variable.variantName.split("-");
                const cssVar = `--fill-${variable.variantName}: ${variable.hsla.h}, ${variable.hsla.s}%, ${variable.hsla.l}%;`;

                if (!currentFillColorGroup) {
                    currentFillColorGroup = colorGroup;
                    return cssVar;
                }

                if (!currentFillColorGroup || currentFillColorGroup !== colorGroup) {
                    currentFillColorGroup = colorGroup;
                    return ["", cssVar];
                }
                return cssVar;
            })
            .flat();

        stylesScss = stylesScss.replace("{FILL}", fillColors.join("\n"));
    }

    // 6. Font.
    {
        // Font is not in Figma, we're manually setting the values here.
        stylesScss = stylesScss.replace("{FONT}", `--font-sans: 'Inter', sans-serif;`);
    }

    // 7. Margin.
    {
        const margin = normalizedFigmaExport
            .filter(item => item.type === "margin")
            .map(variable => `--margin-${variable.variantName}: ${variable.resolvedValue}px;`);

        stylesScss = stylesScss.replace("{MARGIN}", margin.join("\n"));
    }

    // 8. Padding.
    {
        const padding = normalizedFigmaExport
            .filter(item => item.type === "padding")
            .map(variable => `--padding-${variable.variantName}: ${variable.resolvedValue}px;`);

        stylesScss = stylesScss.replace("{PADDING}", padding.join("\n"));
    }

    // 9. Shadow.
    {
        const shadow = normalizedFigmaExport
            .filter(item => item.type === "shadow")
            .map(variable => `--shadow-${variable.variantName}: ${variable.resolvedValue}px;`);

        stylesScss = stylesScss.replace("{SHADOW}", shadow.join("\n"));
    }

    // 10. Spacing.
    {
        const spacing = normalizedFigmaExport
            .filter(item => item.type === "spacing")
            .map(variable => `--spacing-${variable.variantName}: ${variable.resolvedValue}px;`);

        stylesScss = stylesScss.replace("{SPACING}", spacing.join("\n"));
    }

    // 11. Text color.
    {
        let currentTextColor = null;
        const textColors = normalizedFigmaExport
            .filter(item => item.type === "textColor")
            .map(variable => {
                const [colorGroup] = variable.variantName.split("-");
                const cssVar = `--text-${variable.variantName}: ${variable.hsla.h}, ${variable.hsla.s}%, ${variable.hsla.l}%;`;

                if (!currentTextColor) {
                    currentTextColor = colorGroup;
                    return cssVar;
                }

                if (!currentTextColor || currentTextColor !== colorGroup) {
                    currentTextColor = colorGroup;
                    return ["", cssVar];
                }
                return cssVar;
            })
            .flat();

        stylesScss = stylesScss.replace("{TEXT_COLOR}", textColors.join("\n"));
    }

    // 12. Text size.
    {
        // Not in Figma export, so we're manually setting the values here.
        stylesScss = stylesScss.replace(
            "{TEXT_SIZE}",
            [
                "// Headings.",
                "--text-h1: 3rem;",
                "--text-h1-leading: 3.75rem;",
                "--text-h1-tracking: -2%;",
                "",
                "--text-h2: 2.25rem;",
                "--text-h2-leading: 2.75rem;",
                "--text-h2-tracking: -2%;",
                "",
                "--text-h3: 1.875rem;",
                "--text-h3-leading: 2.375rem;",
                "--text-h3-tracking: initial;",
                "",
                "--text-h4: 1.25rem;",
                "--text-h4-leading: 1.875rem;",
                "--text-h4-tracking: initial;",
                "",
                "--text-h5: 1rem;",
                "--text-h5-leading: 1.5rem;",
                "--text-h5-tracking: initial;",
                "",
                "--text-h6: 0.875rem;",
                "--text-h6-leading: 1.25rem;",
                "--text-h6-tracking: initial;",
                "",
                "// Text.",
                "--text-xl: 1.25rem;",
                "--text-xl-leading: 1.875rem;",
                "--text-xl-tracking: initial;",
                "",
                "--text-lg: 1rem;",
                "--text-lg-leading: 1.5rem;",
                "--text-lg-tracking: initial;",
                "",
                "--text-md: 0.875rem;",
                "--text-md-leading: 1.375rem;",
                "--text-md-tracking: initial;",
                "",
                "--text-sm: 0.75rem;",
                "--text-sm-leading: 1.125rem;",
                "--text-sm-tracking: initial;"
            ].join("\n")
        );
    }
    return stylesScss;
};

module.exports = { createStylesScss };
