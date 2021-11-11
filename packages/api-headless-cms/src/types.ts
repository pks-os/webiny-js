import { Plugin } from "@webiny/plugins/types";
import { I18NContext, I18NLocale } from "@webiny/api-i18n/types";
import { ContextInterface } from "@webiny/handler/types";
import { TenancyContext } from "@webiny/api-tenancy/types";
import {
    GraphQLFieldResolver,
    GraphQLSchemaDefinition,
    Resolvers
} from "@webiny/handler-graphql/types";
import { BaseI18NContentContext } from "@webiny/api-i18n-content/types";
import { SecurityPermission } from "@webiny/api-security/types";
import { HttpContext } from "@webiny/handler-http/types";
import { DbContext } from "@webiny/handler-db/types";
import { FileManagerContext } from "@webiny/api-file-manager/types";
import { UpgradePlugin } from "@webiny/api-upgrade/types";
import { Topic } from "@webiny/pubsub/types";

interface BaseCmsValuesObject {
    /**
     * API type
     */
    type: "manage" | "preview" | "read" | string;
    /**
     * Requested locale
     */
    locale: string;
    /**
     * returns an instance of current locale
     */
    getLocale: () => I18NLocale;
    /**
     * Means this request is a READ API
     */
    READ: boolean;
    /**
     * Means this request is a MANAGE API
     */
    MANAGE: boolean;
    /**
     * Means this request is a PREVIEW API
     */
    PREVIEW: boolean;
}

export interface HeadlessCms extends BaseCmsValuesObject, CmsCrudContextObject {
    storageOperations: HeadlessCmsStorageOperations;
}
/**
 * @description This combines all contexts used in the CMS into a single one.
 *
 * @category Context
 */
export interface CmsContext
    extends ContextInterface,
        DbContext,
        HttpContext,
        I18NContext,
        FileManagerContext,
        BaseI18NContentContext,
        TenancyContext {
    cms: HeadlessCms;
}

interface CmsContentModelFieldPredefinedValuesValue {
    value: string;
    label: string;
}

/**
 * Object containing content model field predefined options and values.
 *
 * @category ContentModelField
 */
export interface CmsContentModelFieldPredefinedValues {
    /**
     * Are predefined field values enabled?
     */
    enabled: boolean;
    /**
     * Predefined values array.
     */
    values: CmsContentModelFieldPredefinedValuesValue[];
}

/**
 * Object containing content model field renderer options.
 *
 * @category ContentModelField
 */
interface CmsContentModelFieldRenderer {
    /**
     * Name of the field renderer. Must have one in field renderer plugins.
     * Can be blank to let automatically determine the renderer.
     */
    name: string;
}

/**
 * A definition for content model field. This type exists on the app side as well.
 *
 * @category ContentModelField
 * @category Database model
 */
export interface CmsContentModelField {
    /**
     * A generated ID for the model field
     */
    id: string;
    /**
     * A type of the field
     */
    type: string;
    /**
     * A unique field ID for mapping values
     */
    fieldId: string;
    /**
     * A label for the field
     */
    label: string;
    /**
     * Text below the field to clarify what is it meant to be in the field value
     */
    helpText?: string;
    /**
     * Text to be displayed in the field
     */
    placeholderText?: string;
    /**
     * Are predefined values enabled? And list of them
     */
    predefinedValues?: CmsContentModelFieldPredefinedValues;
    /**
     * Field renderer. Blank if determined automatically.
     */
    renderer?: CmsContentModelFieldRenderer;
    /**
     * List of validations for the field
     *
     * @default []
     */
    validation?: CmsContentModelFieldValidation[];
    /**
     * List of validations for the list of values, when a field is set to accept a list of values.
     * These validations will be applied to the entire list, and `validation` (see above) will be applied
     * to each individual value in the list.
     *
     * @default []
     */
    listValidation?: CmsContentModelFieldValidation[];
    /**
     * Is this a multiple values field?
     *
     */
    multipleValues?: boolean;
    /**
     * Any user defined settings.
     *
     * @default {}
     */
    settings?: { [key: string]: any };
}

/**
 * A definition for dateTime field to show possible type of the field in settings.
 */
export interface CmsContentModelDateTimeField extends CmsContentModelField {
    /**
     * Settings object for the field. Contains type property.
     */
    settings: {
        type: "time" | "date" | "dateTimeWithoutTimezone" | "dateTimeWithTimezone";
    };
}

/**
 * Arguments for the field validator validate method.
 *
 * @category ContentModelField
 * @category FieldValidation
 */
export interface CmsModelFieldValidatorValidateParams {
    /**
     * A value to be validated.
     */
    value: any;
    /**
     * Options from the CmsContentModelField validations.
     *
     * @see CmsContentModelField.validation
     * @see CmsContentModelField.listValidation
     */
    validator: CmsContentModelFieldValidation;
    /**
     * An instance of the current context.
     */
    context: CmsContext;
    /**
     * Field being validated.
     */
    field: CmsContentModelField;
    /**
     * An instance of the content model being validated.
     */
    contentModel: CmsContentModel;
}

/**
 * Definition for the field validator.
 *
 * @category Plugin
 * @category ContentModelField
 * @category FieldValidation
 */
export interface CmsModelFieldValidatorPlugin extends Plugin {
    /**
     * A plugin type.
     */
    type: "cms-model-field-validator";
    /**
     * Actual validator definition.
     */
    validator: {
        /**
         * Name of the validator.
         */
        name: string;
        /**
         * Validation method.
         */
        validate(params: CmsModelFieldValidatorValidateParams): Promise<boolean>;
    };
}

/**
 * A pattern validator for the content entry field value.
 *
 * @category Plugin
 * @category ContentModelField
 * @category FieldValidation
 */
export interface CmsModelFieldPatternValidatorPlugin extends Plugin {
    /**
     * A plugin type
     */
    type: "cms-model-field-validator-pattern";
    /**
     * A pattern object for the validator.
     */
    pattern: {
        /**
         * name of the pattern.
         */
        name: string;
        /**
         * RegExp of the validator.
         */
        regex: string;
        /**
         * RegExp flags
         */
        flags: string;
    };
}

/**
 * Locked field in the content model
 *
 * @see CmsContentModel.lockedFields
 *
 * @category ContentModelField
 */
export interface LockedField {
    /**
     * Locked field ID - one used for mapping values.
     */
    fieldId: string;
    /**
     * Is the field multiple values field?
     */
    multipleValues: boolean;
    /**
     * Field type.
     */
    type: string;
    [key: string]: any;
}

/**
 * Content model defining an entry.
 *
 * @category Database model
 * @category ContentModel
 */
export interface CmsContentModel {
    /**
     * Name of the content model.
     */
    name: string;
    /**
     * Unique ID for the content model. Created from name if not defined by user.
     */
    modelId: string;
    /**
     * Locale this model belongs to.
     */
    locale: string;
    /**
     * Content model group reference object.
     */
    group: {
        /**
         * Generated ID of the group
         */
        id: string;
        /**
         * Name of the group
         */
        name: string;
    };
    /**
     * Description for the content model.
     */
    description?: string;
    /**
     * Date created
     */
    createdOn?: Date;
    /**
     * Date saved. Changes on both save and create.
     */
    savedOn?: Date;
    /**
     * CreatedBy object wrapper. Contains id, name and type of the user.
     */
    createdBy?: CreatedBy;
    /**
     * List of fields defining entry values.
     */
    fields: CmsContentModelField[];
    /**
     * Admin UI field layout
     *
     * ```ts
     * layout: [
     *      [field1id, field2id],
     *      [field3id]
     * ]
     * ```
     */
    layout: string[][];
    /**
     * List of locked fields. Updated when entry is saved and a field has been used.
     */
    lockedFields?: LockedField[];
    /**
     * The field that is being displayed as entry title.
     * It is picked as first available text field. Or user can select own field.
     */
    titleFieldId: string;
    /**
     * The version of Webiny which this record was stored with.
     */
    webinyVersion: string;
    /**
     * TODO migration
     */
    tenant: string;
}

/**
 * @category ContentModelField
 */
export interface CmsModelFieldDefinition {
    fields: string;
    typeDefs?: string;
}

