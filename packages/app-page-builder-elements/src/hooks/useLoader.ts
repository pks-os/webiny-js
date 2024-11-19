import { useEffect, useMemo, useState } from "react";
import { createObjectHash } from "./useLoader/createObjectHash";
import { useRenderer } from "..";
import { getElementCacheKey } from "~/hooks/useLoader/getElementCacheKey";

export interface RendererLoader<TData = unknown> {
    data: TData | null;
    loading: boolean;
    cacheHit: boolean;
}

export function useLoader<TData = unknown>(
    loaderFn: () => Promise<TData>
): RendererLoader<TData> {
    const { getElement, loaderCache } = useRenderer();

    const element = getElement();
    const elementDataHash = createObjectHash(element.data);

    const loaderCachedData = useMemo(() => {
        const elementCacheKey = getElementCacheKey(element);
        return loaderCache.read<TData>(elementCacheKey);
    }, []);

    const [loader, setLoader] = useState<RendererLoader<TData>>(
        loaderCachedData
            ? {
                  data: loaderCachedData,
                  loading: false,
                  cacheHit: true
              }
            : { data: null, loading: true, cacheHit: false }
    );

    useEffect(() => {
        if (loader.cacheHit) {
            return;
        }

        loaderFn().then(data => {
            const elementCacheKey = getElementCacheKey(element);
            loaderCache.write(elementCacheKey, data);
            setLoader({ ...loader, data, loading: false });
        });
    }, [elementDataHash]);

    return loader;
}
