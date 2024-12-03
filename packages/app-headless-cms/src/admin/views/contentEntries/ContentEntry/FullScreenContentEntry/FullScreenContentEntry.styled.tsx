import styled from "@emotion/styled";

export const FullScreenContentEntryContainer = styled.div`
    #headerToolbarGrid {
        border: 0;
    }
`;

export const DetailsContainer = styled.div`
    overflow-y: scroll;
    height: calc(100vh - 65px);
`;

export const FormWrapper = styled.div`
    max-width: 1140px;
    margin: 0 auto;
    padding: 16px;
`;

export const BackButtonWrapper = styled.div`
    margin-left: -10px;
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

export const PageTitle = styled.div`
    font-family: var(--mdc-typography-font-family);
    border: 1px solid transparent;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 120%;
`;

export const PageVersion = styled.span`
    font-size: 20px;
    color: var(--mdc-theme-text-secondary-on-background);
    margin-left: 5px;
    line-height: 120%;
`;

export const PageMeta = styled.div`
    height: 20px;
    margin: -2px 2px 2px 2px;
`;
