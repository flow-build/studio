import _isEmpty from "lodash/isEmpty";

export function useCompareJson() {
  const removedElements = [];
  const addedElements = [];

  const isJson = (json) => {
    json = typeof json !== "string" ? JSON.stringify(json) : json;

    try {
      json = JSON.parse(json);
    } catch (e) {
      return false;
    }

    if (typeof json === "object" && json !== null) {
      return true;
    }

    return false;
  };

  const onCompare = (json1, json2) => {
    if (_isEmpty(json1) || _isEmpty(json2)) {
      return {
        isSuccess: false,
        data: {
          message: "É necessário que use 2 JSONs para comparar",
        },
      };
    }

    if (!isJson(json1) || !isJson(json2)) {
      return {
        isSuccess: false,
        data: {
          message: "Insira um JSON válido",
        },
      };
    }

    removedElements.length = 0;
    object_equals(JSON.parse(json1), JSON.parse(json2), removedElements);

    addedElements.length = 0;
    object_equals(JSON.parse(json2), JSON.parse(json1), addedElements);

    return {
      isSuccess: true,
      data: {
        removedElements,
        addedElements,
      },
    };
  };

  function object_equals(x, y, testeArray, field) {
    if (x === y) return true;
    // if both x and y are null or undefined and exactly the same

    if (!(x instanceof Object) || !(y instanceof Object)) return false;
    // if they are not strictly equal, they both need to be Objects

    if (x.constructor !== y.constructor) return false;
    // they must have the exact same prototype chain, the closest we can do is
    // test there constructor.

    for (var p in x) {
      if (!x.hasOwnProperty(p)) continue;
      // other properties were tested using x.constructor === y.constructor

      if (!y.hasOwnProperty(p)) {
        //console.log('linha 36', p)
        const pre = field ? field + "." : "";
        testeArray.push(pre + p);
        //return false;
        continue;
      }
      // allows to compare x[ p ] and y[ p ] when set to undefined

      /*if ( x[ p ] === y[ p ] ) continue;*/
      // if they have the same strict value or identity then they are equal

      /*if ( typeof( x[ p ] ) !== "object" ) {
          console.log('linha 45');
          return false;
      }*/
      // Numbers, Strings, Functions, Booleans must be strictly equal

      if (typeof x[p] === "object" && typeof y[p] !== "object") {
        testeArray.push(field + "." + p);
        continue;
      }

      const fieldName = field ? field + "." + p : p;
      if (!object_equals(x[p], y[p], testeArray, fieldName)) {
        //console.log('linha 51', p)
        //return false;
        continue;
      }
      // Objects and Arrays must be tested recursively
    }

    for (p in y) if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
    // allows x[ p ] to be set to undefined

    return true;
  }

  return { onCompare };
}
