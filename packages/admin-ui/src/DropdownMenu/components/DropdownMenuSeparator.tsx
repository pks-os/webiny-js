import * as React from "react";
import { Separator, type SeparatorProps } from "~/Separator";
import { makeDecoratable } from "~/utils";

const DropdownMenuSeparatorBase = React.forwardRef<
    React.ElementRef<typeof Separator>,
    SeparatorProps
>((props, ref) => {
    return <Separator ref={ref} variant={"strong"} margin={"md"} {...props} />;
});

DropdownMenuSeparatorBase.displayName = Separator.displayName;

export const DropdownMenuSeparator = makeDecoratable(
    "DropdownMenuSeparator",
    DropdownMenuSeparatorBase
);
