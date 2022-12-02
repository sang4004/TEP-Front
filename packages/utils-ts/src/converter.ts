import { getLang, getvaluefromobj } from "utils_js/lib";
import moment from "moment";

export const data2Table = (data : Object[])=>{
    var datas : Object[] = [];
    var column : Object[] = [];

    if(data.length > 0){
        for(var key of Object.keys(data[0])){
            column.push({
                title : key,
                dataIndex : key.toLowerCase(),
                key : key.toLowerCase()
            });
        }
        for(var i=0;i<data.length;i++){
            data[i] = Object.assign(data[i], {key : i.toString()});
            datas.push(data[i]);
        }
    }
    return {
        column : column,
        data : datas,
    }
}

export const table2data = (document : Document, head : string[], body : object[], option_key : string="") : object[] =>{
    let result : object[] = [];
    let idx = 0;
    for(var b of body){
        let o = {};
        for(var i=0;i<head.length;i++){
            let value = getvaluefromobj(document, b , head[i], idx.toString() + option_key);
            if(value){
                Object.assign(o, { [head[i]] : value });
            }
        }
        result.push(o);
        idx += 1;
    }
    return result;
}

export const objects2tabledata = (objList : object[], orderList ?: string[])=>{
    let _list = [];
    if(objList.length > 0){
        let keys = Object.keys(objList[0]);
        for(var data of objList){
            let _obj = {};
            if(orderList && orderList.length > 0){
                for(var order of orderList){
                    Object.assign(_obj, { [ getLang( order ) ] : data[order] });
                }
            } else {
                Object.values(data).map((raw,idx)=>{
                    if(getLang( keys[idx] ) != keys[idx])
                        Object.assign(_obj, { [getLang( keys[idx] )] : raw });
                });
            }
            _list.push(_obj);
        }
    }
    return _list;
}

export const date2ago = (time : string)=>{
    let diffMin = moment().diff(moment(time), "minutes");
    let diffDay = moment().diff(moment(time), "days");
    let diffHour = moment().diff(moment(time), "hours");
    if(diffDay > 0){
        return diffDay + "일 전";
    } else if(diffHour > 0){
        return diffHour + "시간 전";
    } else if(diffMin > 0){
        return diffMin + "분 전"
    } else {
        return "방금 전"
    }
}