export interface CmsModelFieldToGraphQLCreateResolver {
    (params: {
        models: CmsContentModel[];
        model: CmsContentModel;
        graphQLType: string;
        field: CmsContentModelField;
        createFieldResolvers: any;
    }):
        | GraphQLFieldResolver
        | { resolver: GraphQLFieldResolver; typeResolvers: Resolvers<CmsContext> };
}

/**
 * @category Plugin
 * @category ContentModelField
 * @category GraphQL
 */
export interface CmsModelFieldToGraphQLPlugin extends Plugin {
    /**
     * A plugin type
     */
    type: "cms-model-field-to-graphql";
    /**
     * Field type name which must be exact as the one in `CmsEditorFieldTypePlugin` plugin.
     *
     * ```ts
     * fieldType: "myField"
     * ```
     */
    fieldType: string;
    /**
     * Is the field searchable via the GraphQL?
     *
     * ```ts
     * isSearchable: false
     * ```
     */
    isSearchable: boolean;
    /**
     * Is the field sortable via the GraphQL?
     *
     * ```ts
     * isSortable: true
     * ```
     */
    isSortable: boolean;
    read: {
        /**
         * Definition for get filtering for GraphQL.
         *
         * ```ts
         * read: {
         *     createGetFilters({ field }) {
         *         return `${field.fieldId}: MyField`;
         *     }
         * }
         * ```
         */
        createGetFilters?(params: { model: CmsContentModel; field: CmsContentModelField }): string;
        /**
         * Definition for list filtering for GraphQL.
         *
         * ```ts
         * read: {
         *     createListFilters({ field }) {
         *         return `
         *             ${field.fieldId}: MyType
         *             ${field.fieldId}_not: MyType
         *             ${field.fieldId}_in: [MyType]
         *             ${field.fieldId}_not_in: [MyType]
         *         `;
         *     }
         * }
         * ```
         */
        createListFilters?(params: { model: CmsContentModel; field: CmsContentModelField }): string;
        /**
         * Definition of the field type for GraphQL - be aware if multiple values is selected.
         *
         * ```ts
         * read: {
         *     createTypeField({ field }) {
         *         if (field.multipleValues) {
         *             return `${field.fieldId}: [MyFieldType]`;
         *         }
         *
         *         return `${field.fieldId}: MyField`;
         *     }
         * }
         * ```
         */
        createTypeField(params: {
            model: CmsContentModel;
            field: CmsContentModelField;
            fieldTypePlugins: CmsFieldTypePlugins;
        }): CmsModelFieldDefinition | string;
        /**
         * Definition for field resolver.
         * By default it is simple return of the `instance.values[fieldId]` but if required, users can define their own.
         *
         * ```ts
         * read: {
         *     createResolver({ field }) {
         *         return instance => {
         *             return instance.values[field.fieldId];
         *         };
         *     }
         * }
         * ```
         */
        createResolver?: CmsModelFieldToGraphQLCreateResolver;
        /**
         * Read API schema definitions for the field and resolvers for them.
         *
         * ```ts
         * read: {
         *     createSchema() {
         *         return {
         *             typeDefs: `
         *                 myField {
         *                     id
         *                     date
         *                 }
         *             `,
         *             resolvers: {}
         *         }
         *     }
         * }
         * ```
         */
        createSchema?: (params: {
            models: CmsContentModel[];
            model: CmsContentModel;
        }) => GraphQLSchemaDefinition<CmsContext>;
    };
    manage: {
        /**
         * Definition for list filtering for GraphQL.
         *
         * ```ts
         * manage: {
         *     createListFilters({ field }) {
         *         return `
         *             ${field.fieldId}: MyType
         *             ${field.fieldId}_not: MyType
         *             ${field.fieldId}_in: [MyType]
         *             ${field.fieldId}_not_in: [MyType]
         *         `;
         *     }
         * }
         * ```
         */
        createListFilters?: (params: {
            model: CmsContentModel;
            field: CmsContentModelField;
        }) => string;
        /**
         * Manage API schema definitions for the field and resolvers for them. Probably similar to `read.createSchema`.
         *
         * ```ts
         *     createSchema() {
         *         return {
         *             typeDefs: `
         *                 myField {
         *                     id
         *                     date
         *                 }
         *             `,
         *             resolvers: {}
         *         }
         *     }
         * ```
         */
        createSchema?: (params: {
            models: CmsContentModel[];
            model: CmsContentModel;
        }) => GraphQLSchemaDefinition<CmsContext>;
        /**
         * Definition of the field type for GraphQL - be aware if multiple values is selected. Probably same as `read.createTypeField`.
         *
         * ```ts
         * manage: {
         *     createTypeField({ field }) {
         *         if (field.multipleValues) {
         *             return field.fieldId + ": [MyType]";
         *         }
         *
         *         return field.fieldId + ": MyType";
         *     }
         * }
         * ```
         */
        createTypeField: (params: {
            model: CmsContentModel;
            field: CmsContentModelField;
            fieldTypePlugins: CmsFieldTypePlugins;
        }) => CmsModelFieldDefinition | string;
        /**
         * Definition for input GraphQL field type.
         *
         * ```ts
         * manage: {
         *     createInputField({ field }) {
         *         if (field.multipleValues) {
         *             return field.fieldId + ": [MyField]";
         *         }
         *
         *         return field.fieldId + ": MyField";
         *     }
         * }
         * ```
         */
        createInputField: (params: {
            model: CmsContentModel;
            field: CmsContentModelField;
            fieldTypePlugins: CmsFieldTypePlugins;
        }) => CmsModelFieldDefinition | string;
        /**
         * Definition for field resolver.
         * By default it is simple return of the `instance.values[fieldId]` but if required, users can define their own.
         *
         * ```ts
         * manage: {
         *     createResolver({ field }) {
         *         return instance => {
         *             return instance.values[field.fieldId];
         *         };
         *     }
         * }
         * ```
         */
        createResolver?: CmsModelFieldToGraphQLCreateResolver;
    };
}

/**
 * Check for content model locked field.
 * A custom plugin definable by the user.
 *
 * @category ContentModel
 * @category Plugin
 */
export interface CmsModelLockedFieldPlugin extends Plugin {
    /**
     * A plugin type
     */
    type: "cms-model-locked-field";
    /**
     * A unique identifier of the field type (text, number, json, myField, ...).
     */
    fieldType: string;
    /**
     * A method to check if field really is locked.
     */
    checkLockedField?: (params: { lockedField: LockedField; field: CmsContentModelField }) => void;
    /**
     * A method to get the locked field data.
     */
    getLockedFieldData?: (params: { field: CmsContentModelField }) => Record<string, any>;
}

/**
 * @category ContentModelField
 */
export interface CmsFieldTypePlugins {
    [key: string]: CmsModelFieldToGraphQLPlugin;
}

/**
 * A interface describing the reference to a user that created some data in the database.
 *
 * @category General
 */
export interface CreatedBy {
    /**
     * ID if the user.
     */
    id: string;
    /**
     * Full name of the user.
     */
    displayName: string;
    /**
     * Type of the user (admin, user)
     */
    type: string;
}

/**
 * Representation of settings database model.
 *
 * @category Database model
 */
export interface CmsSettings {
    /**
     * Last content model change. Used to cache GraphQL schema.
     */
    contentModelLastChange: Date;
    /**
     * TODO migration
     */
    tenant: string;
    locale: string;
}

/**
 * Settings CRUD in context.
 *
 * @category Context
 */
export interface CmsSettingsContext {
    /**
     * A function defining usage of a method without authenticating the user.
     */
    noAuthSettings: () => {
        /**
         * Gets settings model from the database.
         */
        get: () => Promise<CmsSettings | null>;
    };
    /**
     * Gets settings model from the database.
     */
    getSettings: () => Promise<CmsSettings | null>;
    /**
     * Updates settings model with a new date.
     */
    updateContentModelLastChange: () => Promise<void>;
    /**
     * Get the datetime when content model last changed.
     */
    getContentModelLastChange: () => Promise<Date>;
}

export interface BeforeInstallTopicParams {
    tenant: string;
}

export interface AfterInstallTopicParams {
    tenant: string;
}

export type CmsSystemContext = {
    getSystemVersion: () => Promise<string>;
    setSystemVersion: (version: string) => Promise<void>;
    getReadAPIKey(): Promise<string>;
    installSystem: () => Promise<void>;
    upgradeSystem: (version: string) => Promise<boolean>;
    /**
     * Events
     */
    onBeforeSystemInstall: Topic<BeforeInstallTopicParams>;
    onAfterSystemInstall: Topic<AfterInstallTopicParams>;
};

