import { authorityState } from "./reducer/authority";

export const getAuthority = (data: authorityState, _docu_no_list: number | number[]) => {
    let docu_no_list: number[] = [];
    // let authSelector = useSelector((state : reducerState)=> state.authority);
    if (typeof _docu_no_list == "number") {
        docu_no_list = [_docu_no_list];
    }
    let count = docu_no_list.length;
    var idx = 0;
    let read = 0;
    let write = 0;
    let down = 0;
    let del = 0;
    for (; idx < count; idx++) {
        let find_docu = data.docu_authority.find(raw => raw.docu_no == docu_no_list[idx]);
        if (find_docu) {
            if (find_docu.read == 1) read += 1;
            if (find_docu.write == 1) write += 1;
            if (find_docu.download == 1) down += 1;
            if (find_docu.delete == 1) del += 1;
        }
    }
    return {
        read: read == count,
        write: write == count,
        down: down == count,
        del: del == count,
    };
};
