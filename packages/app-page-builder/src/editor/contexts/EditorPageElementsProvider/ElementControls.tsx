import React from "react";
import { useRenderer } from "@webiny/app-page-builder-elements";
import { ElementControlsOverlay } from "./ElementControlsOverlay";
import { ElementControlHorizontalDropZones } from "./ElementControlHorizontalDropZones";
import { DropElementActionEvent } from "~/editor/recoil/actions";
import { useEventActionHandler } from "~/editor/hooks/useEventActionHandler";
import Droppable, { DragObjectWithTypeWithTarget } from "~/editor/components/Droppable";
import { useRecoilValue } from "recoil";
import { uiAtom } from "~/editor/recoil/modules";
import { useElementPlugin } from "~/editor/contexts/EditorPageElementsProvider/useElementPlugin";
import { makeDecoratable, useSnackbar } from "@webiny/app-admin";
import { getElementTitle } from "~/editor/contexts/EditorPageElementsProvider/getElementTitle";
import styled from "@emotion/styled";

const DisablePointerEvents = styled("pb-eco-interactivity")`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
`;

export interface ElementControlsProps {
    canDrag?: boolean;
    canEdit?: boolean;
    canHighlight?: boolean;
    canActivate?: boolean;
    children?: React.ReactNode;
}

// Provides controls and visual feedback for page elements:
// - hover / active visual overlays
// - drag and drop functionality
export const ElementControls = makeDecoratable("ElementControls", (props: ElementControlsProps) => {
    const { getElement, meta } = useRenderer();
    const { showSnackbar } = useSnackbar();

    const element = getElement();

    const overlayInteractions = {
        canDrag: typeof props.canDrag === "undefined" ? true : props.canDrag,
        canHighlight: typeof props.canHighlight === "undefined" ? true : props.canHighlight,
        canActivate: typeof props.canActivate === "undefined" ? true : props.canActivate
    };

    const canEdit = typeof props.canEdit === "undefined" ? true : props.canEdit;

    // No need to add any controls and visual feedback for the root document page element.
    // Note that the element type never changes, that's why we're safe to return here,
    // despite the fact that below we're using more React hooks.
    if (element.type === "document") {
        return null;
    }

    const elementPlugin = useElementPlugin(element);
    const handler = useEventActionHandler();
    const { isDragging } = useRecoilValue(uiAtom);

    // If the current element is a child of a pre-made block,
    // then we don't want to render any controls for any child elements.
    const isBlockChild = meta?.parentBlockElement;
    if (isBlockChild) {
        return null;
    }

    // If the current element is a child of a pre-made template block,
    // then we don't want to render any controls for any child elements.
    const isTemplateBlockChild = meta?.parentTemplateBlockElement;
    if (isTemplateBlockChild) {
        // We don't want to prevent block editing in the template editor. We only want to do it
        // in the page editor, when working with pages that were created from a template. In the
        // page editor, within the `data.template` object, we have a `slug` property, which is not
        // available in the template editor. That give us the ability to distinguish between the two.

        // If the page is unlinked from the template in the page editor, note that the
        // `data.template` object will be removed, hence the `?.` operator here.
        if (meta.parentDocumentElement.data.template?.slug) {
            return null;
        }
    }

    const dropElementAction = (source: DragObjectWithTypeWithTarget) => {
        const { target } = source;

        // If the `target` property of the dragged element's plugin is an array, we want to
        // check if the dragged element can be dropped into the target element (the element
        // for which this drop zone is rendered).
        if (Array.isArray(target) && target.length > 0) {
            if (!target.includes(element.type)) {
                const sourceTitle = getElementTitle(source.type);
                const targetTitle = getElementTitle(element.type);
                showSnackbar(`${sourceTitle} cannot be dropped into ${targetTitle}.`);
                return;
            }
        }

        handler.trigger(
            new DropElementActionEvent({
                source,
                target: {
                    id: element.id,
                    type: element.type,
                    position: 0
                }
            })
        );
    };

    // When dragging, if the element is droppable, we want to render the drop zones.
    if (isDragging) {
        let render = <ElementControlHorizontalDropZones />;

        if (elementPlugin?.canReceiveChildren) {
            render = (
                <>
                    <Droppable
                        onDrop={source => {
                            // When dragging elements, we don't want to allow dropping them into saved blocks. Note
                            // the `blockId` only exists in the page editor. It doesn't exist in the block editor.
                            const isBlock = element.data.blockId;
                            if (isBlock) {
                                return null;
                            }

                            return dropElementAction(source);
                        }}
                        type={element.type}
                        isVisible={() => true}
                    >
                        {({ drop }) => (
                            <ElementControlsOverlay dropRef={drop} {...overlayInteractions}>
                                {props.children}
                            </ElementControlsOverlay>
                        )}
                    </Droppable>
                    {render}
                </>
            );
        }

        return render;
    }

    return (
        <>
            <ElementControlsOverlay {...overlayInteractions}>
                {props.children}
            </ElementControlsOverlay>
            {!canEdit ? <DisablePointerEvents /> : null}
        </>
    );
});