/**
 * A GraphQL params.data parameter received when creating content model group.
 *
 * @category ContentModelGroup
 * @category GraphQL params
 */
export interface CmsContentModelGroupCreateInput {
    name: string;
    slug?: string;
    description?: string;
    icon: string;
}

/**
 * A GraphQL params.data parameter received when updating content model group.
 *
 * @category ContentModelGroup
 * @category GraphQL params
 */
export interface CmsContentModelGroupUpdateInput {
    name?: string;
    slug?: string;
    description?: string;
    icon?: string;
}

/**
 * A representation of content model group in the database.
 *
 * @category ContentModelGroup
 * @category Database model
 */
export interface CmsContentModelGroup {
    /**
     * Generated ID.
     */
    id: string;
    /**
     * Name of the group.
     */
    name: string;
    /**
     * Slug for the group. Must be unique.
     */
    slug: string;
    /**
     * Locale this group belongs to.
     */
    locale: string;
    /**
     * Description for the group.
     */
    description?: string;
    /**
     * Icon for the group. In a form of "ico/ico".
     */
    icon?: string;
    /**
     * CreatedBy reference object.
     */
    createdBy?: CreatedBy;
    /**
     * Date group was created on.
     */
    createdOn?: string;
    /**
     * Date group was created or changed on.
     */
    savedOn?: string;
    /**
     * Which Webiny version was this record stored with.
     */
    webinyVersion: string;
    /**
     * TODO migration
     */
    tenant: string;
}

/**
 * A data.where parameter received when listing content model groups.
 *
 * @category ContentModelGroup
 * @category GraphQL params
 */
export interface CmsContentModelGroupListParams {
    where: {
        tenant: string;
        locale: string;
        [key: string]: any;
    };
}

/**
 * @category ContentModelGroup
 * @category Topic
 */
export interface BeforeGroupCreateTopicParams {
    group: CmsContentModelGroup;
}

/**
 * @category ContentModelGroup
 * @category Topic
 */
export interface AfterGroupCreateTopicParams {
    group: CmsContentModelGroup;
}

/**
 * @category ContentModelGroup
 * @category Topic
 */
export interface BeforeGroupUpdateTopicParams {
    original: CmsContentModelGroup;
    group: CmsContentModelGroup;
}

/**
 * @category ContentModelGroup
 * @category Topic
 */
export interface AfterGroupUpdateTopicParams {
    original: CmsContentModelGroup;
    group: CmsContentModelGroup;
}

/**
 * @category ContentModelGroup
 * @category Topic
 */
export interface BeforeGroupDeleteTopicParams {
    group: CmsContentModelGroup;
}

/**
 * @category ContentModelGroup
 * @category Topic
 */
export interface AfterGroupDeleteTopicParams {
    group: CmsContentModelGroup;
}

/**
 * Content model group in context.
 *
 * @category Context
 * @category ContentModelGroup
 */
export interface CmsContentModelGroupContext {
    /**
     * Plain operations on the storage level.
     */
    operations: CmsContentModelGroupStorageOperations;
    /**
     * A function defining usage of a method without authenticating the user.
     */
    noAuthGroup: () => {
        /**
         * Gets content model group by given id.
         */
        get: (id: string) => Promise<CmsContentModelGroup | null>;
        /**
         * List all content model groups. Filterable via params.
         */
        list: (params?: CmsContentModelGroupListParams) => Promise<CmsContentModelGroup[]>;
    };
    /**
     * Gets content model group by given id.
     */
    getGroup: (id: string) => Promise<CmsContentModelGroup | null>;
    /**
     * List all content model groups. Filterable via params.
     */
    listGroups: (params?: CmsContentModelGroupListParams) => Promise<CmsContentModelGroup[]>;
    /**
     * Create a new content model group.
     */
    createGroup: (data: CmsContentModelGroupCreateInput) => Promise<CmsContentModelGroup>;
    /**
     * Update existing content model group.
     */
    updateGroup: (
        id: string,
        data: CmsContentModelGroupUpdateInput
    ) => Promise<CmsContentModelGroup>;
    /**
     * Delete content model group by given id.
     */
    deleteGroup: (id: string) => Promise<boolean>;
    /**
     * Events.
     */
    onBeforeGroupCreate: Topic<BeforeGroupCreateTopicParams>;
    onAfterGroupCreate: Topic<AfterGroupCreateTopicParams>;
    onBeforeGroupUpdate: Topic<BeforeGroupUpdateTopicParams>;
    onAfterGroupUpdate: Topic<AfterGroupUpdateTopicParams>;
    onBeforeGroupDelete: Topic<BeforeGroupDeleteTopicParams>;
    onAfterGroupDelete: Topic<AfterGroupDeleteTopicParams>;
}

/**
 * Definition for content model field validator.
 *
 * @category ContentModelField
 * @category FieldValidation
 */
export interface CmsContentModelFieldValidation {
    name: string;
    message: string;
    settings?: Record<string, any>;
}

/**
 * A GraphQL params.data parameter received when creating content model.
 *
 * @category GraphQL params
 * @category ContentModel
 */
export interface CmsContentModelCreateInput {
    /**
     * Name of the content model.
     */
    name: string;
    /**
     * Unique ID of the content model. Created from name if not sent by the user. Cannot be changed.
     */
    modelId?: string;
    /**
     * Description of the content model.
     */
    description?: string;
}

/**
 * A definition for content model field received from the user.
 *
 * Input type for `CmsContentModelField`.
 * @see CmsContentModelField
 *
 * @category GraphQL params
 * @category ContentModelField
 */
export interface CmsContentModelFieldInput {
    /**
     * Generated ID.
     */
    id: string;
    /**
     * Type of the field. A plugin for the field must be defined.
     * @see CmsModelFieldToGraphQLPlugin
     */
    type: string;
    /**
     * A unique ID for the field. Values will be mapped via this value.
     */
    fieldId: string;
    /**
     * Label for the field.
     */
    label: string;
    /**
     * Text to display below the field to help user what to write in the field.
     */
    helpText?: string;
    /**
     * Text to display in the field.
     */
    placeholderText?: string;
    /**
     * Are multiple values allowed?
     */
    multipleValues?: boolean;
    /**
     * Predefined values options for the field. Check the reference for more information.
     */
    predefinedValues?: CmsContentModelFieldPredefinedValues;
    /**
     * Renderer options for the field. Check the reference for more information.
     */
    renderer?: CmsContentModelFieldRenderer;
    /**
     * List of validations for the field.
     */
    validation?: CmsContentModelFieldValidation[];
    /**
     * @see CmsContentModelField.listValidation
     */
    listValidation: CmsContentModelFieldValidation[];
    /**
     * User defined settings.
     */
    settings?: Record<string, any>;
}

/**
 * A GraphQL params.data parameter received when updating content model.
 *
 * @category GraphQL params
 * @category ContentModel
 */
export interface CmsContentModelUpdateInput {
    /**
     * A new content model name.
     */
    name?: string;
    /**
     * A new description of the content model.
     */
    description?: string;
    /**
     * A list of content model fields to define the entry values.
     */
    fields: CmsContentModelFieldInput[];
    /**
     * Admin UI field layout
     *
     * ```ts
     * layout: [
     *      [field1id, field2id],
     *      [field3id]
     * ]
     * ```
     */
    layout: string[][];
    /**
     * The field that is being displayed as entry title.
     * It is picked as first available text field. Or user can select own field.
     */
    titleFieldId?: string;
}

/**
 * A plugin to load a CmsContentModelManager.
 *
 * @see CmsContentModelManager
 *
 * @category Plugin
 * @category ContentModel
 * @category ContentEntry
 */
export interface ContentModelManagerPlugin extends Plugin {
    /**
     * A plugin type.
     */
    type: "cms-content-model-manager";
    /**
     * Specific model CmsContentModelManager loader. Can target exact modelId(s).
     * Be aware that if you define multiple plugins without `modelId`, last one will run.
     */
    modelId?: string[] | string;
    /**
     * Create a CmsContentModelManager for specific type - or new default one.
     * For reference in how is this plugin run check [contentModelManagerFactory](https://github.com/webiny/webiny-js/blob/f15676/packages/api-headless-cms/src/content/plugins/CRUD/contentModel/contentModelManagerFactory.ts)
     */
    create: (context: CmsContext, model: CmsContentModel) => Promise<CmsContentModelManager>;
}

