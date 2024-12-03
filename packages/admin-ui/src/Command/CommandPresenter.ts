import { makeAutoObservable } from "mobx";
import { CommandOption as CommandOptionParams } from "./Command";
import { CommandOption } from "./CommandOption";
import { CommandOptionFormatter } from "./CommandOptionFormatter";

interface CommandPresenterParams {
    options?: CommandOptionParams[];
    value?: string;
    placeholder?: string;
    onValueChange: (value: string) => void;
    onValueReset?: () => void;
}

class CommandPresenter {
    private params?: CommandPresenterParams = undefined;
    private options: CommandOption[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    init(params: CommandPresenterParams) {
        this.params = params;
        this.options = this.transformOptions(params.options);
    }

    get vm() {
        return {
            placeholder: this.params?.placeholder || "Start typing or select",
            hasValue: !!this.params?.value,
            options: this.options?.map(option => CommandOptionFormatter.format(option)) ?? []
        };
    }

    public changeValue = (value: string): void => {
        this.params?.onValueChange(value);
    };

    public resetValue = () => {
        this.params?.onValueChange?.("");
        this.params?.onValueReset?.();
    };

    private transformOptions(options: CommandPresenterParams["options"]): CommandOption[] {
        if (!options) {
            return [];
        }

        return options.map(option => {
            if (typeof option === "string") {
                return CommandOption.createFromString(option);
            }
            return CommandOption.create(option);
        });
    }
}

export { CommandPresenter, type CommandPresenterParams };
