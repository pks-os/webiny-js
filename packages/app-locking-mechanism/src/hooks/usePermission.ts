import { useMemo } from "react";
import { useSecurity } from "@webiny/app-security";

export const usePermission = () => {
    const { identity, getPermission } = useSecurity();

    const hasFullAccess = useMemo(() => {
        return !!getPermission("lockingMechanism.*");
    }, [identity]);

    return {
        hasFullAccess
    };
};
