import { getAttributes, hasAttrs, getAttrs , hole, commonAttributes} from "./schema_utils";

export const img = {
    attrs: {
        ...commonAttributes(),
    },
    group: 'block',
    content : 'inline*',
    selectable: false,
    parseDOM: [ {
        tag: 'img',
        getAttrs: getAttributes
    }],
    toDOM: (node:any) => {
        return [ 'img', getAttrs(node.attrs)]
    }
}