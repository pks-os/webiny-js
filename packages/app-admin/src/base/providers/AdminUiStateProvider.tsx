import React from "react";
import { UiProvider } from "@webiny/app/contexts/Ui";
import { createProvider } from "@webiny/app";

interface AdminUiStateProviderProps {
    children: React.ReactNode;
}

export const createAdminUiStateProvider = () => {
    return createProvider(Component => {
        return function AdminUiStateProvider({ children }: AdminUiStateProviderProps) {
            return (
                <UiProvider>
                    <Component>{children}</Component>
                </UiProvider>
            );
        };
    });
};
