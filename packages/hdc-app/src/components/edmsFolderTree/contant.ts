enum TreeViewFilteredKeys {
    project = "project",
}
export type TreeViewFiltered = {
    [key in TreeViewFilteredKeys]?: { visibile: boolean; no: number[] };
};
export type SelectItme = {
    selectType: string;
    selectedNo: number;
    selectedFolder: string;
};
