import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ReactComponent as SavedSearchIcon } from "@material-design-icons/svg/outlined/saved_search.svg";
import { ReactComponent as MoreIcon } from "@material-design-icons/svg/outlined/more_vert.svg";

import { ButtonDefault, ButtonPrimary, IconButton } from "@webiny/ui/Button";
import { DialogActions, DialogContent, DialogTitle } from "@webiny/ui/Dialog";
import {
    List,
    ListItem,
    ListItemMeta,
    ListItemText,
    ListItemTextPrimary,
    ListItemTextSecondary
} from "@webiny/ui/List";

import { DialogContainer, ListActions } from "./QueryManager.styled";
import { QueryManagerPresenter } from "~/components/AdvancedSearch/QueryManager/adapters";
import { Tooltip } from "@webiny/ui/Tooltip";
import { Menu, MenuItem } from "@webiny/ui/Menu";
import { Mode, QueryObjectDTO } from "~/components/AdvancedSearch/QueryObject";

interface QueryManagerProps {
    presenter: QueryManagerPresenter;
    open: boolean;
    onClose: () => void;
    onCreate: (callback?: () => void) => void;
    onEdit: (callback?: () => void) => void;
    onSelect: (data: QueryObjectDTO) => void;
}

export const QueryManager = observer(({ presenter, ...props }: QueryManagerProps) => {
    const viewModel = presenter.getViewModel();

    useEffect(() => {
        presenter.listFilters();
    }, []);

    return (
        <DialogContainer open={props.open} onClose={props.onClose}>
            {props.open ? (
                <>
                    <DialogTitle>{"Advanced search filter"}</DialogTitle>
                    <DialogContent>
                        <List twoLine nonInteractive>
                            {viewModel.filters.map(filter => (
                                <ListItem key={filter.id}>
                                    <ListItemText>
                                        <ListItemTextPrimary>{filter.name}</ListItemTextPrimary>
                                        <ListItemTextSecondary>
                                            {filter.description}
                                        </ListItemTextSecondary>
                                    </ListItemText>
                                    <ListItemMeta>
                                        <ListActions>
                                            <Tooltip content={"Apply filter"}>
                                                <IconButton
                                                    icon={<SavedSearchIcon />}
                                                    label={"Apply filter"}
                                                    onClick={() => props.onSelect(filter)}
                                                />
                                            </Tooltip>
                                            <Menu
                                                handle={
                                                    <IconButton
                                                        icon={<MoreIcon />}
                                                        label={"Open menu"}
                                                    />
                                                }
                                            >
                                                <MenuItem
                                                    onClick={() =>
                                                        props.onEdit(() => {
                                                            presenter.setMode(Mode.UPDATE);
                                                            presenter.selectFilter(filter.id);
                                                        })
                                                    }
                                                >
                                                    Edit
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() =>
                                                        presenter.deleteFilter(filter.id)
                                                    }
                                                >
                                                    Delete
                                                </MenuItem>
                                            </Menu>
                                        </ListActions>
                                    </ListItemMeta>
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <ButtonDefault
                            onClick={() => {
                                presenter.selectFilter();
                                props.onClose();
                            }}
                        >
                            {"Cancel"}
                        </ButtonDefault>
                        <ButtonPrimary
                            onClick={() => {
                                props.onCreate(() => {
                                    presenter.setMode(Mode.CREATE);
                                    presenter.selectFilter();
                                });
                            }}
                        >
                            {"Create new"}
                        </ButtonPrimary>
                    </DialogActions>
                </>
            ) : null}
        </DialogContainer>
    );
});
