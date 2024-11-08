const fs = require("fs");

const createThemeScss = normalizedFigmaExport => {
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

    // 6. Font weight.
    {
        const weight = normalizedFigmaExport
            .filter(item => item.type === "textFont" && item.variantName.startsWith("font-weight-"))
            .map(variable => `--${variable.variantName}: ${variable.resolvedValue};`);

        stylesScss = stylesScss.replace("{FONT_WEIGHT}", weight.join("\n"));
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

    // 9. Ring color.
    {
        let currentRingColorGroup = null;
        const ringColors = normalizedFigmaExport
            .filter(item => item.type === "ringColor")
            .map(variable => {
                const [colorGroup] = variable.variantName.split("-");
                const cssVar = `--ring-${variable.variantName}: ${variable.hsla.h}, ${variable.hsla.s}%, ${variable.hsla.l}%;`;

                if (!currentRingColorGroup) {
                    currentRingColorGroup = colorGroup;
                    return cssVar;
                }

                if (!currentRingColorGroup || currentRingColorGroup !== colorGroup) {
                    currentRingColorGroup = colorGroup;
                    return ["", cssVar];
                }
                return cssVar;
            })
            .flat();

        stylesScss = stylesScss.replace("{RING_COLOR}", ringColors.join("\n"));
    }

    // 10. Ring width.
    {
        const ringWidth = normalizedFigmaExport
            .filter(item => item.type === "ringWidth")
            .map(variable => `--ring-width-${variable.variantName}: ${variable.resolvedValue}px;`);

        stylesScss = stylesScss.replace("{RING_WIDTH}", ringWidth.join("\n"));
    }

    // 11. Shadow.
    {
        const shadow = normalizedFigmaExport
            .filter(item => item.type === "shadow")
            .map(variable => `--shadow-${variable.variantName}: ${variable.resolvedValue}px;`);

        stylesScss = stylesScss.replace("{SHADOW}", shadow.join("\n"));
    }

    // 12. Spacing.
    {
        const spacing = normalizedFigmaExport
            .filter(item => item.type === "spacing")
            .map(variable => `--spacing-${variable.variantName}: ${variable.resolvedValue}px;`);

        stylesScss = stylesScss.replace("{SPACING}", spacing.join("\n"));
    }

    // 13. Text color.
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

    // 14. Text size.
    {
        const textSize = normalizedFigmaExport
            .filter(item => item.type === "textFont" && item.variantName.startsWith("font-size-"))
            .sort((a, b) => a.resolvedValue - b.resolvedValue)
            .reduce((acc, { variantName, resolvedValue }) => {
                const size = variantName.replace("font-size-", "");
                const { resolvedValue: lineHeight } = normalizedFigmaExport.find(item => {
                    return item.variantName === `line-height-${size}`;
                });

                return [
                    ...acc,
                    [
                        `--text-${size}: ${resolvedValue}px;`,
                        `--text-${size}-leading: ${lineHeight}px;`,
                        `--text-${size}-tracking: initial;`
                    ]
                ];
            }, []);

        stylesScss = stylesScss.replace("{TEXT_SIZE}", textSize.flat().join("\n"));
    }

    return stylesScss;
};

module.exports = { createThemeScss };