/**
 * A content entry definition for and from the database.
 *
 * @category Database model
 * @category ContentEntry
 */
export interface CmsContentEntry {
    /**
     * A version of the webiny this entry was created with.
     * This can be used when upgrading the system so we know which entries to update.
     */
    webinyVersion: string;
    /**
     * Tenant id which is this entry for. Can be used in case of shared storage.
     */
    tenant: string;
    /**
     * Generated ID of the entry. It is shared across all the records in the database that represent a single entry.
     * So version 1, 2, ..., 2371 will have the same value in this field to link them together.
     */
    entryId: string;
    /**
     * Generated ID + version of the entry.
     */
    id: string;
    /**
     * CreatedBy object reference.
     */
    createdBy: CreatedBy;
    /**
     * OwnedBy object reference. Can be different from CreatedBy.
     */
    ownedBy: CreatedBy;
    /**
     * A string of Date.toISOString() type.
     * Populated on creation.
     */
    createdOn: string;
    /**
     * A string of Date.toISOString() type.
     * Populated every time entry is saved.
     */
    savedOn: string;
    /**
     * Model ID of the definition for the entry.
     * @see CmsContentModel
     */
    modelId: string;
    /**
     * A locale of the entry.
     * @see I18NLocale.code
     */
    locale: string;
    /**
     * A string of Date.toISOString() type - if published.
     * Populated when entry is published.
     */
    publishedOn?: string;
    /**
     * A revision version of the entry.
     */
    version: number;
    /**
     * Is the entry locked?
     */
    locked: boolean;
    /**
     * Status type of the entry.
     */
    status: CmsContentEntryStatus;
    /**
     * A mapped fieldId -> value object.
     *
     * @see CmsContentModelField
     */
    values: Record<string, any>;
}

export interface CmsStorageContentEntry extends CmsContentEntry {
    [key: string]: any;
}

/**
 * A definition for content model manager to be used in the code.
 * The default one uses `CmsContentEntryContext` methods internally, but devs can change to what every they want.
 *
 * @see CmsContentEntryContext
 *
 * @category Context
 * @category ContentEntry
 * @category ContentModel
 */
export interface CmsContentModelManager {
    /**
     * List entries in this content model.
     */
    list: (params?: CmsContentEntryListParams) => Promise<[CmsContentEntry[], CmsContentEntryMeta]>;
    /**
     * List only published entries in the content model.
     */
    listPublished: (
        params?: CmsContentEntryListParams
    ) => Promise<[CmsContentEntry[], CmsContentEntryMeta]>;
    /**
     * List latest entries in the content model. Used for administration.
     */
    listLatest: (
        params?: CmsContentEntryListParams
    ) => Promise<[CmsContentEntry[], CmsContentEntryMeta]>;
    /**
     * Get a list of published entries by the ID list.
     */
    getPublishedByIds: (ids: string[]) => Promise<CmsContentEntry[]>;
    /**
     * Get a list of latest entries by the ID list.
     */
    getLatestByIds: (ids: string[]) => Promise<CmsContentEntry[]>;
    /**
     * Get an entry filtered by given params. Will always get one.
     */
    get: (params?: CmsContentEntryGetParams) => Promise<CmsContentEntry>;
    /**
     * Create a entry.
     */
    create: (data: Record<string, any>) => Promise<CmsContentEntry>;
    /**
     * Update a entry.
     */
    update: (id: string, data: Record<string, any>) => Promise<CmsContentEntry>;
    /**
     * Delete a entry.
     */
    delete: (id: string) => Promise<void>;
}

export interface BeforeModelCreateTopicParams {
    input: Partial<CmsContentModel>;
    model: CmsContentModel;
}
export interface AfterModelCreateTopicParams {
    input: Partial<CmsContentModel>;
    model: CmsContentModel;
}
export interface BeforeModelUpdateTopicParams {
    input: Partial<CmsContentModel>;
    original: CmsContentModel;
    model: CmsContentModel;
}
export interface AfterModelUpdateTopicParams {
    input: Partial<CmsContentModel>;
    original: CmsContentModel;
    model: CmsContentModel;
}
export interface BeforeModelDeleteTopicParams {
    model: CmsContentModel;
}
export interface AfterModelDeleteTopicParams {
    model: CmsContentModel;
}

export interface CmsContentModelUpdateInternalParams {
    model: CmsContentModel;
    original: CmsContentModel;
}

/**
 * Content model in the context.
 *
 * @category Context
 * @category ContentModel
 */
export interface CmsContentModelContext {
    /**
     * Plain operations on the storage level.
     */
    operations: CmsContentModelStorageOperations;
    /**
     * A function defining usage of a method without authenticating the user.
     */
    noAuthModel: () => {
        /**
         * Get a single content model.
         */
        get: (modelId: string) => Promise<CmsContentModel | null>;
        /**
         * Get all content models.
         */
        list: () => Promise<CmsContentModel[]>;
    };
    /**
     * A function defining usage of a method with authenticating the user but not throwing an error.
     */
    silentAuthModel: () => {
        /**
         * Get all content models.
         */
        list: () => Promise<CmsContentModel[]>;
    };
    /**
     * Get a single content model.
     */
    getModel: (modelId: string) => Promise<CmsContentModel | null>;
    /**
     * Get all content models.
     */
    listModels: () => Promise<CmsContentModel[]>;
    /**
     * Create a content model.
     */
    createModel: (data: CmsContentModelCreateInput) => Promise<CmsContentModel>;
    /**
     * Update content model without data validation. Used internally.
     *
     * @param model - existing content model
     * @param data - data to be updated
     *
     * @hidden
     */
    updateModelDirect: (params: CmsContentModelUpdateInternalParams) => Promise<CmsContentModel>;
    /**
     * Update content model.
     */
    updateModel: (modelId: string, data: CmsContentModelUpdateInput) => Promise<CmsContentModel>;
    /**
     * Delete content model. Should not allow deletion if there are entries connected to it.
     */
    deleteModel: (modelId: string) => Promise<void>;
    /**
     * Get a instance of CmsContentModelManager for given content modelId.
     *
     * @see CmsContentModelManager
     */
    getManager: (modelId: string) => Promise<CmsContentModelManager>;
    /**
     * Get all content model managers mapped by modelId.
     * @see CmsContentModelManager
     */
    getManagers: () => Map<string, CmsContentModelManager>;
    /**
     * Events.
     */
    onBeforeModelCreate: Topic<BeforeModelCreateTopicParams>;
    onAfterModelCreate: Topic<AfterModelCreateTopicParams>;
    onBeforeModelUpdate: Topic<BeforeModelUpdateTopicParams>;
    onAfterModelUpdate: Topic<AfterModelUpdateTopicParams>;
    onBeforeModelDelete: Topic<BeforeModelDeleteTopicParams>;
    onAfterModelDelete: Topic<AfterModelDeleteTopicParams>;
}

/**
 * Available statuses for content entry.
 *
 * @category ContentEntry
 */
type CmsContentEntryStatus =
    | "published"
    | "unpublished"
    | "reviewRequested"
    | "changesRequested"
    | "draft";

/**
 * Entry listing where params.
 *
 * @category ContentEntry
 * @category GraphQL params
 */
export interface CmsContentEntryListWhere {
    /**
     * Fields.
     */
    id?: string;
    id_in?: string[];
    id_not?: string;
    id_not_in?: string[];
    /**
     * Generated ID without the version.
     */
    entryId?: string;
    entryId_not?: string;
    entryId_in?: string[];
    entryId_not_in?: string[];
    /**
     * Entry is owned by whom?
     *
     * Can be sent via the API or set internal if user can see only their own entries.
     */
    ownedBy?: string;
    ownedBy_not?: string;
    ownedBy_in?: string[];
    ownedBy_not_in?: string[];
    /**
     * Who created the entry?
     */
    createdBy?: string;
    createdBy_not?: string;
    createdBy_in?: string[];
    createdBy_not_in?: string[];
    /**
     * Version of the entry.
     *
     * It is not meant to be used via the API.
     * @internal
     */
    version?: number;
    version_lt?: number;
    version_gt?: number;
    /**
     * Each operations implementation MUST determine how to use this field.
     * In SQL it can be published field and in DynamoDB can be a secondary key.
     *
     * It is not meant to be used via the API.
     * @internal
     */
    published?: boolean;
    /**
     * Each operations implementation MUST determine how to use this field.
     * In SQL it can be published field and in DynamoDB can be a secondary key.
     *
     * It is not meant to be used via the API.
     * @internal
     */
    latest?: boolean;
    [key: string]: any;
}

