export class LoaderCache {
    private loaderCache: Record<string, Record<string, any>> = {};

    get(key: string) {
        return this.loaderCache[key];
    }

    set(key: string, value: any) {
        this.loaderCache[key] = value;
    }

    remove(key: string) {
        delete this.loaderCache[key];
    }
}
