import {
    ApiEndpoint,
    CmsDynamicZoneTemplate,
    CmsFieldTypePlugins,
    CmsModel,
    CmsModelDynamicZoneField,
    CmsModelField,
    CmsModelFieldToGraphQLCreateResolver,
    CmsModelFieldToGraphQLPlugin
} from "~/types";
import { createTypeName } from "~/utils/createTypeName";
import { createTypeFromFields } from "~/utils/createTypeFromFields";
import { createGraphQLInputField } from "../helpers";
import { GraphQLFieldResolver } from "@webiny/handler-graphql/types";
import { GenericRecord } from "@webiny/api/types";

const createUnionTypeName = (model: CmsModel, field: CmsModelField) => {
    return `${model.singularApiName}_${createTypeName(field.fieldId)}`;
};

const getFieldTemplates = (field: CmsModelDynamicZoneField): CmsDynamicZoneTemplate[] => {
    if (!Array.isArray(field.settings?.templates)) {
        return [];
    }
    return field.settings.templates;
};

interface CreateTypeDefsForTemplatesParams {
    models: CmsModel[];
    model: CmsModel;
    field: CmsModelField;
    type: ApiEndpoint;
    typeOfType: "type" | "input";
    templates: CmsDynamicZoneTemplate[];
    fieldTypePlugins: CmsFieldTypePlugins;
}

const createTypeDefsForTemplates = ({
    models,
    model,
    field,
    type,
    templates,
    typeOfType,
    fieldTypePlugins
}: CreateTypeDefsForTemplatesParams) => {
    const typeDefs: string[] = [];
    const templateTypes: string[] = [];

    templates.forEach(template => {
        const typeName = [
            model.singularApiName,
            createTypeName(field.fieldId),
            template.gqlTypeName
        ].join("_");

        const result = createTypeFromFields({
            models,
            typeOfType,
            model,
            type,
            typeNamePrefix: typeName,
            fields: template.fields,
            fieldTypePlugins
        });

        if (!result) {
            return;
        }

        typeDefs.push(result.typeDefs);
        templateTypes.push(result.fieldType);
    });

    return { typeDefs, templateTypes };
};

const remapTemplateValue = (value: any, typeName: string) => {
    return { ...value, __typename: typeName };
};

const createResolver = (
    endpointType: ApiEndpoint
): CmsModelFieldToGraphQLCreateResolver<CmsModelDynamicZoneField> => {
    return ({ model, models, field, fieldTypePlugins, createFieldResolvers, graphQLType }) => {
        const templates = getFieldTemplates(field);

        if (!templates.length) {
            return false;
        }

        const resolver = (parent: any) => {
            const value = parent[field.fieldId];
            if (!value) {
                return value;
            }

            const typeName = `${graphQLType}_${createTypeName(field.fieldId)}`;

            if (field.multipleValues && Array.isArray(value)) {
                const remappedValues = value.map(v => {
                    const template = templates.find(tpl => tpl.id === v._templateId);
                    if (!template) {
                        return undefined;
                    }
                    return remapTemplateValue(v, `${typeName}_${template.gqlTypeName}`);
                });

                return remappedValues;
            }

            const template = templates.find(tpl => tpl.id === value._templateId);
            if (!template) {
                return undefined;
            }
            return remapTemplateValue(value, `${typeName}_${template.gqlTypeName}`);
        };

        const { templateTypes } = createTypeDefsForTemplates({
            models,
            field,
            type: endpointType,
            typeOfType: "type",
            model,
            fieldTypePlugins,
            templates
        });

        const replace = new RegExp(`${model.singularApiName}_`, "g");

        const typeResolvers = templateTypes
            .map(templateType => {
                return templateType.replace(replace, `${graphQLType}_`);
            })
            .reduce<Record<string, Record<string, GraphQLFieldResolver>>>(
                (typeResolvers, templateType, index) => {
                    return {
                        ...typeResolvers,
                        ...createFieldResolvers({
                            graphQLType: templateType,
                            fields: field.settings.templates[index].fields
                        })
                    };
                },
                {}
            );

        return {
            resolver,
            typeResolvers
        };
    };
};

