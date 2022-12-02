export const makeQueryString = (dataState: any): string[] => {
    let filter: any = dataState.filter;
    let sort: any[] = dataState.sort;
    let skip: number = dataState.skip;
    let queryStringArr: string[] = [];
    if (filter) {
        let target_field = filter.filters[0].filters[0].field;
        queryStringArr.push(`filter=${target_field}`);
    }
    if (sort) {
        queryStringArr.push(`sort=${sort[0].field}`);
    }

    if (skip != undefined) {
        queryStringArr.push(`skip=${skip}`);
    }
    return queryStringArr;
};

export const assignDataState = (dataState: any, historyDataState: any) => {
    let _dataState = Object.assign({}, dataState);
    let filter: any = historyDataState.filter;
    let sort: any = historyDataState.sort;
    if (filter) {
        Object.assign(_dataState, { filter: historyDataState.filter });
    }
    if (sort) {
        Object.assign(_dataState, { sort: historyDataState.sort });
    }
    return _dataState;
};

export const replaceHistory = (queryStringArr: string[], state: any): void => {
    if (queryStringArr.length) {
        let pathName = location.pathname;
        history.replaceState(
            { dataState: state },
            "",
            `${pathName}?${queryStringArr.join("&")}`
        );
    }
};

export const pushHistory = (queryStringArr: string[], state: any): void => {
    if (queryStringArr.length) {
        let pathName = location.pathname;
        history.pushState(
            { dataState: state },
            "",
            `${pathName}?${queryStringArr.join("&")}`
        );
    }
};
