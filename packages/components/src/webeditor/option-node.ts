import { getAttributes, hasAttrs, getAttrs , hole} from "./schema_utils";

export const option = {
    attrs: {
        value: { default: null },
        style: { default: null },
        selected : {default : null},
        contenteditable : {default : true},
    },
    content: 'block*',
    group: 'block',
    selectable: false,
    parseDOM: [ {
        tag: 'option',
        getAttrs: getAttributes
    } ],
    toDOM: (node:any) => {
        return hasAttrs(node.attrs) ? [ 'option', getAttrs(node.attrs), hole] : [ 'option', hole ];
    }
}