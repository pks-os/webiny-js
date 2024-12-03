import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn, makeDecoratable } from "~/utils";
import { Label } from "~/Label";

/**
 * RadioItem
 */
interface RadioProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
    label: string | React.ReactNode;
    id: string;
}

const DecoratableRadio = React.forwardRef<
    React.ElementRef<typeof RadioGroupPrimitive.Item>,
    RadioProps
>(({ className, label, id, ...props }, ref) => {
    return (
        <div className="flex items-start space-x-sm-extra">
            <RadioGroupPrimitive.Item
                ref={ref}
                id={id}
                className={cn(
                    [
                        "group peer aspect-square h-md w-md rounded-xl mt-xxs",
                        "bg-neutral-base border-sm border-neutral-muted ring-offset-background",
                        "focus:outline-none  focus-visible:border-accent-default focus-visible:ring-lg focus-visible:ring-primary-dimmed focus-visible:ring-offset-0",
                        "disabled:cursor-not-allowed disabled:border-neutral-muted disabled:bg-neutral-disabled"
                    ],
                    className
                )}
                {...props}
            >
                <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                    <span
                        className={cn([
                            "h-sm w-sm rounded-xl",
                            "bg-primary-default",
                            "group-disabled:bg-neutral-strong"
                        ])}
                    />
                </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>
            <Label id={id} text={label} weight={"light"} className={"text-md"} />
        </div>
    );
});
DecoratableRadio.displayName = RadioGroupPrimitive.Item.displayName;
const Radio = makeDecoratable("Radio", DecoratableRadio);

export { Radio, type RadioProps };
