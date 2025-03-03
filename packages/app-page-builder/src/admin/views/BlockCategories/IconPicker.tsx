// TODO: find a better way to share IconPicker with icons across apps.
import React, { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { css } from "emotion";
import { plugins } from "@webiny/plugins";
import { Typography } from "@webiny/ui/Typography";
import { Grid } from "react-virtualized";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DelayedOnChange } from "@webiny/ui/DelayedOnChange";
import { Menu, MenuChildrenFunctionProps } from "@webiny/ui/Menu";
import { Input } from "@webiny/ui/Input";
import { PbIcon, PbIconsPlugin } from "~/types";
import { FormComponentProps } from "@webiny/ui/types";
import { FormElementMessage } from "@webiny/ui/FormElementMessage";
import { GridCellProps } from "react-virtualized/dist/es/Grid";

/**
 * Controls the helper text below the checkbox.
 * @type {string}
 */
const iconPickerLabel = css({ marginBottom: 5, marginLeft: 2 });

const MenuWrapper = css`
    color: var(--mdc-theme-text-secondary-on-background);
    background-color: var(--mdc-theme-on-background);
    border-bottom: 1px solid var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54));
    padding: 16px 8px;
    cursor: pointer;
    :hover {
        border-bottom: 1px solid rgba(0, 0, 0, 1);
    }
`;

const NoResultWrapper = css({
    width: 640,
    color: "var(--mdc-theme-text-secondary-on-background)",
    padding: "16px 12px"
});

const COLUMN_COUNT = 6;

const gridItem = css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    boxSizing: "border-box",
    paddingTop: 15,
    alignItems: "center",
    textAlign: "center",
    cursor: "pointer",
    transform: "translateZ(0)",
    borderRadius: 2,
    color: "var(--mdc-theme-text-secondary-on-background)",
    transition: "all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)",
    "&::after": {
        boxShadow: "0 0.25rem 0.125rem 0 rgba(0,0,0,0.05)",
        transition: "opacity 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)",
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: 0
    },
    "&:hover": {
        backgroundColor: "var(--mdc-theme-background)",
        color: "var(--mdc-theme-text-primary-on-background)",
        "&::after": {
            opacity: 1
        }
    },
    ">svg": {
        width: 42,
        marginBottom: 5
    }
});

const grid = css({
    padding: 20
});

const pickIcon = css({
    width: 50,
    textAlign: "center",
    cursor: "pointer"
});

const searchInput = css({
    input: {
        padding: "20px 12px 20px"
    }
});

interface IconPickerProps extends FormComponentProps {
    label?: React.ReactNode;
    description?: React.ReactNode;
}
const IconPicker = ({ value, onChange, label, description, validation }: IconPickerProps) => {
    const [filter, setFilter] = useState("");
    const [mustRenderGrid, setMustRenderGrid] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTimeout(() => {
            if (mustRenderGrid && inputRef.current) {
                inputRef.current.focus();
            }
        }, 50);
    }, [mustRenderGrid]);

    const onFilterChange = useCallback(
        (value: string) => {
            setFilter(value);
        },
        [filter]
    );

    const allIcons: PbIcon[] = useMemo(() => {
        const iconPlugins = plugins.byType<PbIconsPlugin>("pb-icons");
        return iconPlugins.reduce((icons: Array<PbIcon>, pl) => {
            return icons.concat(pl.getIcons());
        }, []);
    }, []);

    const icons = useMemo(() => {
        return filter ? allIcons.filter(ic => ic.name.includes(filter)) : allIcons;
    }, [filter]);

    const renderCell = useCallback(
        ({ closeMenu }: MenuChildrenFunctionProps) => {
            return function renderCell({
                columnIndex,
                key,
                rowIndex,
                style
            }: GridCellProps): React.ReactNode {
                const item = icons[rowIndex * COLUMN_COUNT + columnIndex];
                if (!item) {
                    return null;
                }

                return (
                    <div
                        key={key}
                        style={style}
                        className={gridItem}
                        onClick={() => {
                            if (onChange) {
                                onChange(item.id.join("/"));
                            }
                            closeMenu();
                        }}
                    >
                        <FontAwesomeIcon icon={item.id} size={"2x"} />
                        <Typography use={"body2"}>{item.name}</Typography>
                    </div>
                );
            };
        },
        [mustRenderGrid, icons]
    );

    const renderGrid = useCallback(
        ({ closeMenu }: MenuChildrenFunctionProps) => {
            if (!mustRenderGrid) {
                return;
            }

            return (
                <>
                    <DelayedOnChange value={filter} onChange={onFilterChange}>
                        {({ value, onChange }) => (
                            <Input
                                inputRef={inputRef}
                                className={searchInput}
                                value={value}
                                onChange={onChange}
                                placeholder={"Search icons..."}
                            />
                        )}
                    </DelayedOnChange>
                    {icons.length === 0 ? (
                        <div className={NoResultWrapper}>
                            <Typography use="body1">No results found.</Typography>
                        </div>
                    ) : (
                        <Grid
                            className={grid}
                            cellRenderer={renderCell({ closeMenu })}
                            columnCount={COLUMN_COUNT}
                            columnWidth={100}
                            height={440}
                            rowCount={Math.ceil(icons.length / COLUMN_COUNT)}
                            rowHeight={100}
                            width={640}
                        />
                    )}
                </>
            );
        },
        [mustRenderGrid, icons]
    );

    const fontAwesomeIconValue: any =
        typeof value === "string" && value.includes("/") ? value.split("/") : ["fas", "star"];

    const { isValid: validationIsValid, message: validationMessage } = validation || {};

    return (
        <>
            {label && (
                <div className={iconPickerLabel}>
                    <Typography use={"body1"}>{label}</Typography>
                </div>
            )}
            <Menu
                onOpen={() => setMustRenderGrid(true)}
                onClose={() => setMustRenderGrid(false)}
                handle={
                    <div className={MenuWrapper}>
                        <div className={pickIcon}>
                            <FontAwesomeIcon icon={fontAwesomeIconValue} size={"2x"} />
                        </div>
                    </div>
                }
                render={renderGrid}
            />

            {validationIsValid === false && (
                <FormElementMessage error>{validationMessage}</FormElementMessage>
            )}
            {validationIsValid !== false && description && (
                <FormElementMessage>{description}</FormElementMessage>
            )}
        </>
    );
};

export default IconPicker;
