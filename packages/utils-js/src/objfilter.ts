export const getConfigByKey=(obj:any, keyToFind:any):any => {
    return Object.entries(obj)
      .reduce((acc:any, [key, value]) => (key === keyToFind)
        ? acc.concat(value)
        : (typeof value === 'object')
        ? acc.concat(getConfigByKey(value, keyToFind))
        : acc
      , [])
}