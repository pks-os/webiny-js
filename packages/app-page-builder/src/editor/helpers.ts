import invariant from "invariant";
import { customAlphabet } from "nanoid";
import { set } from "dot-prop-immutable";
import { DragObjectWithTypeWithTarget as BaseDragObjectWithTypeWithTarget } from "./components/Droppable";
import { plugins } from "@webiny/plugins";
import {
    PbBlockVariable,
    PbEditorBlockPlugin,
    PbEditorElement,
    PbEditorElementTree,
    PbEditorPageElementPlugin,
    PbEditorPageElementSettingsPlugin,
    PbEditorPageElementStyleSettingsPlugin,
    PbElement
} from "~/types";
import {
    CreateElementActionEvent,
    DeleteElementActionEvent,
    UpdateDocumentActionEvent,
    updateElementAction,
    UpdateElementActionArgsType
} from "~/editor/recoil/actions";
import { AfterDropElementActionEvent } from "~/editor/recoil/actions/afterDropElement";
import { executeAction } from "~/editor/recoil/eventActions";

const ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
export const getNanoid = customAlphabet(ALPHANUMERIC, 10);

interface FlatElements {
    [id: string]: PbEditorElement;
}

export const flattenElements = (
    el?: PbEditorElementTree | PbEditorElement,
    parent?: string
): FlatElements => {
    if (!el || !el.id) {
        return {};
    }
    const els: FlatElements = {};
    els[el.id] = set(
        el,
        "elements",
        (el.elements || []).map(child => {
            if (typeof child === "string") {
                return child;
            }
            const children = flattenElements(child, el.id);
            Object.keys(children).forEach(id => {
                const childElement = {
                    ...children[id]
                };
                delete childElement.path;
                els[id] = childElement;
            });
            return child.id;
        })
    );

    els[el.id].parent = parent;

    return els;
};

interface CreateElementCallableOptions {
    [key: string]: any;
}

interface CreateElementCallable {
    (
        type: string,
        options?: CreateElementCallableOptions,
        parent?: PbEditorElement
    ): PbEditorElement;
}

export const createElement: CreateElementCallable = (
    type,
    options = {},
    parent
): PbEditorElement => {
    const plugin = plugins
        .byType<PbEditorPageElementPlugin>("pb-editor-page-element")
        .find(pl => pl.elementType === type);

    invariant(plugin, `Missing element plugin for type "${type}"!`);

    /**
     * Used ts-ignore because TS is complaining about always overriding some properties
     */
    return {
        // @ts-expect-error
        id: getNanoid(),
        // @ts-expect-error
        data: {
            settings: {}
        },
        // @ts-expect-error
        elements: [],
        parent: parent ? parent.id : undefined,
        // @ts-expect-error
        type,
        ...addElementId(plugin.create(options, parent))
    };
};

export const addElementToParent = (
    element: PbEditorElement,
    parent: PbEditorElement,
    position?: number
): PbEditorElement => {
    if (position === undefined || position === null) {
        return {
            ...parent,
            elements: [...parent.elements, { ...element, parent: parent.id }]
        };
    }

    return {
        ...parent,
        elements: [
            ...parent.elements.slice(0, position),
            { ...element, parent: parent.id },
            ...parent.elements.slice(position)
        ]
    };
};

export const removeElementFromParent = (parent: PbEditorElement, id?: string): PbEditorElement => {
    return {
        ...parent,
        elements: parent.elements.filter(child => child !== id)
    };
};

export interface DragObjectWithTypeWithTarget extends BaseDragObjectWithTypeWithTarget {
    elements?: PbEditorElement[];
    data?: Record<string, any>;
}

export const createDroppedElement = (
    source: DragObjectWithTypeWithTarget,
    target: PbEditorElement
): PbEditorElement => {
    if (source.id) {
        const id = getNanoid();

        return {
            id,
            type: source.type,
            elements: (source.elements || []).map((childElement: PbEditorElement) => ({
                ...childElement,
                parent: id
            })),
            data: source.data || {},
            parent: target.id
        };
    }

    return createElement(source.type, {}, target);
};

/**
 * Traverse elements and generate valid element IDs and `variableId` references.
 */
export function prefixElementIdsRecursively(
    elements: PbEditorElement[],
    id: string
): PbEditorElement[] {
    return elements.map(element => {
        return {
            ...element,
            id: `${id}#${element.id}`,
            elements: prefixElementIdsRecursively(element.elements as PbEditorElement[], id),
            data: prefixElementVariableId(element.data, id)
        };
    });
}

/**
 * If element is referencing a variable (via the `variableId` attribute), update the reference with the given `id` prefix.
 */
function prefixElementVariableId(
    data: PbEditorElement["data"],
    id: string
): PbEditorElement["data"] {
    if (data?.variableId) {
        const variableId = data.variableId.split("#").pop();
        const newId = [id, variableId].join("#");

        return { ...data, variableId: newId };
    }

    return data;
}

