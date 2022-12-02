// Object to Query String 함수
export const makeQueryString = (data: object) => {
    let queryStringArr = Object.entries(data)
        .map(([k, v]) => {
            if (v != -1 && v != "" && v != undefined) {
                return `${k}=${v}`;
            }
            return undefined;
        })
        .filter(raw => raw);
    return queryStringArr.join("&");
};