/**
 * Entry listing sort.
 *
 * @category ContentEntry
 * @category GraphQL params
 */
export type CmsContentEntryListSort = string[];

/**
 * Get entry GraphQL resolver params.
 *
 * @category ContentEntry
 * @category GraphQL params
 */
export interface CmsContentEntryGetParams {
    where: CmsContentEntryListWhere;
    sort?: CmsContentEntryListSort;
}

/**
 * List entries GraphQL resolver params.
 *
 * @category ContentEntry
 * @category GraphQL params
 */
export interface CmsContentEntryListParams {
    where: CmsContentEntryListWhere;
    sort?: CmsContentEntryListSort;
    limit?: number;
    after?: string;
}

/**
 * Meta information for GraphQL output.
 *
 * @category ContentEntry
 * @category GraphQL output
 */
export interface CmsContentEntryMeta {
    /**
     * A cursor for pagination.
     */
    cursor: string;
    /**
     * Is there more items to load?
     */
    hasMoreItems: boolean;
    /**
     * Total count of the items in the storage.
     */
    totalCount: number;
}

export interface BeforeEntryCreateTopicParams {
    input: Partial<CmsContentEntry>;
    entry: CmsContentEntry;
    model: CmsContentModel;
}
export interface AfterEntryCreateTopicParams {
    input: Partial<CmsContentEntry>;
    entry: CmsContentEntry;
    model: CmsContentModel;
    storageEntry: CmsContentEntry;
}

export interface BeforeEntryRevisionCreateTopicParams {
    entry: CmsContentEntry;
    model: CmsContentModel;
}

export interface AfterEntryRevisionCreateTopicParams {
    entry: CmsContentEntry;
    model: CmsContentModel;
    storageEntry: CmsContentEntry;
}

export interface BeforeEntryUpdateTopicParams {
    input: Partial<CmsContentEntry>;
    original: CmsContentEntry;
    entry: CmsContentEntry;
    model: CmsContentModel;
}
export interface AfterEntryUpdateTopicParams {
    input: Partial<CmsContentEntry>;
    original: CmsContentEntry;
    entry: CmsContentEntry;
    model: CmsContentModel;
    storageEntry: CmsContentEntry;
}

export interface BeforeEntryPublishTopicParams {
    entry: CmsContentEntry;
    model: CmsContentModel;
}

export interface AfterEntryPublishTopicParams {
    entry: CmsContentEntry;
    model: CmsContentModel;
    storageEntry: CmsContentEntry;
}

export interface BeforeEntryUnpublishTopicParams {
    entry: CmsContentEntry;
    model: CmsContentModel;
}

export interface AfterEntryUnpublishTopicParams {
    entry: CmsContentEntry;
    model: CmsContentModel;
    storageEntry: CmsContentEntry;
}

export interface BeforeEntryRequestChangesTopicParams {
    entry: CmsContentEntry;
    model: CmsContentModel;
}

export interface AfterEntryRequestChangesTopicParams {
    entry: CmsContentEntry;
    model: CmsContentModel;
    storageEntry: CmsContentEntry;
}

export interface BeforeEntryRequestReviewTopicParams {
    entry: CmsContentEntry;
    model: CmsContentModel;
}

export interface AfterEntryRequestReviewTopicParams {
    entry: CmsContentEntry;
    model: CmsContentModel;
    storageEntry: CmsContentEntry;
}

export interface BeforeEntryDeleteTopicParams {
    entry: CmsContentEntry;
    model: CmsContentModel;
}
export interface AfterEntryDeleteTopicParams {
    entry: CmsContentEntry;
    model: CmsContentModel;
}

export interface BeforeEntryRevisionDeleteTopicParams {
    entry: CmsContentEntry;
    model: CmsContentModel;
}
export interface AfterEntryRevisionDeleteTopicParams {
    entry: CmsContentEntry;
    model: CmsContentModel;
}

/**
 * Content entry CRUD methods in the context.
 *
 * @category Context
 * @category ContentEntry
 */
export interface CmsContentEntryContext {
    /**
     * Plain operations on the storage level.
     */
    operations: CmsContentEntryStorageOperations;
    /**
     * Get a single content entry for a model.
     */
    getEntry: (
        model: CmsContentModel,
        params: CmsContentEntryGetParams
    ) => Promise<CmsContentEntry | null>;
    /**
     * Get a list of entries for a model by a given ID (revision).
     */
    getEntriesByIds: (
        model: CmsContentModel,
        revisions: string[]
    ) => Promise<CmsContentEntry[] | null>;
    /**
     * Get the entry for a model by a given ID.
     */
    getEntryById: (model: CmsContentModel, revision: string) => Promise<CmsContentEntry>;
    /**
     * List entries for a model. Internal method used by get, listLatest and listPublished.
     */
    listEntries: (
        model: CmsContentModel,
        params?: CmsContentEntryListParams
    ) => Promise<[CmsContentEntry[], CmsContentEntryMeta]>;
    /**
     * Lists latest entries. Used for manage API.
     */
    listLatestEntries: (
        model: CmsContentModel,
        params?: CmsContentEntryListParams
    ) => Promise<[CmsContentEntry[], CmsContentEntryMeta]>;
    /**
     * List published entries. Used for read API.
     */
    listPublishedEntries: (
        model: CmsContentModel,
        params?: CmsContentEntryListParams
    ) => Promise<[CmsContentEntry[], CmsContentEntryMeta]>;
    /**
     * List published entries by IDs.
     */
    getPublishedEntriesByIds: (model: CmsContentModel, ids: string[]) => Promise<CmsContentEntry[]>;
    /**
     * List latest entries by IDs.
     */
    getLatestEntriesByIds: (model: CmsContentModel, ids: string[]) => Promise<CmsContentEntry[]>;
    /**
     * Create a new content entry.
     */
    createEntry: (model: CmsContentModel, data: Record<string, any>) => Promise<CmsContentEntry>;
    /**
     * Create a new entry from already existing entry.
     */
    createEntryRevisionFrom: (
        model: CmsContentModel,
        id: string,
        data: Record<string, any>
    ) => Promise<CmsContentEntry>;
    /**
     * Update existing entry.
     */
    updateEntry: (
        model: CmsContentModel,
        id: string,
        data?: Record<string, any>
    ) => Promise<CmsContentEntry>;
    /**
     * Delete only a certain revision of the entry.
     */
    deleteEntryRevision: (model: CmsContentModel, id: string) => Promise<void>;
    /**
     * Delete entry with all its revisions.
     */
    deleteEntry: (model: CmsContentModel, id: string) => Promise<void>;
    /**
     * Publish entry.
     */
    publishEntry: (model: CmsContentModel, id: string) => Promise<CmsContentEntry>;
    /**
     * Unpublish entry.
     */
    unpublishEntry: (model: CmsContentModel, id: string) => Promise<CmsContentEntry>;
    /**
     * Request a review for the entry.
     */
    requestEntryReview: (model: CmsContentModel, id: string) => Promise<CmsContentEntry>;
    /**
     * Request changes for the entry.
     */
    requestEntryChanges: (model: CmsContentModel, id: string) => Promise<CmsContentEntry>;
    /**
     * Get all entry revisions.
     */
    getEntryRevisions: (model: CmsContentModel, id: string) => Promise<CmsContentEntry[]>;
    /**
     * Events.
     */
    onBeforeEntryCreate: Topic<BeforeEntryCreateTopicParams>;
    onAfterEntryCreate: Topic<AfterEntryCreateTopicParams>;
    onBeforeEntryRevisionCreate: Topic<BeforeEntryRevisionCreateTopicParams>;
    onAfterEntryRevisionCreate: Topic<AfterEntryRevisionCreateTopicParams>;
    onBeforeEntryUpdate: Topic<BeforeEntryUpdateTopicParams>;
    onAfterEntryUpdate: Topic<AfterEntryUpdateTopicParams>;
    onBeforeEntryDelete: Topic<BeforeEntryDeleteTopicParams>;
    onAfterEntryDelete: Topic<AfterEntryDeleteTopicParams>;
    onBeforeEntryRevisionDelete: Topic<BeforeEntryRevisionDeleteTopicParams>;
    onAfterEntryRevisionDelete: Topic<AfterEntryRevisionDeleteTopicParams>;
    onBeforeEntryPublish: Topic<BeforeEntryPublishTopicParams>;
    onAfterEntryPublish: Topic<AfterEntryPublishTopicParams>;
    onBeforeEntryUnpublish: Topic<BeforeEntryUnpublishTopicParams>;
    onAfterEntryUnpublish: Topic<AfterEntryUnpublishTopicParams>;
    onBeforeEntryRequestChanges: Topic<BeforeEntryRequestChangesTopicParams>;
    onAfterEntryRequestChanges: Topic<AfterEntryRequestChangesTopicParams>;
    onBeforeEntryRequestReview: Topic<BeforeEntryRequestReviewTopicParams>;
    onAfterEntryRequestReview: Topic<AfterEntryRequestReviewTopicParams>;
}

