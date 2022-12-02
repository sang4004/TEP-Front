import React, { useState, useEffect, useContext } from "react"; // default hooks
import { FileDrop } from "react-file-drop";
import "./filedrop.css";

export type FileDropProps = {
    onDrop: (files: FileList) => void;
    onDragOver: (event: any) => void;
    onDragLeave: (event: any) => void;
};

interface FinalFileDropProps extends FileDropProps {}

export const FileDropComp: React.FunctionComponent<FinalFileDropProps> = props => {
    return (
        <FileDrop
            // onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
            // onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
            // onFrameDrop={(event) => console.log('onFrameDrop', event)}
            onDragOver={event => {
                // console.log("onDragOver", event);
                props.onDragOver(event);
            }}
            onDragLeave={event => {
                // console.log("onDragLeave", event);
                props.onDragLeave(event);
            }}
            onDrop={(files, event) => {
                // console.log("onDrop!", files, event);
                if (files) props.onDrop(files);
            }}
        >
            {props.children}
        </FileDrop>
    );
};
