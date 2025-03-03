/**
 * TODO remove regular model delete at some point.
 */
import React, { useCallback, useMemo, useState } from "react";
import { TimeAgo } from "@webiny/ui/TimeAgo";
import { css } from "emotion";
import { useRouter } from "@webiny/react-router";
import { DeleteIcon, EditIcon } from "@webiny/ui/List/DataList/icons";
import { ReactComponent as ViewListIcon } from "../../icons/view_list.svg";
import { ReactComponent as CloneIcon } from "../../icons/clone.svg";
import { useModels } from "../../hooks";
import * as UIL from "@webiny/ui/List";
import { ButtonIcon, ButtonSecondary, IconButton } from "@webiny/ui/Button";
import { Tooltip } from "@webiny/ui/Tooltip";
import { i18n } from "@webiny/app/i18n";
import { ReactComponent as AddIcon } from "@webiny/app-admin/assets/icons/add-18px.svg";
import SearchUI from "@webiny/app-admin/components/SearchUI";
import { deserializeSorters } from "../utils";
import orderBy from "lodash/orderBy";
import { Cell, Grid } from "@webiny/ui/Grid";
import { Select } from "@webiny/ui/Select";
import { ReactComponent as FilterIcon } from "@webiny/app-admin/assets/icons/filter-24px.svg";
import type { CmsEditorContentModel, CmsModel } from "~/types";
import { usePermission } from "~/admin/hooks/usePermission";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { OptionsMenu } from "./OptionsMenu";
import { ReactComponent as DownloadFileIcon } from "@webiny/app-admin/assets/icons/file_download.svg";
import { ReactComponent as UploadFileIcon } from "@webiny/app-admin/assets/icons/file_upload.svg";
import { useModelExport } from "./exporting/useModelExport";
import { ModelIsBeingDeleted } from "./fullDelete/ModelIsBeingDeleted";
import { FullyDeleteModelDialog } from "~/admin/views/contentModels/fullDelete/FullyDeleteModelDialog";

const t = i18n.namespace("FormsApp.ContentModelsDataList");

interface Sorter {
    label: string;
    sorters: string;
}

const SORTERS: Sorter[] = [
    {
        label: t`Newest to oldest`,
        sorters: "savedOn_DESC"
    },
    {
        label: t`Oldest to newest`,
        sorters: "savedOn_ASC"
    },
    {
        label: t`Name A-Z`,
        sorters: "name_ASC"
    },
    {
        label: t`Name Z-A`,
        sorters: "name_DESC"
    }
];

const DataListActionsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const rightAlign = css({
    alignItems: "flex-end !important",
    justifyContent: "center !important"
});

const listItemMinHeight = css({
    minHeight: "66px !important"
});

interface ContentModelsDataListProps {
    canCreate: boolean;
    onCreate: () => void;
    onClone: (contentModel: CmsEditorContentModel) => void;
    showImportModelModal: () => void;
}

const Icon = styled("div")({
    width: "24px",
    height: "24px",
    marginRight: "15px",
    flex: "0 0 24px",
    svg: {
        color: "var(--mdc-theme-text-icon-on-light)",
        width: "100%",
        height: "auto",
        maxWidth: 24,
        maxHeight: 24
    }
});

interface IconProps {
    model: Pick<CmsModel, "icon">;
}

const DisplayIcon = ({ model }: IconProps) => {
    if (!model.icon) {
        return null;
    }
    return <FontAwesomeIcon icon={(model.icon || "").split("/") as IconProp} />;
};