/**
 * A cms part of the context that has all the CRUD operations.
 *
 * @category Context
 */
interface CmsCrudContextObject {
    /**
     * Settings CRUD methods.
     */
    settings: CmsSettingsContext;
    /**
     * Content model group CRUD methods.
     */
    groups: CmsContentModelGroupContext;
    /**
     * Content model CRUD methods.
     */
    models: CmsContentModelContext;
    /**
     * Fetch the content entry manager. It calls content entry methods internally, with given model as the target.
     */
    getModelManager: (modelId: string) => Promise<CmsContentModelManager>;
    /**
     * Content entry CRUD methods.
     */
    entries: CmsContentEntryContext;
    /**
     * System CRUD methods
     */
    system: CmsSystemContext;
}

/**
 * Parameters for ContentEntryResolverFactory.
 *
 * @category GraphQL resolver
 * @category ContentEntry
 */
interface CmsContentEntryResolverFactoryParams {
    model: CmsContentModel;
}

/**
 * A type for ContentEntryResolvers. Used when creating get, list, update, publish, ...etc.
 *
 * @category GraphQL resolver
 * @category ContentEntry
 */
export type CmsContentEntryResolverFactory<TSource = any, TArgs = any, TContext = CmsContext> = {
    (params: CmsContentEntryResolverFactoryParams): GraphQLFieldResolver<TSource, TArgs, TContext>;
};

/**
 * Settings security permission.
 *
 * @category SecurityPermission
 */
export interface CmsSettingsPermission extends SecurityPermission {} // eslint-disable-line
/**
 * A security permission for content model.
 *
 * @category SecurityPermission
 * @category ContentModel
 */
export interface CmsContentModelPermission extends SecurityPermission {
    own: boolean;
    rwd: string;
    /**
     * A object representing `key: model.modelId` values where key is locale code.
     */
    models?: {
        [key: string]: string[];
    };
    /**
     * A object representing `key: group.id` values where key is locale code.
     */
    groups?: {
        [key: string]: string[];
    };
}

/**
 * The security permission for content model groups.
 *
 * @category SecurityPermission
 * @category ContentModelGroup
 */
export interface CmsContentModelGroupPermission extends SecurityPermission {
    own: boolean;
    rwd: string;
    /**
     * A object representing `key: group.id` values where key is locale code.
     */
    groups?: {
        [key: string]: string[];
    };
}

/**
 * The security permission for content entry.
 *
 * @category SecurityPermission
 * @category ContentEntry
 */
export interface CmsContentEntryPermission extends SecurityPermission {
    own: boolean;
    rwd: string;
    pw: string;
    /**
     * A object representing `key: model.modelId` values where key is locale code.
     */
    models?: {
        [key: string]: string[];
    };
    /**
     * A object representing `key: group.id` values where key is locale code.
     */
    groups?: {
        [key: string]: string[];
    };
}

/**
 * A argument definition for CmsModelFieldToStoragePlugin.toStorage
 *
 * @see CmsModelFieldToStoragePlugin.toStorage
 *
 * @category Plugin
 * @category ContentModelField
 * @category Storage
 */
export interface CmsModelFieldToStoragePluginToStorageParams<T> {
    model: CmsContentModel;
    field: CmsContentModelField;
    value: T;
    getStoragePlugin(fieldType: string): CmsModelFieldToStoragePlugin<T>;
    context: CmsContext;
}

/**
 * A argument definition for CmsModelFieldToStoragePlugin.fromStorage
 *
 * @see CmsModelFieldToStoragePlugin.fromStorage
 *
 * @category Plugin
 * @category ContentModelField
 * @category Storage
 */
export interface CmsModelFieldToStoragePluginFromStorageParams<T> {
    model: CmsContentModel;
    field: CmsContentModelField;
    value: T;
    getStoragePlugin(fieldType: string): CmsModelFieldToStoragePlugin<T>;
    context: CmsContext;
}

/**
 * A plugin defining transformation of field value to and from storage.
 *
 * @category Plugin
 * @category ContentModelField
 * @category ContentEntry
 * @category Storage
 */
export interface CmsModelFieldToStoragePlugin<
    Original = Record<string, any>,
    Converted = Record<string, any>
> extends Plugin {
    /**
     * A plugin type
     */
    type: "cms-model-field-to-storage";
    /**
     * A unique identifier of the field type (text, number, json, myField, ...).
     *
     * ```ts
     * fieldType: "myField"
     * ```
     */
    fieldType: string;
    /**
     * A function that is ran when storing the data. You can do what ever transformations you need on input value and return a new value that is stored into the database.
     *
     * ```ts
     * toStorage({ value }) {
     *      return gzip(value);
     * }
     * ```
     */
    toStorage: (
        params: CmsModelFieldToStoragePluginToStorageParams<Original>
    ) => Promise<Converted>;
    /**
     * A function that is ran when retrieving the data from the database. You either revert the action you did in the `toStorage` or handle it via some other way available to you.
     *
     * ```ts
     * fromStorage({ value }) {
     *      return ungzip(value);
     * }
     * ```
     */
    fromStorage: (
        params: CmsModelFieldToStoragePluginFromStorageParams<Converted>
    ) => Promise<Original>;
}

export interface CmsContentModelGroupStorageOperationsGetParams {
    id: string;
    tenant: string;
    locale: string;
}

export interface CmsContentModelGroupStorageOperationsListWhereParams {
    tenant: string;
    locale: string;
    [key: string]: any;
}
export interface CmsContentModelGroupStorageOperationsListParams {
    where: CmsContentModelGroupStorageOperationsListWhereParams;
    sort?: string[];
}

export interface CmsContentModelGroupStorageOperationsBeforeCreateParams {
    input: CmsContentModelGroupCreateInput;
    group: CmsContentModelGroup;
}

export interface CmsContentModelGroupStorageOperationsCreateParams {
    input: CmsContentModelGroupCreateInput;
    group: CmsContentModelGroup;
}

export interface CmsContentModelGroupStorageOperationsAfterCreateParams {
    input: CmsContentModelGroupCreateInput;
    group: CmsContentModelGroup;
}

export interface CmsContentModelGroupStorageOperationsBeforeUpdateParams {
    original: CmsContentModelGroup;
    group: CmsContentModelGroup;
    input: CmsContentModelGroupUpdateInput;
}

export interface CmsContentModelGroupStorageOperationsUpdateParams {
    original: CmsContentModelGroup;
    group: CmsContentModelGroup;
    input: CmsContentModelGroupUpdateInput;
}

export interface CmsContentModelGroupStorageOperationsAfterUpdateParams {
    original: CmsContentModelGroup;
    group: CmsContentModelGroup;
    input: CmsContentModelGroupUpdateInput;
}

export interface CmsContentModelGroupStorageOperationsBeforeDeleteParams {
    group: CmsContentModelGroup;
}

export interface CmsContentModelGroupStorageOperationsDeleteParams {
    group: CmsContentModelGroup;
}

