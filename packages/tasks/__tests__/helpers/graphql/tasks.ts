export const createListTasksQuery = () => {
    return /* GraphQL */ `
        query ListTasks(
            $where: WebinyBackgroundTaskListWhereInput
            $sort: [WebinyBackgroundTaskListSorter!]
            $limit: Int
            $after: String
        ) {
            backgroundTasks {
                listTasks(where: $where, sort: $sort, limit: $limit, after: $after) {
                    data {
                        id
                        definitionId
                        name
                        taskStatus
                        createdOn
                        savedOn
                        eventResponse
                        createdBy {
                            id
                            displayName
                            type
                        }
                        startedOn
                        finishedOn
                        values
                    }
                    meta {
                        cursor
                        hasMoreItems
                        totalCount
                    }
                    error {
                        message
                        code
                        data
                    }
                }
            }
        }
    `;
};
