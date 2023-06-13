/******************************************************************************
 * projecttreemodal/index.tsx
 * hooks :
 * useLocations
 *
 ******************************************************************************/
// Library
import React, { useRef } from "react"; // default hooks
import { Editor, EditorTools } from '@progress/kendo-react-editor';
//
// Module
//import * as S from "./styled";
import './styled.css';

import { useDispatch } from "react-redux";

export type edmsTmChecklistModalProps = {
    style ?: object;
    visible : boolean;
    onClose : ()=>void;
}
interface FinaledmsTmChecklistModalProps extends edmsTmChecklistModalProps {};

const {
    Bold, Strikethrough, Subscript, Superscript,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Indent, Outdent, OrderedList, UnorderedList,
    Undo, Redo, FontName, FormatBlock,
    InsertImage,
} = EditorTools;

export const EdmsTmChecklistModal : React.FunctionComponent<FinaledmsTmChecklistModalProps> = ( props )=>{
    const dispatch = useDispatch();
    const editorRef = useRef(null);

    const onClose = ()=>{
        props.onClose()
    }

    return (
        <div className="tm_chk_progress_wrap"
             style={{display: props.visible ? 'flex' : 'none'}}>
            <div className="tm_chk_progress_modal">
                <div className="tm_chk_modal_header">
                    <div className="tm_chk_modal_title">
                        체크리스트
                    </div>
                    <div className="tm_chk_modal_close_btn">
                        <img src="./img/times-solid-white.svg" alt="" />
                    </div>
                </div>
                <div className="tm_chk_modal_contents_wrap">
                    <div className="tm_chk_inner_container tm_chk_copy_file_box">
                        <div className="tm_chk_inner_container_header">
                            <div className="tm_chk_inner_container_title">
                                체크리스트 결과서 - <span>0</span>
                            </div>
                            <button style={{color: "#477EE9"}}>
                                Open repository
                            </button>
                        </div>
                        <div className="tm_chk_copy_file_list">
                            <div style={{margin: "30px auto", textAlign: "center", color: "#999"}}>체크리스트 결과서 파일이 없습니다.</div>
                        </div>
                    </div>
                    <div className="tm_chk_inner_container tm_chk_copy_file_choose_box">
                        <div className="tm_chk_file_box">
                            <button className="tm_chk_file_choose_btn">
                                <img src="assets/images/edms/download-black.svg" alt="" />
                                    <div>파일 선택</div>
                            </button>
                        </div>
                        <button className="tm_chk_file_upload_btn">
                            업로드
                        </button>
                    </div>
                </div>
                <div className="tm_chk_modal_btn_container">
                    <button className="tm_chk_list_close_btn" onClick={onClose}>닫기</button>
                    <button className="tm_chk_list_save_btn">저장</button>
                </div>
            </div>
        </div>
    );
}