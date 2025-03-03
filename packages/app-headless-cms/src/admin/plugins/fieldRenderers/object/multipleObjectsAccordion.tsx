import React, { Dispatch, SetStateAction, useState, useCallback } from "react";
import { i18n } from "@webiny/app/i18n";
import { IconButton } from "@webiny/ui/Button";
import { Cell } from "@webiny/ui/Grid";
import { Accordion as RootAccordion, AccordionItem } from "@webiny/ui/Accordion";
import {
    BindComponentRenderProp,
    CmsModelFieldRendererPlugin,
    CmsModelFieldRendererProps
} from "~/types";
import DynamicSection from "../DynamicSection";
import { Fields } from "~/admin/components/ContentEntryForm/Fields";
import { ReactComponent as DeleteIcon } from "~/admin/icons/close.svg";
import { ReactComponent as ArrowUp } from "./arrow_drop_up.svg";
import { ReactComponent as ArrowDown } from "./arrow_drop_down.svg";
import Accordion from "~/admin/plugins/fieldRenderers/Accordion";
import {
    fieldsWrapperStyle,
    dynamicSectionGridStyle,
    fieldsGridStyle,
    ItemHighLight,
    ObjectItem
} from "./StyledComponents";
import { generateAlphaNumericLowerCaseId } from "@webiny/utils";
import { FieldSettings } from "./FieldSettings";
import { AccordionRenderSettings, getAccordionRenderSettings } from "../AccordionRenderSettings";
import { useConfirmationDialog } from "@webiny/app-admin";

const t = i18n.ns("app-headless-cms/admin/fields/text");

interface ActionsProps {
    setHighlightIndex: Dispatch<SetStateAction<{ [key: number]: string }>>;
    index: number;
    bind: {
        index: BindComponentRenderProp;
        field: BindComponentRenderProp;
    };
}

const Actions = ({ setHighlightIndex, bind, index }: ActionsProps) => {
    const { moveValueDown, moveValueUp } = bind.field;

    const { showConfirmation } = useConfirmationDialog({
        message: `Are you sure you want to delete this item? This action is not reversible.`,
        acceptLabel: `Yes, I'm sure!`,
        cancelLabel: `No, leave it.`
    });

    const onDown = useCallback(
        (ev: React.BaseSyntheticEvent) => {
            ev.stopPropagation();
            moveValueDown(index);
            setHighlightIndex(map => ({
                ...map,
                [index + 1]: generateAlphaNumericLowerCaseId(12)
            }));
        },
        [moveValueDown, index]
    );

    const onUp = useCallback(
        (ev: React.BaseSyntheticEvent) => {
            ev.stopPropagation();
            moveValueUp(index);
            setHighlightIndex(map => ({
                ...map,
                [index - 1]: generateAlphaNumericLowerCaseId(12)
            }));
        },
        [moveValueUp, index]
    );

    const onDelete = (ev: React.BaseSyntheticEvent) => {
        ev.stopPropagation();
        showConfirmation(() => {
            bind.field.removeValue(index);
        });
    };

    return (
        <>
            <IconButton icon={<ArrowDown />} onClick={onDown} />
            <IconButton icon={<ArrowUp />} onClick={onUp} />
            <IconButton icon={<DeleteIcon />} onClick={onDelete} />
        </>
    );
};

const ObjectsRenderer = (props: CmsModelFieldRendererProps) => {
    const [highlightMap, setHighlightIndex] = useState<{ [key: number]: string }>({});
    const { field, contentModel, getBind } = props;

    const fieldSettings = FieldSettings.createFrom(field);

    if (!fieldSettings.hasFields()) {
        fieldSettings.logMissingFields();
        return null;
    }

    const settings = fieldSettings.getSettings();
    const { open } = getAccordionRenderSettings(field);

    const Bind = getBind();

    return (
        <Bind>
            {({ value }) => {
                const values = value || [];
                const label = `${field.label} ${values.length ? `(${values.length})` : ""}`;

                return (
                    <RootAccordion>
                        <AccordionItem title={label} description={field.helpText} open={open}>
                            <DynamicSection
                                {...props}
                                emptyValue={{}}
                                showLabel={false}
                                gridClassName={dynamicSectionGridStyle}
                            >
                                {({ Bind, bind, index }) => (
                                    <ObjectItem>
                                        {highlightMap[index] ? (
                                            <ItemHighLight key={highlightMap[index]} />
                                        ) : null}
                                        <Accordion
                                            title={`${props.field.label} #${index + 1}`}
                                            action={
                                                <Actions
                                                    setHighlightIndex={setHighlightIndex}
                                                    index={index}
                                                    bind={bind}
                                                />
                                            }
                                            // Open first Accordion by default
                                            defaultValue={index === 0}
                                        >
                                            <Cell span={12} className={fieldsWrapperStyle}>
                                                <Fields
                                                    Bind={Bind}
                                                    contentModel={contentModel}
                                                    fields={settings.fields}
                                                    layout={settings.layout}
                                                    gridClassName={fieldsGridStyle}
                                                />
                                            </Cell>
                                        </Accordion>
                                    </ObjectItem>
                                )}
                            </DynamicSection>
                        </AccordionItem>
                    </RootAccordion>
                );
            }}
        </Bind>
    );
};

const plugin: CmsModelFieldRendererPlugin = {
    type: "cms-editor-field-renderer",
    name: "cms-editor-field-renderer-objects-accordion",
    renderer: {
        rendererName: "objects-accordion",
        name: t`Accordion`,
        description: t`Renders fields within an accordion.`,
        canUse({ field }) {
            return field.type === "object" && Boolean(field.multipleValues);
        },
        render(props) {
            return <ObjectsRenderer {...props} />;
        },
        renderSettings({ field }) {
            return <AccordionRenderSettings field={field} />;
        }
    }
};

export default plugin;
