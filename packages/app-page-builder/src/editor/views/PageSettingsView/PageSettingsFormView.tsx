import { UIElement } from "@webiny/ui-composer/UIElement";
import { FormView } from "@webiny/app-admin/views/FormView";
import { PageSettingsView } from "../PageSettingsView";

export class PageSettingsFormView extends FormView {
    constructor(id) {
        super(id, { setupForm: false });

        this.getSubmitButtonElement().setLabel("Save Settings");
        this.applyPlugins(PageSettingsFormView);
    }

    /**
     * Add a field to form content.
     */
    addField<TElement extends UIElement = UIElement>(element: TElement): TElement {
        return this.getFormContentElement().addElement<TElement>(element);
    }

    getPageSettingsHook() {
        const parent = this.getParentOfType<PageSettingsView>(PageSettingsView);
        return parent.getPageSettingsHook();
    }
}
