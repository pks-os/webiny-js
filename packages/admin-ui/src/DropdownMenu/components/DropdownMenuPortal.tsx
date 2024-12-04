import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { makeDecoratable } from "~/utils";

const DropdownMenuPortalBase = DropdownMenuPrimitive.Portal;
export const DropdownMenuPortal = makeDecoratable("DropdownMenuPortal", DropdownMenuPortalBase);
