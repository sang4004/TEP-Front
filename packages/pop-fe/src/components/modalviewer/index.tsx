import React, {useState, useEffect} from 'react';
import { Modal, Button } from 'antd';
import styled from "styled-components";

interface ModalViewerBasicProps {
    children: React.ReactNode;
    title: string;
    width?: number;
    style?: any;
    onSave ?: ()=>void;
    onCancel ?: ()=>void;
    onVisible : boolean;
    onCancelHidden ?: boolean;
}

export const ModalViewerComp = ({ ...props }: ModalViewerBasicProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [footerBtns, setFooterBtns] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        // var footers = [
        //     <BtnStyled key="back" onClick={onClickCancel}>
        //         닫기
        //     </BtnStyled>,
        //     <BtnStyled
        //         key="submit"
        //         type="primary"
        //         onClick={onClickOk}
        //         style={{ width : props.onCancelHidden ? "100%" : "48%"}}
        //         >
        //         저장
        //     </BtnStyled>
        // ]
        // if(props.onCancelHidden) footers.splice(0,1)
        // setFooterBtns(footers);
    }, []);

    useEffect(() => {
        setIsVisible(props.onVisible);
    }, [props.onVisible]);

    const onClickOk = ()=>{
        setIsVisible(false);
        if(props.onSave) props.onSave();
    }

    const onClickCancel = ()=>{
        setIsVisible(false);
        if(props.onCancel) props.onCancel();
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
            footer={footerBtns}>
            {props.children}
        </Modal>
    );
};

const BtnStyled = styled(Button)`
    height : 64px;
    width : 48%;
    font-size : 1.2em;
`;