export interface CmsContentModelGroupStorageOperationsAfterDeleteParams {
    group: CmsContentModelGroup;
}

/**
 * Description of the ContentModelGroup CRUD operations.
 * If user wants to add another database to the application, this is how it is done.
 * This is just plain read, update, write, delete and list - no authentication or permission checks.
 */
export interface CmsContentModelGroupStorageOperations {
    /**
     * Gets content model group by given id.
     */
    get: (
        params: CmsContentModelGroupStorageOperationsGetParams
    ) => Promise<CmsContentModelGroup | null>;
    /**
     * List all content model groups. Filterable via params.
     */
    list: (
        params: CmsContentModelGroupStorageOperationsListParams
    ) => Promise<CmsContentModelGroup[]>;
    /**
     * Create a new content model group.
     */
    create: (
        params: CmsContentModelGroupStorageOperationsCreateParams
    ) => Promise<CmsContentModelGroup>;
    /**
     * Update existing content model group.
     */
    update: (
        params: CmsContentModelGroupStorageOperationsUpdateParams
    ) => Promise<CmsContentModelGroup>;
    /**
     * Delete the content model group.
     */
    delete: (
        params: CmsContentModelGroupStorageOperationsDeleteParams
    ) => Promise<CmsContentModelGroup>;
}

export interface CmsContentModelStorageOperationsGetParams {
    tenant: string;
    locale: string;
    modelId: string;
}

export interface CmsContentModelStorageOperationsListWhereParams {
    tenant: string;
    locale: string;
    [key: string]: string;
}

export interface CmsContentModelStorageOperationsListParams {
    where: CmsContentModelStorageOperationsListWhereParams;
}

export interface CmsContentModelStorageOperationsBeforeCreateParams {
    input: CmsContentModelCreateInput;
    data: CmsContentModel;
}

export interface CmsContentModelStorageOperationsCreateParams {
    input: CmsContentModelCreateInput;
    model: CmsContentModel;
}

export interface CmsContentModelStorageOperationsAfterCreateParams {
    input: CmsContentModelCreateInput;
    model: CmsContentModel;
}

export interface CmsContentModelStorageOperationsBeforeUpdateParams {
    original: CmsContentModel;
    model: CmsContentModel;
    input: CmsContentModelUpdateInput;
}

export interface CmsContentModelStorageOperationsUpdateParams {
    original: CmsContentModel;
    model: CmsContentModel;
    input: CmsContentModelUpdateInput;
}

export interface CmsContentModelStorageOperationsAfterUpdateParams {
    original: CmsContentModel;
    model: CmsContentModel;
    input: CmsContentModelUpdateInput;
}

export interface CmsContentModelStorageOperationsBeforeDeleteParams {
    model: CmsContentModel;
}

export interface CmsContentModelStorageOperationsDeleteParams {
    model: CmsContentModel;
}

export interface CmsContentModelStorageOperationsAfterDeleteParams {
    model: CmsContentModel;
}

/**
 * Description of the ContentModel storage operations.
 * If user wants to add another database to the application, this is how it is done.
 * This is just plain read, update, write, delete and list - no authentication or permission checks.
 */
export interface CmsContentModelStorageOperations {
    /**
     * Gets content model by given id.
     */
    get: (params: CmsContentModelStorageOperationsGetParams) => Promise<CmsContentModel | null>;
    /**
     * List all content models. Filterable via params.
     */
    list: (params: CmsContentModelStorageOperationsListParams) => Promise<CmsContentModel[]>;
    /**
     * Create a new content model.
     */
    create: (params: CmsContentModelStorageOperationsCreateParams) => Promise<CmsContentModel>;
    /**
     * Update existing content model.
     */
    update: (params: CmsContentModelStorageOperationsUpdateParams) => Promise<CmsContentModel>;
    /**
     * Delete the content model.
     */
    delete: (params: CmsContentModelStorageOperationsDeleteParams) => Promise<CmsContentModel>;
}

export interface CmsContentEntryStorageOperationsGetParams {
    where: CmsContentEntryListWhere;
    sort?: CmsContentEntryListSort;
    limit?: number;
}

export interface CmsContentEntryStorageOperationsListParams {
    where: CmsContentEntryListWhere;
    sort?: CmsContentEntryListSort;
    limit?: number;
    after?: string;
}

export interface CmsContentEntryStorageOperationsCreateParams<
    T extends CmsStorageContentEntry = CmsStorageContentEntry
> {
    /**
     * Input received from the user.
     */
    input: Record<string, any>;
    /**
     * Real entry, with no transformations on it.
     */
    entry: CmsContentEntry;
    /**
     * Entry prepared for the storage.
     */
    storageEntry: T;
}

export interface CmsContentEntryStorageOperationsCreateRevisionFromParams<
    T extends CmsStorageContentEntry = CmsStorageContentEntry
> {
    /**
     * The entry we are creating new one from.
     */
    originalEntry: CmsContentEntry;
    /**
     * The entry we are creating new one from, directly from storage, with transformations on it.
     */
    originalStorageEntry: T;
    /**
     * Latest entry, used to calculate the new version.
     */
    latestEntry: CmsContentEntry;
    /**
     * Latest entry, used to calculate the new version, directly from storage, with transformations.
     */
    latestStorageEntry: T;
    /**
     * Real entry, with no transformations on it.
     */
    entry: CmsContentEntry;
    /**
     * Entry prepared for the storage.
     */
    storageEntry: T;
}

export interface CmsContentEntryStorageOperationsUpdateParams<
    T extends CmsStorageContentEntry = CmsStorageContentEntry
> {
    /**
     * Input received from the user.
     */
    input: Record<string, any>;
    /**
     * Used to compare IDs, versions and passed into storage operations to be used if required.
     */
    originalEntry: CmsContentEntry;
    /**
     * Directly from storage, with transformations on it.
     */
    originalStorageEntry: T;
    /**
     * Real entry, with no transformations on it.
     */
    entry: CmsContentEntry;
    /**
     * Entry prepared for the storage.
     */
    storageEntry: T;
}

export interface CmsContentEntryStorageOperationsDeleteRevisionParams<
    T extends CmsStorageContentEntry = CmsStorageContentEntry
> {
    /**
     * Entry that was deleted.
     */
    entryToDelete: CmsContentEntry;
    /**
     * Entry that was deleted, directly from storage, with transformations.
     */
    storageEntryToDelete: T;
    /**
     * Entry that was set as latest.
     */
    entryToSetAsLatest?: CmsContentEntry;
    /**
     * Entry that was set as latest, directly from storage, with transformations.
     */
    storageEntryToSetAsLatest?: T;
}

export interface CmsContentEntryStorageOperationsDeleteParams<
    T extends CmsStorageContentEntry = CmsStorageContentEntry
> {
    /**
     * Entry that is going to be deleted.
     */
    entry: CmsContentEntry;
    /**
     * Entry that is going to be deleted, directly from storage.
     */
    storageEntry: T;
}

export interface CmsContentEntryStorageOperationsPublishParams<
    T extends CmsStorageContentEntry = CmsStorageContentEntry
> {
    /**
     * The entry record before it was published.
     */
    originalEntry: CmsContentEntry;
    /**
     * Directly from storage, with transformations on it.
     */
    originalStorageEntry: T;
    /**
     * The modified entry that is going to be saved as published.
     * Entry is in its original form.
     */
    entry: CmsContentEntry;
    /**
     * The modified entry and prepared for the storage.
     */
    storageEntry: T;
}

export interface CmsContentEntryStorageOperationsUnpublishParams<
    T extends CmsStorageContentEntry = CmsStorageContentEntry
> {
    /**
     * The entry record before it was unpublished.
     */
    originalEntry: CmsContentEntry;
    /**
     * The entry record before it was unpublished, with transformations on it.
     */
    originalStorageEntry: T;
    /**
     * The modified entry that is going to be saved as unpublished.
     */
    entry: CmsContentEntry;
    /**
     * The modified entry that is going to be saved as unpublished, with transformations on it.
     */
    storageEntry: T;
}

export interface CmsContentEntryStorageOperationsRequestChangesParams<
    T extends CmsStorageContentEntry = CmsStorageContentEntry
