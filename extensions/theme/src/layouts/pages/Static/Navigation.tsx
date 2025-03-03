import React from "react";
import { Link } from "@webiny/react-router";
import { PublishedMenuData, PublishedMenuItemData } from "@webiny/app-website";
import styled from "@emotion/styled";

export const Navigation: React.ComponentType<{ data?: PublishedMenuData }> = ({ data }) => {
    if (!data) {
        return null;
    }

    return (
        <NavigationUl>
            {data.items?.map((item, index) => (
                <NavigationLi key={item.id + index} item={item} />
            ))}
        </NavigationUl>
    );
};

const NavigationLi = ({ item }: { item: PublishedMenuItemData }) => {
    if (Array.isArray(item.children) && item.children.length > 0) {
        return (
            <li>
                {item.title}
                <ul>
                    {item.children.map((item, index) => (
                        <NavigationLi key={item.id + index} item={item} />
                    ))}
                </ul>
            </li>
        );
    }

    let title = <>{item.title}</>;

    // We only use the Link component if the item has a `path` or `url` value.
    if (item.path || item.url) {
        title = <Link to={item.path || item.url}>{title}</Link>;
    }

    return <li>{title}</li>;
};

const NavigationUl = styled.ul`
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;

    li {
        ${props => props.theme.styles.typography.paragraphs.stylesById("paragraph1")}
        display: inline-block;
        cursor: pointer;
        margin-left: 25px;
        padding: 10px;
        position: relative;
        transition: background-color 0.2s;
        color: ${props => props.theme.styles.colors["color1"]};

        ul {
            display: none;
        }

        &:hover {
            background-color: ${props => props.theme.styles.colors["color5"]};
            border-radius: ${props => props.theme.styles.borderRadius};

            ul {
                display: grid;
                position: absolute;
                top: 42px;
                right: 0;
                max-width: 300px;
                width: max-content;
                background-color: ${props => props.theme.styles.colors["color6"]};
                box-shadow: 0 0 1px 1px rgb(34 45 57 / 15%);

                li {
                    margin: 0;
                    padding: 10px;
                }

                a {
                    display: inline-block;
                    width: 100%;
                    box-sizing: border-box;
                }
            }
        }
    }

    ${props => props.theme.breakpoints["tablet"]} {
        display: block;
        margin: 75px 0 0 35px;
        text-transform: uppercase;

        li {
            display: block;
            cursor: auto;
            margin: 0 0 15px 0;
            padding: 0;
            font-size: 20px;

            a {
                font-size: 20px;
            }

            ul {
                display: block;
                margin: 10px 15px 0 15px;

                a {
                    font-size: 16px;
                    padding: 0;
                }
            }

            &:hover {
                ul {
                    display: block;
                    position: static;
                    margin: 10px 15px 0 15px;
                    width: auto;
                    max-width: none;
                    background-color: transparent;
                    box-shadow: none;

                    li {
                        margin: 0 0 15px 0;
                    }

                    a {
                        padding: 0;
                        width: auto;
                    }
                }
            }
        }
    }
`;
