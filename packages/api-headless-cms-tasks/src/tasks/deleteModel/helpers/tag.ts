import { MODEL_IS_GETTING_DELETED_TASK_ID_TAG } from "~/tasks/deleteModel/constants";

export const createTaskTag = (taskId: string): string => {
    return `${MODEL_IS_GETTING_DELETED_TASK_ID_TAG}${taskId}`;
};

export const containsTaskTag = (tags?: string[]): boolean => {
    return !!getTaskIdFromTag(tags);
};

export const getTaskTag = (tags?: string[]): string | null => {
    if (!Array.isArray(tags)) {
        return null;
    }
    return tags.find(tag => tag.startsWith(MODEL_IS_GETTING_DELETED_TASK_ID_TAG)) || null;
};

export const getTaskIdFromTag = (tags?: string[]): string | null => {
    const tag = getTaskTag(tags);
    if (!tag) {
        return null;
    }
    const result = tag.replace(MODEL_IS_GETTING_DELETED_TASK_ID_TAG, "");
    return !!result ? result : null;
};

export const removeTag = (tags?: string[]): string[] => {
    return (tags || []).filter(tag => !tag.startsWith(MODEL_IS_GETTING_DELETED_TASK_ID_TAG));
};
