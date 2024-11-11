import React from "react";
import { App } from "@webiny/app";
import { ThemeProvider } from "@webiny/app-theme";
import { WcpProvider } from "@webiny/app-wcp";
import { CircularProgress } from "@webiny/ui/Progress";
import { ApolloClientFactory, createApolloProvider } from "./providers/ApolloProvider";
import { Base } from "./Base";
import { createTelemetryProvider } from "./providers/TelemetryProvider";
import { createUiStateProvider } from "./providers/UiStateProvider";
import { createAdminUiStateProvider } from "./providers/AdminUiStateProvider";
import { createUiProviders } from "./providers/UiProviders";
import { SearchProvider } from "./ui/Search";
import { UserMenuProvider } from "./ui/UserMenu";
import { NavigationProvider } from "./ui/Navigation";
import { createDialogsProvider } from "~/components/Dialogs/DialogsContext";
import { DefaultIcons, IconPickerConfigProvider } from "~/components/IconPicker/config";

export interface AdminProps {
    createApolloClient: ApolloClientFactory;
    children?: React.ReactNode;
}

export const Admin = ({ children, createApolloClient }: AdminProps) => {
    const ApolloProvider = createApolloProvider(createApolloClient);
    const TelemetryProvider = createTelemetryProvider();
    const UIProviders = createUiProviders();
    const UiStateProvider = createUiStateProvider();
    const AdminUiStateProvider = createAdminUiStateProvider();
    const DialogsProvider = createDialogsProvider();

    return (
        <ApolloProvider>
            <ThemeProvider>
                <WcpProvider loader={<CircularProgress label={"Loading..."} />}>
                    <App
                        providers={[
                            TelemetryProvider,
                            UIProviders,
                            UiStateProvider,
                            SearchProvider,
                            UserMenuProvider,
                            NavigationProvider,
                            DialogsProvider,
                            IconPickerConfigProvider,
                            AdminUiStateProvider
                        ]}
                    >
                        <Base />
                        <DefaultIcons />
                        {children}
                    </App>
                </WcpProvider>
            </ThemeProvider>
        </ApolloProvider>
    );
};
