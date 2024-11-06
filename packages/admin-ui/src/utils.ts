import { clsx, type ClassValue } from "clsx";
import { generateId as baseGenerateId } from "@webiny/utils/generateId";
import { extendTailwindMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";

export { makeDecoratable } from "@webiny/react-composition";

const twMerge = extendTailwindMerge({
    override: {
        classGroups: {
            "border-color": [
                "border-transparent",
                "border-white",
                "border-accent",
                "border-accent-default",
                "border-accent-dimmed",
                "border-accent-subtle",
                "border-destructive",
                "border-destructive-default",
                "border-neutral",
                "border-neutral-black",
                "border-neutral-dark",
                "border-neutral-dimmed",
                "border-neutral-muted",
                "border-neutral-strong",
                "border-neutral-subtle",
                "border-success",
                "border-success-default"
            ],
            "border-w": ["border-sm", "border-sm", "border-none"],
            "ring-color": [
                "ring-primary",
                "ring-primary-dimmed",
                "ring-primary-strong",
                "ring-primary-subtle",
                "ring-success",
                "ring-success-dimmed",
                "ring-success-strong",
                "ring-success-subtle"
            ],
            "ring-w": ["ring-sm", "ring-md", "ring-lg"]
        }
    }
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const generateId = (initialId?: string) => {
    if (initialId) {
        return initialId;
    }
    return "wby-" + baseGenerateId(4);
};

export { cva, type VariantProps };
