const getAttributes = (dom:any) => {
    const result = {};
    let attributes = dom.attributes, attr;
    for (let i = 0; i < attributes.length; i++) {
        attr = attributes[i];
        result[attr.name] = attr.value;
    }

    return result;
};

const commonAttributes = () => {
    return {
        style: { default: null },
        class: { default: null },
        id: { default: null },
        disabled : {default : false}
    };
};

const hasAttrs = (attrs:any, exclude?:any) => {
    for (let attr in attrs) {
        if (attr && attrs[attr] !== null && attr !== exclude) {
            return true;
        }
    }
    return false;
};

const getAttrs = (attrs:any, exclude?:any) => {
    const result = {};
    for (let attr in attrs) {
        if (attr && attrs[attr] !== null && attr !== exclude) {
            result[attr] = attrs[attr];
        }
    }
    return result;
};

const tagMark = (tag:any) => {
    return {
        [tag]: {
            name: tag,
            inclusive: true,
            parseDOM: [ { tag: tag } ],
            toDOM: () => [ tag, hole ]
        }
    };
};

const hole = 0;

export {
    getAttributes, commonAttributes, hasAttrs, getAttrs, tagMark, hole
};