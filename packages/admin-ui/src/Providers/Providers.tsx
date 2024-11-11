import React from "react";
import { Toast } from "~/Toast";
import { TooltipProvider } from "~/Tooltip";

export interface ProvidersProps {
    children?: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
    return (
        <Toast.Provider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toast.Viewport />
        </Toast.Provider>
    );
};
