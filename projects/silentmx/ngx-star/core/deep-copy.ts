/**
 * 对象深层拷贝
 * @author silentmx
 */
export function deepCopy(...objs: any[]): Object {
  let result = Object.create({});
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key];
        let valType = toString.call(val);
        switch (valType) {
          case "[object Object]": {
            result[key] = deepCopy(result[key], val);
            break;
          }
          case "[object Array]": {
            val.forEach((item: any) => {
              result[key] = [...(result[key] || []), deepCopy(item)];
            });
            break;
          }
          default: {
            result[key] = val;
            break;
          }
        }
      })
    }
  })
  return result;
}