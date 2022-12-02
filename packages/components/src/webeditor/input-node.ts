import { getAttributes, hasAttrs, getAttrs , hole} from "./schema_utils";

export const input = {
    attrs: {
        value: { default: "" },
        style: { default: null },
        contenteditable : {default : true},
        type : {default : null},
        checked : {default : false},
        id : {default : null},
        placeholder : {default : ""}
    },
    group:"block",
    content : "inline*",
    selectable: false,
    parseDOM: [ {
        tag: 'input',
        getAttrs: (dom:any) => ({
            value : dom.getAttribute('value'),
            style: dom.getAttribute('style'),
            contenteditable : dom.getAttribute('contenteditable'),
            type : dom.getAttribute('type'),
            checked : dom.getAttribute('checked'),
            id : dom.getAttribute('id'),
            placeholder : dom.getAttribute('placeholder')
        })
    } ],
    toDOM: (node:any) => {
        return [ 'input', getAttrs(node.attrs) ];
    }
}