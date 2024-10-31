import { clsx, type ClassValue } from "clsx";
import { generateId as baseGenerateId } from "@webiny/utils/generateId";
import { extendTailwindMerge } from "tailwind-merge";
import { cva, type VariantProps } from "class-variance-authority";
export { makeDecoratable } from "@webiny/react-composition";

const twMerge = extendTailwindMerge({
    override: {
        theme: { borderWidth: ["sm", "md"] }
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