> {
    /**
     * Entry data updated with the required properties.
     */
    entry: CmsContentEntry;
    /**
     * Entry that is prepared for the storageOperations, with the transformations.
     */
    storageEntry: T;
    /**
     * Original entry from the storage.
     */
    originalEntry: CmsContentEntry;
    /**
     * Original entry to be updated, directly from storage, with the transformations.
     */
    originalStorageEntry: T;
}

export interface CmsContentEntryStorageOperationsRequestReviewParams<
    T extends CmsStorageContentEntry = CmsStorageContentEntry
> {
    /**
     * Entry that is prepared for the storageOperations.
     */
    entry: CmsContentEntry;
    /**
     * Entry that is prepared for the storageOperations, with the transformations.
     */
    storageEntry: T;
    /**
     * Original entry from the storage.
     */
    originalEntry: CmsContentEntry;
    /**
     * Original entry to be updated, directly from storage, with the transformations.
     */
    originalStorageEntry: T;
}

export interface CmsContentEntryStorageOperationsGetAllRevisionsParams {
    ids: readonly string[];
    tenant: string;
    locale: string;
}

export interface CmsContentEntryStorageOperationsGetByIdsParams {
    ids: readonly string[];
    tenant: string;
    locale: string;
}

export interface CmsContentEntryStorageOperationsGetLatestByIdsParams {
    ids: readonly string[];
    tenant: string;
    locale: string;
}

export interface CmsContentEntryStorageOperationsGetPublishedByIdsParams {
    ids: readonly string[];
    tenant: string;
    locale: string;
}

export interface CmsContentEntryStorageOperationsGetRevisionsParams {
    id: string;
    tenant: string;
    locale: string;
}

export interface CmsContentEntryStorageOperationsGetRevisionParams {
    id: string;
    tenant: string;
    locale: string;
}

export interface CmsContentEntryStorageOperationsGetPublishedRevisionParams {
    id: string;
    tenant: string;
    locale: string;
}
export interface CmsContentEntryStorageOperationsGetLatestRevisionParams {
    id: string;
    tenant: string;
    locale: string;
}

export interface CmsContentEntryStorageOperationsGetPreviousRevisionParams {
    entryId: string;
    version: number;
    tenant: string;
    locale: string;
}

export interface CmsContentEntryStorageOperationsListResponse<
    T extends CmsStorageContentEntry = CmsStorageContentEntry
> {
    /**
     * Has more items to load with the current filtering?
     */
    hasMoreItems: boolean;
    /**
     * Items loaded with current filtering.
     */
    items: T[];
    /**
     * Pointer for where to start the new item set.
     */
    cursor: string | null;
    /**
     * Total amount of items with the current filter.
     */
    totalCount: number;
}

/**
 * Description of the ContentModel storage operations.
 * If user wants to add another database to the application, this is how it is done.
 * This is just plain read, update, write, delete and list - no authentication or permission checks.
 *
 *
 * @category StorageOperations
 * @category ContentEntry
 */
export interface CmsContentEntryStorageOperations<
    T extends CmsStorageContentEntry = CmsStorageContentEntry
> {
    /**
     * Get all the entries of the ids.
     */
    getByIds: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsGetByIdsParams
    ) => Promise<T[]>;
    /**
     * Get all the published entries of the ids.
     */
    getPublishedByIds: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsGetPublishedByIdsParams
    ) => Promise<T[]>;
    /**
     * Get all the latest entries of the ids.
     */
    getLatestByIds: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsGetLatestByIdsParams
    ) => Promise<T[]>;
    /**
     * Get all revisions of the given entry id.
     */
    getRevisions: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsGetRevisionsParams
    ) => Promise<T[]>;
    /**
     * Get all revisions of all of the given IDs.
     */
    getAllRevisionsByIds: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsGetAllRevisionsParams
    ) => Promise<T[]>;
    /**
     * Get the entry by the given revision id.
     */
    getRevisionById: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsGetRevisionParams
    ) => Promise<T | null>;
    /**
     * Get the published entry by given entryId.
     */
    getPublishedRevisionByEntryId: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsGetPublishedRevisionParams
    ) => Promise<T | null>;
    /**
     * Get the latest entry by given entryId.
     */
    getLatestRevisionByEntryId: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsGetLatestRevisionParams
    ) => Promise<T | null>;
    /**
     * Get the revision of the entry before given one.
     */
    getPreviousRevision: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsGetPreviousRevisionParams
    ) => Promise<T | null>;
    /**
     * Gets entry by given params.
     */
    get: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsGetParams
    ) => Promise<T | null>;
    /**
     * List all entries. Filterable via params.
     */
    list: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsListParams
    ) => Promise<CmsContentEntryStorageOperationsListResponse<T>>;
    /**
     * Create a new entry.
     */
    create: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsCreateParams<T>
    ) => Promise<T>;
    /**
     * Create a new entry from existing one.
     */
    createRevisionFrom: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsCreateRevisionFromParams<T>
    ) => Promise<T>;
    /**
     * Update existing entry.
     */
    update: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsUpdateParams<T>
    ) => Promise<T>;
    /**
     * Delete the entry revision.
     */
    deleteRevision: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsDeleteRevisionParams<T>
    ) => Promise<void>;
    /**
     * Delete the entry.
     */
    delete: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsDeleteParams<T>
    ) => Promise<void>;
    /**
     * Publish the entry.
     */
    publish: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsPublishParams<T>
    ) => Promise<T>;
    /**
     * Unpublish the entry.
     */
    unpublish: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsUnpublishParams<T>
    ) => Promise<T>;
    /**
     * Request changes the entry.
     */
    requestChanges: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsRequestChangesParams<T>
    ) => Promise<T>;
    /**
     * Request review the entry.
     */
    requestReview: (
        model: CmsContentModel,
        params: CmsContentEntryStorageOperationsRequestReviewParams<T>
    ) => Promise<CmsContentEntry>;
}

export enum CONTENT_ENTRY_STATUS {
    DRAFT = "draft",
    PUBLISHED = "published",
    UNPUBLISHED = "unpublished",
    CHANGES_REQUESTED = "changesRequested",
    REVIEW_REQUESTED = "reviewRequested"
}

export interface CmsSettingsStorageOperationsGetParams {
    locale: string;
    tenant: string;
}

export interface CmsSettingsStorageOperationsCreateParams {
    settings: CmsSettings;
}

export interface CmsSettingsStorageOperationsUpdateParams {
    original: CmsSettings;
    settings: CmsSettings;
}

export interface CmsSettingsStorageOperations {
    /**
     * Get the settings from the storage.
     */
    get: (params: CmsSettingsStorageOperationsGetParams) => Promise<CmsSettings | null>;
    /**
     * Create settings in the storage.
     */
    create: (params: CmsSettingsStorageOperationsCreateParams) => Promise<CmsSettings>;
    /**
     * Update the settings in the storage.
     */
    update: (params: CmsSettingsStorageOperationsUpdateParams) => Promise<CmsSettings>;
}

export interface CmsSystem {
    version?: string;
    readAPIKey?: string;
    /**
     * TODO migration
     */
    tenant: string;
}

export interface CmsSystemStorageOperationsGetParams {
    tenant: string;
}

export interface CmsSystemStorageOperationsCreateParams {
    system: CmsSystem;
}

export interface CmsSystemStorageOperationsUpdateParams {
    system: CmsSystem;
    original: CmsSystem;
}

export interface CmsSystemStorageOperations {
    /**
     * Get the system data.
     */
    get: (params: CmsSystemStorageOperationsGetParams) => Promise<CmsSystem | null>;
    /**
     * Create the system info in the storage.
     */
    create: (params: CmsSystemStorageOperationsCreateParams) => Promise<CmsSystem>;
    /**
     * Update the system info in the storage.
     */
    update: (params: CmsSystemStorageOperationsUpdateParams) => Promise<CmsSystem>;
}

export interface HeadlessCmsStorageOperations {
    system: CmsSystemStorageOperations;
    settings: CmsSettingsStorageOperations;
    groups: CmsContentModelGroupStorageOperations;
    models: CmsContentModelStorageOperations;
    entries: CmsContentEntryStorageOperations;

    init?: (cms: HeadlessCms) => Promise<void>;
    /**
     * Plugins to be attached to the main context.
     */
    plugins?: Plugin[] | Plugin[][];
    /**
     * An upgrade to run if necessary.
     */
    upgrade?: UpgradePlugin | null;
}
