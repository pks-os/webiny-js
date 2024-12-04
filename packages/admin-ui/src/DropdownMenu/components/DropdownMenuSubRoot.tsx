import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { makeDecoratable } from "~/utils";

const DropdownMenuSubRootBase = DropdownMenuPrimitive.Sub;
export const DropdownMenuSubRoot = makeDecoratable("DropdownMenuSubRoot", DropdownMenuSubRootBase);
