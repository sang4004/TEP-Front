import { getAttributes, hasAttrs, getAttrs , hole} from "./schema_utils";

export const textarea = {
    attrs: {
        style: { default: null },
        id: { default: null },
        contenteditable : {default : true},
    },
    group: 'block',
    selectable: false,
    parseDOM: [ {
        tag: 'textarea',
        getAttrs: getAttributes
    }],
    toDOM: (node:any) => {
        return hasAttrs(node.attrs) ? [ 'textarea', getAttrs(node.attrs)] : [ 'textarea' ];
    }
}