/******************************************************************************
 * Copyright (c) 2021. Moornmo Inc. Rights reserved.                          *
 * Data modelings and methods used are assets of Moornmo Inc.                 *
 ******************************************************************************/

import React from "react";
import { Modal, Button } from "antd";

var onError = false;
var onWarning = false;
var onConfirm = false;
var onSuccess = false;
var onInfo = false;

interface ModalBasicProps {
    children: React.ReactNode;
    isModalVisible: boolean;
    title: string;
    onOk: (value: any) => void;
    onCancel: () => void;
    width?: number;
    isLoading?: boolean;
    style?: any;
}

export const ModalBasic = ({ ...props }: ModalBasicProps) => {
    return (
        <Modal
            style={props.style}
            destroyOnClose={true}
            title={props.title}
            visible={props.isModalVisible}
            onOk={props.onOk}
            onCancel={props.onCancel}
            width={props.width}
            footer={[
                <Button key="back" onClick={props.onCancel}>
                    닫기
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={props.isLoading}
                    onClick={props.onOk}
                >
                    저장
                </Button>,
            ]}
        >
            {props.children}
        </Modal>
    );
};

export const ModalConfirm = (
    message: string,
    onExit: (result : boolean)=>void,
    width?: string | number
) => {
    if (!onConfirm) {
        Modal.confirm({
            title: "확인",
            content: message,
            cancelText: "취소",
            okText: "확인",
            onOk: () => {
                onConfirm = false;
                onExit(true);
            },
            onCancel: () => {
                onConfirm = false;
                onExit(false);
            },
            width: width,
        });
        onConfirm = true;
    }
};

export const ModalSuccess = (message: string) => {
    if (!onSuccess) {
        Modal.success({
            content: message,
            okText: "확인",
            onOk: () => {
                onSuccess = false;
            },
        });
        onSuccess = true;
    }
};

export const ModalInfo = (message: string) => {
    if (!onInfo) {
        Modal.info({
            title: "안내",
            content: message,
            okText: "확인",
            onOk: () => {
                onInfo = false;
            },
        });
        onInfo = true;
    }
};

export const ModalError = (message: string) => {
    if (!onError) {
        Modal.error({
            title: "에러",
            content: message,
            okText: "확인",
            onOk: () => {
                onError = false;
            },
        });
        onError = true;
    }
};

export const ModalWarning = (message: string) => {
    if (!onWarning) {
        Modal.warning({
            title: "경고",
            content: message,
            okText: "확인",
            onOk: () => {
                onWarning = false;
            },
        });
        onWarning = true;
    }
};
