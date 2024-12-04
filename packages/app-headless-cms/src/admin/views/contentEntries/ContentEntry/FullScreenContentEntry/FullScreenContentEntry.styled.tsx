import styled from "@emotion/styled";

export const FullScreenContentEntryContainer = styled.div`
    #headerToolbarGrid {
        border: 0;
        padding: 0;
        margin: 0;
    }
`;

export const DetailsContainer = styled.div`
    overflow-y: scroll;
    height: calc(100vh - 65px);
`;

export const FormWrapper = styled.div`
    max-width: 960px;
    margin: 0 auto;
    padding: 16px;
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    flex-direction: column;
    color: var(--mdc-theme-text-primary-on-background);
    position: relative;
    width: 100%;
    margin-left: 10px;
`;

interface EntryTitleProps {
    isNewEntry?: boolean;
}

export const EntryTitle = styled.div<EntryTitleProps>`
    font-family: var(--mdc-typography-font-family);
    font-size: 20px;
    line-height: 1.4em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: ${props => (props.isNewEntry ? 0.3 : 1)};
`;

export const EntryVersion = styled.span`
    font-size: 20px;
    color: var(--mdc-theme-text-secondary-on-background);
    margin-left: 5px;
    line-height: 120%;

    @media (max-width: 800px) {
        display: none;
    }
`;

export const EntryMeta = styled.div`
    height: 20px;
    margin: -2px 2px 2px 2px;

    @media (max-width: 800px) {
        display: none;
    }
`;
