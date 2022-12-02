import ReactDOM from "react-dom";

import "../../../../../node_modules/froala-editor/js/plugins/table.min.js";
import "../../../../../node_modules/froala-editor/js/froala_editor.pkgd.min.js";
import "../../../../../node_modules/froala-editor/js/plugins.pkgd.min.js";
import "../../../../../node_modules/froala-editor/css/froala_style.min.css";
import "../../../../../node_modules/froala-editor/css/froala_editor.pkgd.min.css";

import React, { useState, useEffect } from "react";
import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";

import "../../../../../node_modules/froala-editor/css/plugins.pkgd.min.css";

export type EditorProps = {
    edit: boolean;
    onChangeContent: (content: string) => void;
    content: string;
    height?: any;
};

const froalaConfig = {
    key: "re1H1qB1C1E7D7C5F4D4iAa1Tb1YZNYAh1CUKUEQOHFVANUqD1G1F4A3B1C8A4D2B4H5==",
    pluginsEnabled: [
        "align",
        "charCounter",
        "codeBeautifier",
        "codeView",
        "colors",
        "draggable",
        "emoticons",
        "entities",
        "fontFamily",
        "fontSize",
        "fullscreen",
        "help",
        "image",
        "inlineClass",
        "inlineStyle",
        "link",
        "lists",
        "paragraphFormat",
        "paragraphStyle",
        "print",
        "quote",
        "save",
        "specialCharacters",
        "table",
        "url",
        "video",
        "wordPaste",
    ],
    toolbarButtons: {
        moreText: {
            buttons: [
                "",
                "italic",
                "underline",
                "strikeThrough",
                "subscript",
                "superscript",
                "fontFamily",
                "fontSize",
                "textColor",
                "backgroundColor",
                "inlineClass",
                "inlineStyle",
                "clearFormatting",
            ],
        },
        moreParagraph: {
            buttons: [
                "alignLeft",
                "alignCenter",
                "formatOLSimple",
                "alignRight",
                "alignJustify",
                "formatOL",
                "formatUL",
                "paragraphFormat",
                "paragraphStyle",
                "lineHeight",
                "outdent",
                "indent",
                "quote",
            ],
        },
        moreRich: {
            buttons: [
                "insertLink",
                "insertImage",
                "insertVideo",
                "insertTable",
                "emoticons",
                "fontAwesome",
                "specialCharacters",
                "embedly",
                "insertFile",
                "insertHR",
            ],
        },
        moreMisc: {
            buttons: [
                "undo",
                "redo",
                "fullscreen",
                "print",
                "getPDF",
                "spellChecker",
                "selectAll",
                "html",
                "help",
                "table",
            ],
            align: "right",
        },
    },
};

interface FinalEditorProps extends EditorProps {}
export const EditorComp: React.FunctionComponent<FinalEditorProps> = props => {
    const [contents, setContents] = useState<string>(props.content || "");

    useEffect(() => {
        setContents(props.content);
    }, [props.content]);

    const onHandleModel = (model: any) => {
        if (props.edit) {
            if (contents == null || contents.localeCompare(model) != 0) {
                setContents(model);
                props.onChangeContent(model);
            }
        }
    };

    if (props.edit)
        return (
            <>
                <style>
                    {`
                    .fr-box{
                        width : 100%;
                        height : 100%;
                    }
                    `}
                </style>
                <FroalaEditor
                    config={{
                        ...froalaConfig,
                        height: props.height,
                        language: "es",
                    }}
                    tag="textarea"
                    model={contents}
                    onModelChange={onHandleModel}
                />
            </>
        );
    else return <FroalaEditorView model={contents} />;
};
