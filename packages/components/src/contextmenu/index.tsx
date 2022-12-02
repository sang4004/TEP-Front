/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 * contextmenu/index.tsx
 * hooks :
 * useLocations
 *
 * last modify : jh.jeong@ilts.co.kr
 ******************************************************************************/
// Library
import React, { useRef, useState, useEffect } from "react"; // default hooks
import {
    Menu,
    Item,
    Separator,
    Submenu,
    useContextMenu,
    ItemParams,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
//
// Module
import * as S from "./styled";

export type contextMenuProps = {
    menu_id: string;
    items: string[];
    onClickItem: (data: any) => void;
    is_always?: boolean;
};
interface FinalContextMenuProps extends contextMenuProps {}

export const ContextMenuComp = (
    props: FinalContextMenuProps
): { contextMenuElement: any; onContextMenu: any } => {
    const { show } = useContextMenu({
        id: props.menu_id,
    });

    const [selectedId, setSelectedId] = useState<any>();

    useEffect(() => {
        if (props.is_always) {
            document.addEventListener("contextmenu", (event) => {
                event.preventDefault();
                handleContextMenu(event);
            });

            () =>
                document.removeEventListener("contextmenu", (event) => {
                    event.preventDefault();
                    handleContextMenu(event);
                });
        }
    }, []);

    const handleContextMenu = (event: any, value?: number) => {
        event.preventDefault();
        setSelectedId(value);
        show(event, {
            props: {
                key: value,
            },
        });
    };
    const handleItemClick = (args?: ItemParams<any, any>) => {
        if (args) {
            props.onClickItem({ selectedId, selectItem: args.data });
        }
    };
    return {
        contextMenuElement: (
            <S.Block key={props.menu_id}>
                <Menu animation={false} id={props.menu_id}>
                    {props.items.map((raw, idx) => {
                        return (
                            <>
                                <Item
                                    key={idx}
                                    data={idx}
                                    onClick={handleItemClick}
                                >
                                    {raw}
                                </Item>
                                <Separator />
                            </>
                        );
                    })}
                    {/* <Submenu label="Foobar">
                        <Item onClick={handleItemClick}>Sub Item 1</Item>
                        <Item onClick={handleItemClick}>Sub Item 2</Item>
                    </Submenu> */}
                </Menu>
            </S.Block>
        ),
        onContextMenu: handleContextMenu,
    };
};
