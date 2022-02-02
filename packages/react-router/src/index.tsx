import { useContext } from "react";
import {
    BrowserRouter as RBrowserRouter,
    RouteChildrenProps,
    StaticRouter as RStaticRouter
    // @ts-ignore
} from "react-router-dom";
// @ts-ignore
import { __RouterContext } from "react-router";
import { RouterContext, ReactRouterContextValue } from "./context/RouterContext";

// @ts-ignore
export * from "react-router-dom";

export { Link } from "./Link";

export type UseRouter = RouteChildrenProps & ReactRouterContextValue;

export function useRouter(): UseRouter {
    return {
        ...useContext(RouterContext),
        ...useContext(__RouterContext)
    };
}

import enhancer from "./routerEnhancer";
export const BrowserRouter = enhancer(RBrowserRouter);
export const StaticRouter = enhancer(RStaticRouter);
