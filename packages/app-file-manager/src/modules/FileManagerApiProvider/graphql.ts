import { FileItem } from "@webiny/app-admin/types";
import gql from "graphql-tag";
import { Settings } from "~/types";
import { ListTagsResponseItem } from "~/modules/FileManagerApiProvider/FileManagerApiContext/FileManagerApiContext";
import { ListDbSort } from "@webiny/app-aco/types";

const ERROR_FIELDS = /* GraphQL */ `
    {
        code
        message
        data
    }
`;

export interface GetFileManagerSettingsQueryResponse {
    fileManager: {
        getSettings: {
            data: Settings;
            error?: Error | null;
        };
    };
}

export interface ListFilesListFilesResponse {
    data: FileItem[];
    error?: Error | null;
    meta: {
        hasMoreItems: boolean;
        totalItem: number;
        cursor: string | null;
    };
}

export interface ListFilesQueryResponse {
    fileManager: {
        listFiles: ListFilesListFilesResponse;
    };
}

export interface ListFilesQueryVariables {
    limit?: number;
    after?: string | null;
    sort?: ListDbSort;
    search?: string;
    where?: {
        tags?: string;
        tags_in?: string[];
        tags_startsWith?: string;
        tags_not_startsWith?: string;
        type_in?: string[];
        createdBy?: string;
    };
}

export const LIST_FILES = (FILE_FIELDS: string) => gql`
    query ListFiles(
        $search: String,
        $limit: Int,
        $after: String,
        $where: FmFileListWhereInput
    ) {
        fileManager {
            listFiles(
                search: $search,
                limit: $limit,
                after: $after,
                where: $where
            ) {
                data {}${FILE_FIELDS}
                meta {
                    cursor
                    totalCount
                }
            }
        }
    }
`;

export const GET_FILE = (FILE_FIELDS: string) => gql`
    query GetFile($id: ID!) {
        fileManager {
            getFile(id: $id) {
                data ${FILE_FIELDS}
                error ${ERROR_FIELDS}
            }
        }
    }
`;

export interface ListFileTagsQueryResponse {
    fileManager: {
        listTags: {
            data: ListTagsResponseItem[];
            error: Error | null;
        };
    };
}

export interface ListFileTagsQueryVariables {
    where?: {
        tag_startsWith?: String;
        tag_not_startsWith?: String;
    };
}

export const LIST_TAGS = gql`
    query ListTags($where: TagWhereInput) {
        fileManager {
            listTags(where: $where) {
                data {
                    tag
                    count
                }
                error ${ERROR_FIELDS}
            }
        }
    }
`;

export interface CreateFileMutationResponse {
    fileManager: {
        createFile: {
            data: FileItem;
            error?: Error | null;
        };
    };
}

export interface FileInput {
    key: string;
    name: string;
    size: number;
    type: string;
    tags: string[];
    aliases?: string[];
    meta?: Record<string, any>;
}

export interface CreateFileMutationVariables {
    data: FileInput;
    meta?: Record<string, any>;
}

export const CREATE_FILE = (FILE_FIELDS: string) => gql`
    mutation CreateFile($data: FmFileCreateInput!, $meta: JSON) {
        fileManager {
            createFile(data: $data, meta: $meta) {
                error ${ERROR_FIELDS}
                data ${FILE_FIELDS}
            }
        }
    }
`;

export interface UpdateFileMutationResponse {
    fileManager: {
        updateFile: {
            data: FileItem;
            error?: Error | null;
        };
    };
}

export interface UpdateFileMutationVariables {
    id: string;
    data: Partial<FileInput>;
}

export const UPDATE_FILE = (FILE_FIELDS: string) => gql`
    mutation UpdateFile($id: ID!, $data: FmFileUpdateInput!) {
        fileManager {
            updateFile(id: $id, data: $data) {
                data ${FILE_FIELDS}
                error ${ERROR_FIELDS}
            }
        }
    }
`;

export interface DeleteFileMutationResponse {
    fileManager: {
        updateFile: {
            data: boolean;
            error?: Error | null;
        };
    };
}

export interface DeleteFileMutationVariables {
    id: string;
}

export const DELETE_FILE = gql`
    mutation DeleteFile($id: ID!) {
        fileManager {
            deleteFile(id: $id) {
                data
                error ${ERROR_FIELDS}
            }
        }
    }
`;

export const GET_FILE_SETTINGS = gql`
    query GetSettings {
        fileManager {
            getSettings {
                data {
                    srcPrefix
                    uploadMinFileSize
                    uploadMaxFileSize
                }
                error ${ERROR_FIELDS}
            }
        }
    }
`;

export const GET_FILE_MODEL = gql`
    query GetFileModel {
        fileManager {
            getFileModel {
                data 
                error ${ERROR_FIELDS}
            }
        }
    }
`;
