import { makeAutoObservable } from "mobx";
import { CommandOption } from "~/Command/CommandOption";
import { CommandOptionDto } from "~/Command/CommandOptionDto";
import { CommandOptionTransformer } from "~/Command/CommandOptionTransformer";
import { IAutoCompleteInputPresenter } from "./AutoCompleteInputPresenter";

export type Option = CommandOptionDto | string;

interface AutoCompletePresenterParams {
    options?: Option[];
    value?: string;
    inputValue?: string;
    placeholder?: string;
    emptyMessage?: string;
    isLoading?: boolean;
    onValueChange: (value: string) => void;
    onValueReset?: () => void;
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
        console.log("AutoCompletePresenter initialize", params);
        this.params = params;
        this.options = this.mapOptions(params.options, params.value);

        const selected = this.getSelectedOption();

        this.inputPresenter.init({
            value: selected ? CommandOptionTransformer.toFormatted(selected).label : ""
        });
    }

    get vm() {
        const { emptyMessage = "No results.", isLoading = false } = this.params || {};

        return {
            inputVm: this.inputPresenter.vm,
            listVm: {
                options: this.options.map(CommandOptionTransformer.toFormatted),
                emptyMessage,
                isOpen: this.isListOpen,
                isEmpty: this.options.length === 0,
                isLoading
            }
        };
    }

    public toggleListOpenState = (open: boolean) => {
        this.isListOpen = open;
    };

    public setSelectedOption = (value?: string) => {
        this.updateSelectedOption(value);
        if (value) {
            this.params?.onValueChange?.(value);
        }
    };

    public setInputValue = (value: string) => {
        this.inputPresenter.setValue(value);
    };

    public resetValue = () => {
        this.updateSelectedOption("");
        this.inputPresenter.setValue("");
        this.params?.onValueChange?.("");
        this.params?.onValueReset?.();
    };

    private updateSelectedOption(value?: string) {
        const selectedIndex = this.options.findIndex(option => option.value === value);

        if (selectedIndex > -1) {
            const selectedOption = this.options[selectedIndex];
            selectedOption.selected = true;

            console.log("Selected option", selectedOption);

            this.options = [
                ...this.options.slice(0, selectedIndex),
                selectedOption,
                ...this.options.slice(selectedIndex + 1)
            ];

            this.inputPresenter.setValue(selectedOption.label);
        } else {
            this.inputPresenter.setValue(value);
        }
    }

    private getSelectedOption() {
        return this.options.find(option => option.selected);
    }

    private mapOptions(options: Option[] = [], value?: string): CommandOption[] {
        return options.map(option => {
            const commandOption =
                typeof option === "string"
                    ? CommandOption.createFromString(option)
                    : CommandOption.create(option);

            commandOption.selected = value === commandOption.value;
            return commandOption;
        });
    }
}

export { AutoCompletePresenter, type AutoCompletePresenterParams };
