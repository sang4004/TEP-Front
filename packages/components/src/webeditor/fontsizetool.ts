import { EditorToolsSettings, EditorTools } from "@progress/kendo-react-editor";
const { createStyleDropDownList } = EditorTools;

const customFontsizeSettings = {
    style : "font-size",
    defaultItem : { text : "Font Size" , value : ""},
    items : [
        {text : "8pt", value : "10px"},
        {text : "9pt", value : "11px"},
        {text : "10pt", value : "12px"},
        {text : "11pt", value : "13px"},
        {text : "12pt", value : "14px"},
        {text : "13pt", value : "15px"},
        {text : "14pt", value : "16px"},
        {text : "15pt", value : "17px"},
        {text : "16pt", value : "18px"},
        {text : "17pt", value : "19px"},
        {text : "18pt", value : "20px"},
        {text : "19pt", value : "21px"},
        {text : "20pt", value : "22px"},
    ]
};

const MyFontSizeTool = createStyleDropDownList(customFontsizeSettings);

export default MyFontSizeTool;