import React, { useEffect, useMemo, useState } from "react";
import { plugins } from "@webiny/plugins";
import { Prompt } from "@webiny/react-router";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler";
import { createSaveAction, SaveTemplateActionEvent } from "./saveTemplate";
import { UpdateDocumentActionEvent } from "~/editor/recoil/actions";
import { TemplateEditorEventActionCallableState } from "~/templateEditor/types";
import { createCloneElementPlugin } from "./cloneElement/plugin";
import { useUpdatePageTemplate } from "~/features";

export const EventActionHandlers = () => {
    plugins.register(createCloneElementPlugin());
    const eventActionHandler = useEventActionHandler<TemplateEditorEventActionCallableState>();
    const [isDirty, setDirty] = useState(false);
    const { updatePageTemplate } = useUpdatePageTemplate();
    const saveTemplate = useMemo(() => createSaveAction(updatePageTemplate), []);

    useEffect(() => {
        const offSaveTemplateAction = eventActionHandler.on(SaveTemplateActionEvent, (...args) => {
            setDirty(false);
            return saveTemplate(...args);
        });

        const offUpdateTemplateAction = eventActionHandler.on(
            UpdateDocumentActionEvent,
            async (state, _, args) => {
                setDirty(true);
                return {
                    state: {
                        template: {
                            ...state.template,
                            ...(args?.document || {})
                        }
                    },
                    actions: []
                };
            }
        );

        return () => {
            offSaveTemplateAction();
            offUpdateTemplateAction();
        };
    }, []);

    return (
        <Prompt
            when={isDirty}
            message="There are some unsaved changes! Are you sure you want to navigate away and discard all changes?"
        />
    );
};
