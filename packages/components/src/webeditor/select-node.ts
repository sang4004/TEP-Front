import { getAttributes, hasAttrs, getAttrs , hole, commonAttributes} from "./schema_utils";

export const select = {
    attrs: {
        contenteditable : {default : true},
        value : { default : "" },
        id : { default : "" },
    },
    content: 'block*',
    group: 'block',
    selectable: false,
    parseDOM: [ {
        tag: 'select',
        getAttrs: getAttributes
    }],
    toDOM: (node:any) => {
        return hasAttrs(node.attrs) ? [ 'select', getAttrs(node.attrs), hole] : [ 'select', hole ];
    }
}