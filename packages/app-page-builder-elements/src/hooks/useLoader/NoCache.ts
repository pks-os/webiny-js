import { ILoaderCache } from "./ILoaderCache";

export class NoCache implements ILoaderCache {
    read() {
        return null;
    }

    write() {
        return;
    }

    remove() {
        return;
    }

    clear() {
        return;
    }
}