/**
 * Update all block element variable IDs with the given `blockId` prefix.
 */
export function generateBlockVariableIds(variables: PbBlockVariable[], blockId: string) {
    return variables.map(variable => {
        const variableId = variable.id.split("#").pop();
        const newId = [blockId, variableId].join("#");

        return { ...variable, id: newId };
    });
}

/**
 * Add unique id to elements recursively
 */
export const addElementId = (target: Omit<PbEditorElement, "id">): PbEditorElement => {
    /**
     * Need to cast because typescript thinks we removed everything via Omit???
     */
    // TODO @ts-refactor
    const element: PbEditorElement = {
        ...(target as PbEditorElement),
        id: getNanoid()
    };

    if (Array.isArray(element.elements)) {
        element.elements = (element.elements as PbEditorElement[]).map(el => {
            return addElementId(el);
        });
    }
    return element;
};

/**
 * Remove id from elements recursively
 */
export const removeElementId = (el: PbElement): PbElement => {
    // @ts-expect-error
    delete el.id;

    el.elements = el.elements.map(el => {
        // @ts-expect-error
        delete el.id;
        if (el.elements && el.elements.length) {
            el = removeElementId(el);
        }

        return el;
    });

    return el;
};

export const createBlockElements = (name?: string): PbEditorElement => {
    const plugin = plugins.byName<PbEditorBlockPlugin>(name);

    invariant(plugin, `Missing block plugin "${name}"!`);
    /**
     * Used ts-ignore because TS is complaining about always overriding some properties
     */
    return {
        // @ts-expect-error
        id: getNanoid(),
        // @ts-expect-error
        data: {},
        // @ts-expect-error
        elements: [],
        ...addElementId(plugin.create())
    };
};

export const userElementSettingsPlugins = (elementType: string): string[] => {
    return plugins
        .byType<PbEditorPageElementSettingsPlugin>("pb-editor-page-element-settings")
        .filter(pl => {
            if (typeof pl.elements === "boolean") {
                return pl.elements === true;
            }
            if (Array.isArray(pl.elements)) {
                return pl.elements.includes(elementType);
            }

            return false;
        })
        .map(pl => pl.name) as string[];
};

export const userElementStyleSettingsPlugins = (elementType: string): string[] => {
    return plugins
        .byType<PbEditorPageElementStyleSettingsPlugin>("pb-editor-page-element-style-settings")
        .filter(pl => {
            if (typeof pl.elements === "boolean") {
                return pl.elements === true;
            }
            if (Array.isArray(pl.elements)) {
                return pl.elements.includes(elementType);
            }

            return false;
        })
        .map(pl => pl.name) as string[];
};

type CreateEmptyElementCallableType = (
    args: Pick<PbEditorElement, "id" | "type">
) => PbEditorElement;

export const createEmptyElement: CreateEmptyElementCallableType = ({ id, type }) => {
    return {
        id,
        type,
        data: {
            settings: {}
        },
        elements: []
    };
};

export interface UpdateBlockPositionParams {
    parent: PbEditorElement;
    sourcePosition: number;
    targetPosition: number;
}

export const updateBlockPosition = (params: UpdateBlockPositionParams): PbEditorElement => {
    const { parent, sourcePosition: source, targetPosition: target } = params;
    if (source === target) {
        return parent;
    }

    return {
        ...parent,
        elements: moveInPlace(parent.elements as PbEditorElement[], source, target)
    };
};

export const moveInPlace = (
    arr: PbEditorElement[],
    from: number,
    to: number
): PbEditorElement[] => {
    const newArray = [...arr];

    const [item] = newArray.splice(from, 1);
    newArray.splice(to, 0, item);

    return newArray;
};

export const onReceived: PbEditorPageElementPlugin["onReceived"] = props => {
    const { source, target, position, state, meta } = props;

    /**
     * TODO: figure out the correct type instead of the PbEditorElement.
     */
    // @ts-expect-error
    const element = createDroppedElement(source, target);
    const parent = addElementToParent(element, target, position);

    const triggerDocumentUpdate = () => new UpdateDocumentActionEvent({ history: true });

    const result = executeAction<UpdateElementActionArgsType>(state, meta, updateElementAction, {
        element: parent,
        // Dropping of elements should always be stored to history, to trigger document save.
        history: false
    });

    result.actions.push(new AfterDropElementActionEvent({ element }));

    if (source.id) {
        // Delete source element
        result.actions.push(
            new DeleteElementActionEvent({
                element: source as PbEditorElement
            })
        );

        result.actions.push(triggerDocumentUpdate());

        return result;
    }

    result.actions.push(
        new CreateElementActionEvent({
            element,
            source: source as PbEditorElement
        })
    );

    result.actions.push(triggerDocumentUpdate());

    return result;
};
