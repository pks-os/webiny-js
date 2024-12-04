import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { makeDecoratable } from "~/utils";

const DropdownMenuRootBase = DropdownMenuPrimitive.Root;
export const DropdownMenuRoot = makeDecoratable("DropdownMenuRoot", DropdownMenuRootBase);