export const createDynamicZoneField =
    (): CmsModelFieldToGraphQLPlugin<CmsModelDynamicZoneField> => {
        return {
            name: "cms-model-field-to-graphql-dynamic-zone",
            type: "cms-model-field-to-graphql",
            fieldType: "dynamicZone",
            isSortable: false,
            isSearchable: false,
            validateChildFields: params => {
                const { validate, originalField, field } = params;

                const getOriginalTemplateFields = (templateId: string) => {
                    if (!originalField?.settings?.templates) {
                        return [];
                    }
                    const template = originalField.settings.templates.find(
                        t => t.id === templateId
                    );
                    return template?.fields || [];
                };

                for (const template of field.settings.templates) {
                    validate({
                        fields: template.fields,
                        originalFields: getOriginalTemplateFields(template.id)
                    });
                }
            },
            getFieldAst: (field, converter) => {
                const { templates = [] } = field.settings;

                return {
                    type: "field",
                    field,
                    children: templates.map(({ fields, ...template }) => {
                        return {
                            type: "collection",
                            collection: {
                                ...template,
                                discriminator: "_templateId"
                            },
                            children: fields.map(field => converter.toAst(field))
                        };
                    })
                };
            },
            read: {
                createTypeField({ models, model, field, fieldTypePlugins }) {
                    const templates = getFieldTemplates(field);
                    if (!templates.length) {
                        return null;
                    }

                    const unionTypeName = createUnionTypeName(model, field);

                    const { typeDefs, templateTypes } = createTypeDefsForTemplates({
                        models,
                        field,
                        type: "read",
                        typeOfType: "type",
                        model,
                        fieldTypePlugins,
                        templates
                    });

                    typeDefs.unshift(`union ${unionTypeName} = ${templateTypes.join(" | ")}`);

                    return {
                        fields: `${field.fieldId}: ${
                            field.multipleValues ? `[${unionTypeName}!]` : unionTypeName
                        }`,
                        typeDefs: typeDefs.join("\n")
                    };
                },
                createResolver: createResolver("read")
            },
            manage: {
                createTypeField({ models, model, field, fieldTypePlugins }) {
                    const templates = getFieldTemplates(field);

                    if (!templates.length) {
                        return null;
                    }

                    const unionTypeName = createUnionTypeName(model, field);

                    const { typeDefs, templateTypes } = createTypeDefsForTemplates({
                        models,
                        field,
                        type: "manage",
                        typeOfType: "type",
                        model,
                        fieldTypePlugins,
                        templates
                    });

                    // Add _templateId
                    const templateIds = templateTypes.map(type => {
                        return `extend type ${type} {
                            _templateId: ID!
                        }
                        `;
                    });

                    typeDefs.unshift(`union ${unionTypeName} = ${templateTypes.join(" | ")}`);

                    return {
                        fields: `${field.fieldId}: ${
                            field.multipleValues ? `[${unionTypeName}!]` : unionTypeName
                        }`,
                        typeDefs: typeDefs.concat(templateIds).join("\n")
                    };
                },
                createInputField({ models, model, field, fieldTypePlugins }) {
                    const templates = getFieldTemplates(field);

                    if (!templates.length) {
                        return null;
                    }

                    const { typeDefs, templateTypes } = createTypeDefsForTemplates({
                        models,
                        field,
                        type: "manage",
                        typeOfType: "input",
                        model,
                        fieldTypePlugins,
                        templates
                    });

                    const typeName = `${model.singularApiName}_${createTypeName(field.fieldId)}`;

                    const inputProperties = templateTypes.map(inputTypeName => {
                        const key = inputTypeName.replace(`${typeName}_`, "").replace("Input", "");
                        return [key, inputTypeName];
                    });

                    /**
                     * Generate a field input type, similar to this example:
                     *
                     * input Article_ContentInput {
                     *     Hero: Article_Content_HeroInput
                     *     SimpleText: Article_Content_SimpleTextInput
                     * }
                     */
                    typeDefs.push(`input ${typeName}Input {
                        ${inputProperties.map(
                            ([key, value]) => `
                            ${key}: ${value}
                        `
                        )}
                    }`);

                    return {
                        fields: createGraphQLInputField(field, `${typeName}Input`),
                        typeDefs: typeDefs.join("\n")
                    };
                },
                createResolver: createResolver("manage"),
                /**
                 * In `createInputField`, we generate an input type supported by GraphQL, to work around the
                 * limitation of not being able to have a union input type. That shape of data is only needed for GraphQL,
                 * so before passing that to our domain logic, we need to normalize it.
                 */
                normalizeInput: ({ field, input }) => {
                    const templates = field.settings?.templates || [];

                    if (Array.isArray(input) && field.multipleValues) {
                        return input
                            .map(value => normalizeDynamicZoneInput(value, templates))
                            .filter(Boolean);
                    }

                    return normalizeDynamicZoneInput(input, templates);
                }
            }
        };
    };

const normalizeDynamicZoneInput = (
    value: GenericRecord<string>,
    templates: CmsDynamicZoneTemplate[]
) => {
    // Only one key is allowed in the input object.
    const inputType = Object.keys(value)[0];
    const template = templates.find(tpl => tpl.gqlTypeName === inputType);

    if (template) {
        return { ...value[inputType], _templateId: template.id };
    }

    return undefined;
};
