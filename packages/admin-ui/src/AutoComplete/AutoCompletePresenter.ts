import { makeAutoObservable } from "mobx";
import { CommandOption, CommandOptionFormatter } from "~/Command";
import { AutoCompleteOption } from "./AutoCompletePrimitive";
import { IAutoCompleteInputPresenter } from "./AutoCompleteInputPresenter";

interface AutoCompletePresenterParams {
    emptyMessage?: string;
    isLoading?: boolean;
    onOpenChange?: (open: boolean) => void;
    onValueChange: (value: string) => void;
    onValueReset?: () => void;
    options?: AutoCompleteOption[];
    placeholder?: string;
    value?: string;
}

class AutoCompletePresenter {
    private inputPresenter: IAutoCompleteInputPresenter;
    private params?: AutoCompletePresenterParams = undefined;
    private options: CommandOption[] = [];
    private isListOpen = false;

    constructor(inputPresenter: IAutoCompleteInputPresenter) {
        this.inputPresenter = inputPresenter;
        makeAutoObservable(this);
    }

    init(params: AutoCompletePresenterParams) {
        this.params = params;
        this.options = this.mapOptions(params.options, params.value);

        const selected = this.getSelectedOption();

        this.inputPresenter.init({
            value: selected ? CommandOptionFormatter.format(selected).label : "",
            placeholder: params.placeholder
        });
    }

    get vm() {
        const { emptyMessage = "No results.", isLoading = false } = this.params || {};

        return {
            inputVm: this.inputPresenter.vm,
            listVm: {
                options: this.options.map(option => CommandOptionFormatter.format(option)),
                emptyMessage,
                isLoading,
                isOpen: this.isListOpen,
                isEmpty: this.options.length === 0
            }
        };
    }

    public setListOpenState = (open: boolean) => {
        this.isListOpen = open;
        this.params?.onOpenChange?.(open);
    };

    public setSelectedOption = (value: string) => {
        this.updateSelectedOption(value);
        this.params?.onValueChange?.(value);
    };

    public setInputValue = (value: string) => {
        this.inputPresenter.setValue(value);
    };

    public resetValue = () => {
        this.updateSelectedOption();
        this.inputPresenter.setValue("");
        this.params?.onValueChange?.("");
        this.params?.onValueReset?.();
    };

    private updateSelectedOption(value?: string) {
        const optionToSelect = this.options.find(option => option.value === value);
        this.options.forEach(option => (option.selected = false));

        if (optionToSelect) {
            optionToSelect.selected = true;
            this.inputPresenter.setValue(optionToSelect.label);
            return;
        } else {
            this.inputPresenter.setValue(value || "");
        }
    }

    private getSelectedOption() {
        return this.options.find(option => option.selected);
    }

    private mapOptions(options: AutoCompleteOption[] = [], value?: string): CommandOption[] {
        return options.map(option => {
            const commandOption =
                typeof option === "string"
                    ? CommandOption.createFromString(option)
                    : CommandOption.create(option);

            commandOption.selected = commandOption.value === value;
            return commandOption;
        });
    }
}

export { AutoCompletePresenter, type AutoCompletePresenterParams };
