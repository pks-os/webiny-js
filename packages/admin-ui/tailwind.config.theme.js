module.exports = {
    backgroundColor: {
        transparent: "transparent",
        white: "white",
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
        transparent: "transparent",
        white: "white",
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
        none: "var(--border-width-none)",
        sm: "var(--border-width-sm)"
    },
    fill: {
        transparent: "transparent",
        white: "white",
        accent: {
            DEFAULT: "hsl(var(--fill-accent-default))",
            default: "hsl(var(--fill-accent-default))"
        },
        destructive: {
            DEFAULT: "hsl(var(--fill-destructive-default))",
            destructive: "hsl(var(--fill-destructive))"
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
            success: "hsl(var(--fill-success))"
        },
        warning: {
            DEFAULT: "hsl(var(--fill-warning-default))",
            warning: "hsl(var(--fill-warning))"
        }
    },
    fontSize: {
        "3xl": [
            "var(--text-3xl)",
            {
                lineHeight: "var(--text-3xl-leading)",
                letterSpacing: "var(--text-3xl-tracking)"
            }
        ],
        "4xl": [
            "var(--text-4xl)",
            {
                lineHeight: "var(--text-4xl-leading)",
                letterSpacing: "var(--text-4xl-tracking)"
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
        ],
        xl: [
            "var(--text-xl)",
            {
                lineHeight: "var(--text-xl-leading)",
                letterSpacing: "var(--text-xl-tracking)"
            }
        ],
        xxl: [
            "var(--text-xxl)",
            {
                lineHeight: "var(--text-xxl-leading)",
                letterSpacing: "var(--text-xxl-tracking)"
            }
        ]
    },
    fontWeight: {
        regular: "var(--font-weight-regular)",
        semibold: "var(--font-weight-semibold)"
    },
    margin: {
        lg: "var(--margin-lg)",
        md: "var(--margin-md)",
        "md-plus": "var(--margin-md-plus)",
        none: "var(--margin-none)",
        sm: "var(--margin-sm)",
        "sm-extra": "var(--margin-sm-extra)",
        "sm-plus": "var(--margin-sm-plus)",
        xl: "var(--margin-xl)",
        xs: "var(--margin-xs)",
        "xs-plus": "var(--margin-xs-plus)",
        xxl: "var(--margin-xxl)",
        xxs: "var(--margin-xxs)"
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
    ringColor: {
        transparent: "transparent",
        white: "white",
        primary: {
            DEFAULT: "hsl(var(--ring-primary-default))",
            dimmed: "hsl(var(--ring-primary-dimmed))",
            strong: "hsl(var(--ring-primary-strong))",
            subtle: "hsl(var(--ring-primary-subtle))"
        },
        success: {
            DEFAULT: "hsl(var(--ring-success-default))",
            dimmed: "hsl(var(--ring-success-dimmed))",
            strong: "hsl(var(--ring-success-strong))",
            subtle: "hsl(var(--ring-success-subtle))"
        }
    },
    ringWidth: {
        lg: "var(--ring-width-lg)",
        md: "var(--ring-width-md)",
        sm: "var(--ring-width-sm)"
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
        transparent: "transparent",
        white: "white",
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
        success: {
            DEFAULT: "hsl(var(--text-success-default))",
            muted: "hsl(var(--text-success-muted))",
            primary: "hsl(var(--text-success-primary))",
            subtle: "hsl(var(--text-success-subtle))"
        }
    }
};
