export const getvaluefromid = (document : any, id : any)=>{
    let elem = document.getElementById(id);
    if(elem.innerText)
        return elem.innerText;
    return;
}

export const getvaluefromobj = (document: any, obj:any, key:any, option_key:string="")=>{
    let elem = document.getElementById(obj[key] + option_key);
    if(elem.value)
        return elem.value;
    return null;
}

export const getcheckfromid = (document:any, id:any)=>{
    let elem = document.getElementById(id);
    if(elem.checked)
        return elem.checked;
    return null;
}