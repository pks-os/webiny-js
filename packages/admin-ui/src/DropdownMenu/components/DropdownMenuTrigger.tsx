import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { makeDecoratable } from "~/utils";

const DropdownMenuTriggerBase = DropdownMenuPrimitive.Trigger;
export const DropdownMenuTrigger = makeDecoratable("DropdownMenuTrigger", DropdownMenuTriggerBase);
