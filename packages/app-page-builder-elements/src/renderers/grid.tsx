import React from "react";
import { Elements } from "~/components/Elements";
import { createRenderer } from "~/createRenderer";
import { useRenderer } from "~/hooks/useRenderer";

export const GridRenderer = createRenderer(
    () => {
        const { getElement } = useRenderer();

        const element = getElement();
        return <Elements element={element} />;
    },
    {
        baseStyles: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%"
        }
    }
);
