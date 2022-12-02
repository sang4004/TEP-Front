enum TreeViewFilteredKeys {
    project = "project",
    discipline = "discipline",
    cate = "cate",
    docu = "docu",
}
export type TreeViewFiltered = {
    [key in TreeViewFilteredKeys]?: { visibile: boolean; no: number[] };
};

export type AuthDataType = {
    _proj: number[];
    _projtype: number[];
    _dcl: number[];
    _cate: number[];
    _docu: number[];
};

export type SelectItme = {
    selectType: string;
    selectedNo: number;
};
