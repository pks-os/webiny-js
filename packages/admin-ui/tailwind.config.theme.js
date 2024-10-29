module.exports = {
    backgroundColor: {
        destructive: {
            DEFAULT: "hsl(var(--bg-destructive-default))",
            default: "hsl(var(--bg-destructive-default))",
            disabled: "hsl(var(--bg-destructive-disabled))",
            muted: "hsl(var(--bg-destructive-muted))",
            strong: "hsl(var(--bg-destructive-strong))",
            subtle: "hsl(var(--bg-destructive-subtle))",
            xstrong: "hsl(var(--bg-destructive-xstrong))"
        },
        neutral: {
            DEFAULT: "hsl(var(--bg-neutral-default))",
            base: "hsl(var(--bg-neutral-base))",
            dark: "hsl(var(--bg-neutral-dark))",
            dimmed: "hsl(var(--bg-neutral-dimmed))",
            disabled: "hsl(var(--bg-neutral-disabled))",
            light: "hsl(var(--bg-neutral-light))",
            muted: "hsl(var(--bg-neutral-muted))",
            strong: "hsl(var(--bg-neutral-strong))",
            subtle: "hsl(var(--bg-neutral-subtle))",
            xstrong: "hsl(var(--bg-neutral-xstrong))"
        },
        primary: {
            DEFAULT: "hsl(var(--bg-primary-default))",
            default: "hsl(var(--bg-primary-default))",
            disabled: "hsl(var(--bg-primary-disabled))",
            muted: "hsl(var(--bg-primary-muted))",
            strong: "hsl(var(--bg-primary-strong))",
            subtle: "hsl(var(--bg-primary-subtle))",
            xstrong: "hsl(var(--bg-primary-xstrong))"
        },
        secondary: {
            DEFAULT: "hsl(var(--bg-secondary-default))",
            default: "hsl(var(--bg-secondary-default))",
            disabled: "hsl(var(--bg-secondary-disabled))",
            muted: "hsl(var(--bg-secondary-muted))",
            strong: "hsl(var(--bg-secondary-strong))",
            subtle: "hsl(var(--bg-secondary-subtle))",
            xstrong: "hsl(var(--bg-secondary-xstrong))"
        },
        success: {
            DEFAULT: "hsl(var(--bg-success-default))",
            default: "hsl(var(--bg-success-default))",
            disabled: "hsl(var(--bg-success-disabled))",
            muted: "hsl(var(--bg-success-muted))",
            strong: "hsl(var(--bg-success-strong))",
            subtle: "hsl(var(--bg-success-subtle))",
            xstrong: "hsl(var(--bg-success-xstrong))"
        },
        warning: {
            DEFAULT: "hsl(var(--bg-warning-default))",
            default: "hsl(var(--bg-warning-default))",
            disabled: "hsl(var(--bg-warning-disabled))",
            muted: "hsl(var(--bg-warning-muted))",
            strong: "hsl(var(--bg-warning-strong))",
            subtle: "hsl(var(--bg-warning-subtle))",
            xstrong: "hsl(var(--bg-warning-xstrong))"
        }
    },
    borderColor: {
        accent: {
            DEFAULT: "hsl(var(--border-accent-default))",
            default: "hsl(var(--border-accent-default))",
            dimmed: "hsl(var(--border-accent-dimmed))",
            subtle: "hsl(var(--border-accent-subtle))"
        },
        destructive: {
            DEFAULT: "hsl(var(--border-destructive-default))",
            default: "hsl(var(--border-destructive-default))"
        },
        neutral: {
            DEFAULT: "hsl(var(--border-neutral-default))",
            black: "hsl(var(--border-neutral-black))",
            dark: "hsl(var(--border-neutral-dark))",
            dimmed: "hsl(var(--border-neutral-dimmed))",
            muted: "hsl(var(--border-neutral-muted))",
            strong: "hsl(var(--border-neutral-strong))",
            subtle: "hsl(var(--border-neutral-subtle))"
        },
        success: {
            DEFAULT: "hsl(var(--border-success-default))",
            default: "hsl(var(--border-success-default))"
        }
    },
    borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
        xs: "var(--radius-xs)",
        xxl: "var(--radius-xxl)"
    },
    borderWidth: {
        md: "var(--border-width-md)",
        sm: "var(--border-width-sm)"
    },
    fill: {
        accent: {
            DEFAULT: "hsl(var(--fill-accent-default))",
            default: "hsl(var(--fill-accent-default))"
        },
        destructive: {
            DEFAULT: "hsl(var(--fill-destructive-default))",
            undefined: "hsl(var(--fill-destructive))"
        },
        neutral: {
            DEFAULT: "hsl(var(--fill-neutral-default))",
            base: "hsl(var(--fill-neutral-base))",
            dark: "hsl(var(--fill-neutral-dark))",
            disabled: "hsl(var(--fill-neutral-disabled))",
            strong: "hsl(var(--fill-neutral-strong))",
            xstrong: "hsl(var(--fill-neutral-xstrong))"
        },
        success: {
            DEFAULT: "hsl(var(--fill-success-default))",
            undefined: "hsl(var(--fill-success))"
        },
        warning: {
            DEFAULT: "hsl(var(--fill-warning-default))",
            undefined: "hsl(var(--fill-warning))"
        }
    },
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
    margin: {
        lg: "var(--margin-lg)",
        md: "var(--margin-md)",
        sm: "var(--margin-sm)",
        xl: "var(--margin-xl)",
        xs: "var(--margin-xs)",
        xxl: "var(--margin-xxl)"
    },
    padding: {
        lg: "var(--padding-lg)",
        md: "var(--padding-md)",
        "md-plus": "var(--padding-md-plus)",
        none: "var(--padding-none)",
        sm: "var(--padding-sm)",
        "sm-extra": "var(--padding-sm-extra)",
        "sm-plus": "var(--padding-sm-plus)",
        xl: "var(--padding-xl)",
        xs: "var(--padding-xs)",
        "xs-plus": "var(--padding-xs-plus)",
        xxl: "var(--padding-xxl)",
        xxs: "var(--padding-xxs)"
    },
    shadow: {
        flat: "var(--shadow-flat)",
        lg: "var(--shadow-lg)",
        md: "var(--shadow-md)",
        sm: "var(--shadow-sm)",
        xl: "var(--shadow-xl)",
        xxl: "var(--shadow-xxl)"
    },
    spacing: {
        "3xl": "var(--spacing-3xl)",
        lg: "var(--spacing-lg)",
        md: "var(--spacing-md)",
        "md-plus": "var(--spacing-md-plus)",
        none: "var(--spacing-none)",
        sm: "var(--spacing-sm)",
        "sm-extra": "var(--spacing-sm-extra)",
        "sm-plus": "var(--spacing-sm-plus)",
        xl: "var(--spacing-xl)",
        xs: "var(--spacing-xs)",
        "xs-plus": "var(--spacing-xs-plus)",
        xxl: "var(--spacing-xxl)",
        xxs: "var(--spacing-xxs)"
    },
    textColor: {
        accent: {
            DEFAULT: "hsl(var(--text-accent-default))",
            muted: "hsl(var(--text-accent-muted))",
            primary: "hsl(var(--text-accent-primary))",
            subtle: "hsl(var(--text-accent-subtle))"
        },
        destructive: {
            DEFAULT: "hsl(var(--text-destructive-default))",
            muted: "hsl(var(--text-destructive-muted))",
            primary: "hsl(var(--text-destructive-primary))",
            subtle: "hsl(var(--text-destructive-subtle))"
        },
        neutral: {
            DEFAULT: "hsl(var(--text-neutral-default))",
            dimmed: "hsl(var(--text-neutral-dimmed))",
            disabled: "hsl(var(--text-neutral-disabled))",
            light: "hsl(var(--text-neutral-light))",
            muted: "hsl(var(--text-neutral-muted))",
            primary: "hsl(var(--text-neutral-primary))",
            strong: "hsl(var(--text-neutral-strong))"
        },
        sucess: {
            DEFAULT: "hsl(var(--text-sucess-default))",
            muted: "hsl(var(--text-sucess-muted))",
            primary: "hsl(var(--text-sucess-primary))",
            subtle: "hsl(var(--text-sucess-subtle))"
        }
    }
};