const ContentModelsDataList = ({
    canCreate,
    onCreate,
    onClone,
    showImportModelModal
}: ContentModelsDataListProps) => {
    const [filter, setFilter] = useState<string>("");
    const [sort, setSort] = useState<string>(SORTERS[0].sorters);
    const { history } = useRouter();
    const { models, loading, refresh } = useModels();
    const { canDelete, canEdit } = usePermission();

    const [modelToBeDeleted, setModelToBeDeleted] = useState<CmsModel | null>(null);

    const filterData = useCallback(
        ({ name }: Pick<CmsModel, "name">): boolean => {
            return name.toLowerCase().includes(filter);
        },
        [filter]
    );

    const sortData = useCallback(
        (list: CmsModel[]): CmsModel[] => {
            if (!sort) {
                return list;
            }
            const [sortField, sortOrderBy] = deserializeSorters(sort);
            return orderBy(list, [sortField], [sortOrderBy]);
        },
        [sort]
    );

    const editRecord = (contentModel: CmsModel): void => {
        history.push("/cms/content-models/" + contentModel.modelId);
    };

    const viewContentEntries = useCallback((contentModel: Pick<CmsModel, "modelId">) => {
        return () => history.push("/cms/content-entries/" + contentModel.modelId);
    }, []);

    const contentModelsDataListModalOverlay = useMemo(
        () => (
            <UIL.DataListModalOverlay>
                <Grid>
                    <Cell span={12}>
                        <Select
                            value={sort}
                            onChange={setSort}
                            label={t`Sort by`}
                            description={"Sort content models by"}
                        >
                            {SORTERS.map(({ label, sorters }) => {
                                return (
                                    <option key={label} value={sorters}>
                                        {label}
                                    </option>
                                );
                            })}
                        </Select>
                    </Cell>
                </Grid>
            </UIL.DataListModalOverlay>
        ),
        [sort]
    );

    const filteredData = filter === "" ? models : models.filter(filterData);
    const contentModels = sortData(filteredData);

    const { handleModelsExport, handleModelExport } = useModelExport();

    const onRefreshClick = useCallback(() => {
        refresh();
    }, []);

    return (
        <>
            <UIL.DataList
                loading={loading}
                data={contentModels}
                title={t`Content Models`}
                actions={
                    <DataListActionsWrapper>
                        {canCreate ? (
                            <ButtonSecondary data-testid="new-record-button" onClick={onCreate}>
                                <ButtonIcon icon={<AddIcon />} /> {t`New Model`}
                            </ButtonSecondary>
                        ) : null}
                        <OptionsMenu
                            data-testid="pb-blocks-list-options-menu"
                            items={[
                                {
                                    label: "Export all models",
                                    icon: <DownloadFileIcon />,
                                    onClick: handleModelsExport
                                },
                                {
                                    label: "Import models",
                                    icon: <UploadFileIcon />,
                                    onClick: showImportModelModal
                                }
                            ]}
                        />
                    </DataListActionsWrapper>
                }
                search={
                    <SearchUI
                        value={filter}
                        onChange={setFilter}
                        inputPlaceholder={t`Search content models`}
                    />
                }
                modalOverlay={contentModelsDataListModalOverlay}
                modalOverlayAction={
                    <UIL.DataListModalOverlayAction
                        icon={<FilterIcon />}
                        data-testid={"default-data-list.filter"}
                    />
                }
                refresh={onRefreshClick}
            >
                {({ data = [] }: { data: CmsModel[] }) => (
                    <UIL.List data-testid="default-data-list">
                        {data.map(contentModel => {
                            const disableViewContent = contentModel.fields.length === 0;
                            const message = disableViewContent
                                ? "To view the content, you first need to add a field and save the model"
                                : "View content";

                            return (
                                <UIL.ListItem
                                    key={contentModel.modelId}
                                    className={listItemMinHeight}
                                >
                                    <Icon>
                                        <DisplayIcon model={contentModel} />
                                    </Icon>
                                    <UIL.ListItemText>
                                        {contentModel.name}
                                        <UIL.ListItemTextSecondary>
                                            {t`Last modified: {time}.`({
                                                time: contentModel.savedOn ? (
                                                    <TimeAgo datetime={contentModel.savedOn} />
                                                ) : (
                                                    "N/A"
                                                )
                                            })}
                                        </UIL.ListItemTextSecondary>
                                    </UIL.ListItemText>
                                    <UIL.ListItemMeta className={rightAlign}>
                                        <ModelIsBeingDeleted model={contentModel}>
                                            <UIL.ListActions>
                                                <Tooltip
                                                    content={t`{message}`({ message })}
                                                    placement={"top"}
                                                >
                                                    <IconButton
                                                        data-testid={
                                                            "cms-view-content-model-button"
                                                        }
                                                        icon={<ViewListIcon />}
                                                        label={t`View entries`}
                                                        onClick={viewContentEntries(contentModel)}
                                                        disabled={disableViewContent}
                                                    />
                                                </Tooltip>
                                                <Tooltip
                                                    content={t`Export content model`}
                                                    placement={"top"}
                                                >
                                                    <IconButton
                                                        data-testid={
                                                            "cms-export-content-model-button"
                                                        }
                                                        icon={<DownloadFileIcon />}
                                                        label={t`Export content model`}
                                                        onClick={handleModelExport(contentModel)}
                                                    />
                                                </Tooltip>
                                                {canEdit(contentModel, "cms.contentModel") && (
                                                    <>
                                                        {contentModel.plugin ? (
                                                            <Tooltip
                                                                content={t`Content model is registered via a plugin.`}
                                                                placement={"top"}
                                                            >
                                                                <EditIcon
                                                                    disabled
                                                                    data-testid={
                                                                        "cms-edit-content-model-button"
                                                                    }
                                                                />
                                                            </Tooltip>
                                                        ) : (
                                                            <Tooltip
                                                                content={t`Edit content model`}
                                                                placement={"top"}
                                                            >
                                                                <EditIcon
                                                                    onClick={() =>
                                                                        editRecord(contentModel)
                                                                    }
                                                                    data-testid={
                                                                        "cms-edit-content-model-button"
                                                                    }
                                                                />
                                                            </Tooltip>
                                                        )}
                                                        <Tooltip
                                                            content={"Clone content model"}
                                                            placement={"top"}
                                                        >
                                                            <IconButton
                                                                data-testid={
                                                                    "cms-clone-content-model-button"
                                                                }
                                                                icon={<CloneIcon />}
                                                                label={t`Clone content model`}
                                                                onClick={() =>
                                                                    onClone(contentModel)
                                                                }
                                                            />
                                                        </Tooltip>
                                                    </>
                                                )}

                                                {canDelete(contentModel, "cms.contentModel") && (
                                                    <>
                                                        <Tooltip
                                                            content={t`Delete content model`}
                                                            placement={"top"}
                                                        >
                                                            <DeleteIcon
                                                                onClick={() => {
                                                                    setModelToBeDeleted(
                                                                        contentModel
                                                                    );
                                                                }}
                                                                data-testid={
                                                                    "cms-delete-content-model-button"
                                                                }
                                                            />
                                                        </Tooltip>
                                                    </>
                                                )}
                                            </UIL.ListActions>
                                        </ModelIsBeingDeleted>
                                    </UIL.ListItemMeta>
                                </UIL.ListItem>
                            );
                        })}
                    </UIL.List>
                )}
            </UIL.DataList>
            <FullyDeleteModelDialog
                model={modelToBeDeleted}
                onClose={() => {
                    setModelToBeDeleted(null);
                }}
            />
        </>
    );
};

export default ContentModelsDataList;
