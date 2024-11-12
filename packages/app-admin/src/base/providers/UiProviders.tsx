import React from "react";
import { createProvider } from "@webiny/app";
import { Providers } from "@webiny/admin-ui";

interface UiProvidersProps {
    children: React.ReactNode;
}

export const createUiProviders = () => {
    return createProvider(Component => {
        return function UiProviders({ children }: UiProvidersProps) {
            return (
                <Providers>
                    <Component>{children}</Component>
                </Providers>
            );
        };
    });
};
