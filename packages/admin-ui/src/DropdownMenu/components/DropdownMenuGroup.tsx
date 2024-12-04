import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { makeDecoratable } from "~/utils";

const DropdownMenuGroupBase = DropdownMenuPrimitive.Group;
export const DropdownMenuGroup = makeDecoratable("DropdownMenuGroup", DropdownMenuGroupBase);
