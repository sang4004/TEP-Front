import React, {useState, useEffect} from 'react';
import { Button as MButton , Typography } from "@material-ui/core";
import { Modal, Button } from 'antd';
import styled from "styled-components";

interface ModalKeypadBasicProps {
    title: string;
    width?: number;
    style?: any;
    onSave ?: (val : number)=>void;
    onCancel ?: ()=>void;
    onVisible : boolean;
}

const KEYPAD_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, -1, 0, -2];
export const ModalKeypadComp = ({ ...props }: ModalKeypadBasicProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [keys, setKeys] = useState<number[]>([]);

    useEffect(() => {
        setIsVisible(props.onVisible);
    }, [props.onVisible]);

    const onClickOk = ()=>{
        setIsVisible(false);
        if(props.onSave) props.onSave(keys.length > 0 ? parseInt(keys.join("")) : 0);
    }

    const onClickCancel = ()=>{
        setIsVisible(false);
        if(props.onCancel) props.onCancel();
    }

    const onClickKey = (idx : number)=>{
        if(KEYPAD_LIST[idx] == -1){
            if(keys.length > 0)
                setKeys([...keys.slice(0, keys.length -1)]);
        } else if(KEYPAD_LIST[idx] == -2){
            if(keys.length > 0)
                setKeys([]);
        } else {
            setKeys([...keys, KEYPAD_LIST[idx]]);
        }
    }

    return (
        <Modal
            style={props.style}
            destroyOnClose={true}
            title={props.title}
            visible={isVisible}
            onOk={onClickOk}
            onCancel={onClickCancel}
            width={props.width}
            footer={[
                <FooterBtn
                    key="submit"
                    type="primary"
                    onClick={onClickOk}
                    >
                    저장
                </FooterBtn>
            ]}
            >
            <TopDiv>
                <TopValue>{keys.join("")}</TopValue>
            </TopDiv>
            {KEYPAD_LIST.map((raw,idx)=>{
                return (
                    <BtnStyled key={idx} onClick={()=>onClickKey(idx)}>{raw == -1 ? "지움" : raw == -2 ? "초기화" : raw}</BtnStyled>
                );
            })}
        </Modal>
    );
};

const TopDiv = styled.div`
    width : 100%;
    height : 30px;
    display : flex;
    justify-content : center;
    align-items : center;
`;

const TopValue = styled(Typography)`
    border : 1px solid #bebebe;
    font-size : 1.4em;
    width : max-content;
    text-align : center;
    min-width : 1px;
    height : 100%;
`;

const BtnStyled = styled(MButton)`
    height : 100px;
    width : 33%;
    font-size : 1.2em;
    box-shadow: 0 3px 3px -2px rgb(0 0 0 / 20%), 0 3px 4px 0 rgb(0 0 0 / 14%), 0 1px 8px 0 rgb(0 0 0 / 12%);
`;

const FooterBtn = styled(Button)`
    height : 64px;
    width : 100%;
    font-size : 1.3em;
`;