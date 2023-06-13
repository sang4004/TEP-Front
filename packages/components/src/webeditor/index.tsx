/******************************************************************************
 * dropdown/index.tsx
 * hooks :
    * useLocations 
 ******************************************************************************/
// Library
import { useSelector, useDispatch } from "react-redux"; // redux
import React, { useState, useEffect, useRef } from "react"; // default hooks
import { Editor, EditorTools, EditorUtils, ProseMirror } from '@progress/kendo-react-editor';
import * as common from "@progress/kendo-editor-common";
import * as S from "./styled";

//
// Module
import { useLocations } from "hooks" // locations hooks
import { input } from "./input-node";
import { select } from "./select-node";
import { option } from "./option-node";
import { textarea } from "./textarea-node";
import fontSizeTool from "./fontsizetool";
//
export type WebEdtiorProps = {
    wrapstyle ?: object; 
    contentStyle ?: object;
    content ?: string;
    head ?: string;
    onChangeContent : (html:string)=>void;
    editdisabled : boolean;
    toolDisabled ?: boolean;
}
interface FinalWebEdtiorProps extends WebEdtiorProps {};

const { Schema, EditorState, EditorView, Plugin, PluginKey } = ProseMirror;

type mountType = {
    target: Editor;
    dom: HTMLDivElement;
    plugins: Array<Plugin>;
    shortcuts: EditorUtils.Shortcuts;
    viewProps: {
        state: common.EditorState;
        [key: string]: any;
    };
}

const {
    Bold, Strikethrough, Subscript, Superscript,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Indent, Outdent, OrderedList, UnorderedList,
    Undo, Redo, FontSize, FontName, FormatBlock,
    Link, Unlink, InsertImage, ViewHtml,
    // InsertTable,
    // AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter,
    // DeleteRow, DeleteColumn, DeleteTable, 
    // MergeCells, SplitCell,
    Pdf, ForeColor, BackColor
} = EditorTools;

const PdfTool = (props: EditorTools.PdfProps) => (
    <Pdf
        {...props}
        savePdfOptions={{
            fileName: 'editor-export.pdf',
            paperSize: 'A4',
            margin: '1cm',
        }}
    />
);

export const WebEditorComponent : React.FunctionComponent<FinalWebEdtiorProps> = ( props : FinalWebEdtiorProps )=>{
    
    const editorRef = useRef(null);
    const [changedHtml, setChangedHtml] = useState<boolean>(false);

    useEffect(() => {
        setChangedHtml(true);
        setTimeout(() => {
            setChangedHtml(false);
        }, 300);
    }, [ props.content, props.editdisabled ]);
    
    const onMount = (event : any)=>{
        const { viewProps } = event;
        const { schema } = viewProps.state;
        
        let nodes = schema.spec.nodes.addToEnd("select", select);
        nodes = nodes.addToEnd("option", option);
        nodes = nodes.addToEnd("textarea", textarea);
        nodes = nodes.addToEnd("input", input);

        const _schema = new Schema({ nodes, marks : EditorUtils.marks });
        
        const doc = EditorUtils.createDocument(_schema , props.content ? props.content : "");

        const plugins = [
            ...viewProps.state.plugins,
            new Plugin({
                key: new PluginKey('readonly'),
                props: { editable: ()=>!props.editdisabled,  },
                // filterTransaction: ((tr, _st) => !props.editdisabled)
            })
        ];

        document.getElementsByClassName("k-editor-content")[0].id = "k-editor-content";

        return new EditorView({
            mount : event.dom
        },
        {
            ...event.viewProps,
            state : EditorState.create({ doc : doc, plugins }),
            handleDOMEvents: {
                // https://prosemirror.net/docs/ref/#view.EditorProps.handleDOMEvents
                ...event.viewProps.handleDOMEvents,
                keydown: (_view : any, event:any) => {
                    const { code, target, ctrlKey } = event;
                    return (
                    (code === "Backspace" ||
                        code === "Delete" ||
                        (ctrlKey && code === "KeyA")) &&
                    target.nodeName === "INPUT"
                    );
                },
                input: (view : any, event:any) => {
                    const target = event.target;
                    try{
                        if (!event.isComposing && target.nodeName === "INPUT") {
                            const cursor = target.selectionStart;
                            const parent = target.parentNode;
                            const index = Array.from(parent.childNodes).indexOf(target);
                            const pos = view.posAtDOM(target);
                            var tr;
                            if(props.editdisabled){
                                return;
                            }
                            tr = view.state.tr.setNodeMarkup(pos-1, null, {
                                value: target.value,
                                type: target.getAttribute("type")
                            });
                            view.dispatch(tr);
                            const input = parent.childNodes.item(index);
                            input.focus();
                            input.setSelectionRange(cursor, cursor);
                        } else if(target.nodeName === "SELECT"){
                            const pos = view.posAtDOM(target);
                            let tr = view.state.tr.setNodeMarkup(pos-1, null, {
                                value : target.value,
                                id : target.id
                            });
                            for(var i=0;i<target.childNodes.length;i++){
                                const pos = view.posAtDOM(target.childNodes[i]);
                                target.childNodes[i].innerText
                                if(target.childNodes[i].value == target.value){
                                    tr = tr.setNodeMarkup(pos-1, null, {
                                        selected : "selected",
                                        value : target.childNodes[i].value
                                    });
                                } else {
                                    tr = tr.setNodeMarkup(pos-1, null, {
                                        value : target.childNodes[i].value
                                    });
                                }
                            }
                            view.dispatch(tr);
                        }
                    }catch(err){console.log(err)}
                }
            }
        });
    }
    return (
        <S.Block style={props.wrapstyle}>
            {!changedHtml ? 
            <Editor 
                tools={ props.toolDisabled ? [] : [
                    [Bold, Strikethrough],
                    [Subscript, Superscript],
                    [AlignLeft, AlignCenter, AlignRight, AlignJustify],
                    [Indent, Outdent],
                    [OrderedList, UnorderedList],
                    fontSizeTool, FontName, FormatBlock,
                    [Undo, Redo],
                    [Link, Unlink, InsertImage, ViewHtml, ],
                    // [InsertTable],
                    // [AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter],
                    // [DeleteRow, DeleteColumn, DeleteTable],
                    // [MergeCells, SplitCell],
                ]}
                ref={editorRef}
                defaultEditMode="div"
                contentStyle={props.contentStyle}
                onChange={(event)=>{ props.onChangeContent(event.html) }}
                onMount={onMount}
                style={{ width : "100%", height : "100%" }}
                />
            : null }
        </S.Block>
    );
}