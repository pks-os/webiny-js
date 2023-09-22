import React from "react";
import { Form, FormOnSubmit, FormProps, GenericFormData } from "@webiny/form";

import { CellInner, FilterContainer, FiltersContainer, FormContainer } from "./Filters.styles";
import { Cell } from "@webiny/ui/Grid";

type Filter = {
    name: string;
    element: React.ReactElement;
};

export type GenericFiltersData = GenericFormData;

export type FiltersOnSubmit<T extends GenericFiltersData = GenericFiltersData> = FormOnSubmit<T>;

export interface FiltersProps<T> extends Pick<FormProps<T>, "data" | "onChange"> {
    filters: Filter[];
    show: boolean;
    children?: React.ReactNode;
    ["data-testid"]?: string;
}

export const Filters = <T extends GenericFiltersData = GenericFiltersData>(
    props: FiltersProps<T>
) => {
    if (!props.show || !props.filters.length) {
        return null;
    }

    return (
        <FiltersContainer data-testid={props["data-testid"] || "filters-container"}>
            <Cell span={2}>
                <Form data={props.data} onChange={props.onChange}>
                    {() => (
                        <FormContainer>
                            {props.filters.map(filter => (
                                <FilterContainer key={filter.name}>
                                    {filter.element}
                                </FilterContainer>
                            ))}
                        </FormContainer>
                    )}
                </Form>
            </Cell>
            <Cell span={10} align={"middle"}>
                <CellInner align={"right"}>{props.children}</CellInner>
            </Cell>
        </FiltersContainer>
    );
};
