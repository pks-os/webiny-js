import { CmsModelField } from "@webiny/app-headless-cms-common/types/model";

export type FieldRaw = Pick<
    CmsModelField,
    "id" | "type" | "label" | "multipleValues" | "predefinedValues" | "settings"
>;

export enum TypeDTO {
    TEXT = "text",
    NUMBER = "number",
    BOOLEAN = "boolean",
    DATE = "date",
    TIME = "time",
    DATETIME_WITH_TIMEZONE = "dateTimeWithTimezone",
    DATETIME_WITHOUT_TIMEZONE = "dateTimeWithOutTimezone",
    MULTIPLE_VALUES = "multipleValues"
}

export interface ConditionDTO {
    label: string;
    value: string;
}

export interface PredefinedDTO {
    label: string;
    value: string;
}

export interface FieldDTO {
    label: string;
    value: string;
    conditions: ConditionDTO[];
    type: TypeDTO;
    predefined: PredefinedDTO[];
}

export class Field {
    public readonly label: string;
    public readonly value: string;
    public readonly type: Type;
    public readonly conditions: Condition[];
    public readonly predefined: Predefined[];

    static createFromRaw(fieldRaw: FieldRaw) {
        const label = fieldRaw.label;
        const value = fieldRaw.id;
        const type = Type.createFromField(fieldRaw);
        const conditions = Condition.createFromField(fieldRaw);
        const predefined = Predefined.createFromField(fieldRaw);

        return new Field(label, value, type, conditions, predefined);
    }

    private constructor(
        label: string,
        value: string,
        type: Type,
        conditions: Condition[],
        predefined: Predefined[]
    ) {
        this.label = label;
        this.value = value;
        this.type = type;
        this.predefined = predefined;
        this.conditions = conditions;
    }
}

export class Condition {
    public readonly label: string;
    public readonly value: string;

    static createFrom(rawData: ConditionDTO) {
        return new Condition(rawData.label, rawData.value);
    }

    static createFromField(field: FieldRaw) {
        const createConditions = (conditions: { label: string; value: string }[]) => {
            return conditions.map(condition => this.createFrom(condition));
        };

        switch (field.type) {
            case "text":
                if (field.predefinedValues?.enabled) {
                    return createConditions([
                        { label: "contains", value: "_in" },
                        { label: "doesn't contain", value: "_not_in" }
                    ]);
                }

                return createConditions([
                    { label: "is equal to", value: " " },
                    { label: "contains", value: "_contains" },
                    { label: "starts with", value: "_startsWith" },
                    { label: "is not equal to", value: "_not" },
                    { label: "doesn't contain", value: "_not_contains" },
                    { label: "doesn't start with", value: "_not_startsWith" }
                ]);

            case "long-text":
                return createConditions([
                    { label: "contains", value: "_contains" },
                    { label: "doesn't contain", value: "_not_contains" }
                ]);

            case "boolean":
                return createConditions([
                    { label: "is", value: " " },
                    { label: "is not", value: "_not" }
                ]);

            case "number":
                return createConditions([
                    { label: "is equal to", value: " " },
                    { label: "is not equal to", value: "_not" },
                    { label: "is less than", value: "_lt" },
                    { label: "is less or equal to", value: "_lte" },
                    { label: "is greater than", value: "_gt" },
                    { label: "is greater or equal to", value: "_gte" }
                ]);

            case "datetime":
                return createConditions([
                    { label: "is equal to", value: " " },
                    { label: "is not equal to", value: "_not" },
                    { label: "is before", value: "_lt" },
                    { label: "is before or equal to", value: "_lte" },
                    { label: "is after", value: "_gt" },
                    { label: "is after or equal to", value: "_gte" }
                ]);

            default:
                return [];
        }
    }

    private constructor(label: string, value: string) {
        this.label = label;
        this.value = value;
    }
}

export class Predefined {
    public readonly label: string;
    public readonly value: string;

    static createFrom(rawData: PredefinedDTO) {
        return new Predefined(rawData.label, rawData.value);
    }

    static createFromField(field: FieldRaw) {
        const rawPredefined = field.predefinedValues?.values || [];
        return rawPredefined.map(predefined => this.createFrom(predefined));
    }

    private constructor(label: string, value: string) {
        this.label = label;
        this.value = value;
    }
}

export class Type {
    public readonly value: TypeDTO;

    static createFromField(rawData: FieldRaw) {
        if (rawData.settings?.type === TypeDTO.DATETIME_WITH_TIMEZONE) {
            return new Type(TypeDTO.DATETIME_WITH_TIMEZONE);
        }

        if (rawData.settings?.type === TypeDTO.DATETIME_WITHOUT_TIMEZONE) {
            return new Type(TypeDTO.DATETIME_WITHOUT_TIMEZONE);
        }

        if (rawData?.multipleValues && rawData.predefinedValues?.enabled) {
            return new Type(TypeDTO.MULTIPLE_VALUES);
        }

        if (rawData.type === "datetime") {
            const value = rawData.settings?.type === TypeDTO.TIME ? TypeDTO.TIME : TypeDTO.DATE;
            return new Type(value);
        }

        if (rawData.type === TypeDTO.BOOLEAN) {
            return new Type(TypeDTO.BOOLEAN);
        }

        if (rawData.type === TypeDTO.NUMBER) {
            return new Type(TypeDTO.NUMBER);
        }

        return new Type(TypeDTO.TEXT);
    }

    private constructor(value: TypeDTO) {
        this.value = value;
    }
}
