import React from "react";
import { Route } from "@webiny/react-router";
import Helmet from "react-helmet";
import { AdminLayout } from "@webiny/app-admin/components/AdminLayout";
import { SecureRoute } from "@webiny/app-security/components";
import { RoutePlugin } from "@webiny/app/types";
import { EditorPluginsLoader } from "../components/EditorPluginsLoader";

import Categories from "../views/Categories/Categories";
import Menus from "../views/Menus/Menus";
import PagesOld from "../views/Pages/Pages";
import Pages from "~/admin/views/Pages/Table";
import BlockCategories from "../views/BlockCategories/BlockCategories";
import PageBlocks from "../views/PageBlocks/PageBlocks";

import { PageEditor } from "~/pageEditor/Editor";
import { BlockEditor } from "~/blockEditor/Editor";

const ROLE_PB_CATEGORY = "pb.category";
const ROLE_PB_MENUS = "pb.menu";
const ROLE_PB_PAGES = "pb.page";
const ROLE_PB_BLOCK = "pb.block";

const plugins: RoutePlugin[] = [
    {
        name: "route-pb-categories",
        type: "route",
        route: (
            <Route
                exact
                path="/page-builder/categories"
                render={() => (
                    <SecureRoute permission={ROLE_PB_CATEGORY}>
                        <AdminLayout>
                            <Helmet title={"Page Builder - Categories"} />
                            <Categories />
                        </AdminLayout>
                    </SecureRoute>
                )}
            />
        )
    },
    {
        name: "route-pb-menus",
        type: "route",
        route: (
            <Route
                exact
                path="/page-builder/menus"
                render={() => (
                    <SecureRoute permission={ROLE_PB_MENUS}>
                        <AdminLayout>
                            <Helmet title={"Page Builder - Menus"} />
                            <Menus />
                        </AdminLayout>
                    </SecureRoute>
                )}
            />
        )
    },
    {
        name: "route-pb-pages",
        type: "route",
        route: (
            <Route
                exact
                path="/page-builder/pages"
                render={({ location }) => (
                    <SecureRoute permission={ROLE_PB_PAGES}>
                        <EditorPluginsLoader location={location}>
                            <AdminLayout>
                                <Helmet title={"Page Builder - Pages"} />
                                <PagesOld />
                            </AdminLayout>
                        </EditorPluginsLoader>
                    </SecureRoute>
                )}
            />
        )
    },
    {
        name: "route-pb-pages-table",
        type: "route",
        route: (
            <Route
                exact
                path="/page-builder/pages-table"
                render={({ location }) => (
                    <SecureRoute permission={ROLE_PB_PAGES}>
                        <EditorPluginsLoader location={location}>
                            <AdminLayout>
                                <Helmet title={"Page Builder - Pages Table"} />
                                <Pages />
                            </AdminLayout>
                        </EditorPluginsLoader>
                    </SecureRoute>
                )}
            />
        )
    },
    {
        name: "route-pb-page-editor",
        type: "route",
        route: (
            <Route
                exact
                path="/page-builder/editor/:id"
                render={({ location }) => {
                    return (
                        <SecureRoute permission={ROLE_PB_PAGES}>
                            <EditorPluginsLoader location={location}>
                                <Helmet title={"Page Builder - Edit page"} />
                                <PageEditor />
                            </EditorPluginsLoader>
                        </SecureRoute>
                    );
                }}
            />
        )
    },
    {
        name: "route-pb-block-categories",
        type: "route",
        route: (
            <Route
                exact
                path="/page-builder/block-categories"
                render={() => (
                    <SecureRoute permission={ROLE_PB_BLOCK}>
                        <AdminLayout>
                            <Helmet title={"Page Builder - Block Categories"} />
                            <BlockCategories />
                        </AdminLayout>
                    </SecureRoute>
                )}
            />
        )
    },
    {
        name: "route-pb-page-blocks",
        type: "route",
        route: (
            <Route
                exact
                path="/page-builder/page-blocks"
                render={() => (
                    <SecureRoute permission={ROLE_PB_BLOCK}>
                        <AdminLayout>
                            <Helmet title={"Page Builder - Blocks"} />
                            <PageBlocks />
                        </AdminLayout>
                    </SecureRoute>
                )}
            />
        )
    },
    {
        name: "route-pb-block-editor",
        type: "route",
        route: (
            <Route
                exact
                path="/page-builder/block-editor/:id"
                render={({ location }) => {
                    return (
                        <SecureRoute permission={ROLE_PB_PAGES}>
                            <EditorPluginsLoader location={location}>
                                <Helmet title={"Page Builder - Edit block"} />
                                <BlockEditor />
                            </EditorPluginsLoader>
                        </SecureRoute>
                    );
                }}
            />
        )
    }
];

export default plugins;
