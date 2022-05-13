import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";

import { isObject, isArray, getType } from "pages/CompareJson/utils";

export function useCompare() {
  const compare = useSelector((state) => state.comparePage);

  const isComplexType = useCallback((param) => {
    return isObject(param) || isArray(param);
  }, []);

  const isTheSametype = useCallback((a, b) => {
    return (
      Object.prototype.toString.call(a) === Object.prototype.toString.call(b)
    );
  }, []);

  const mergeData = useCallback(
    (_old, _new, type) => {
      // finally result
      let result = [];
      // each line No.
      let lineLevel = 1;

      // convert array or object to Array<object> [{}]
      const convertObject = (param, lineType) => {
        let list = [];
        if (isComplexType(param)) {
          let showIndex = getType(param) === "object";
          let keys = Object.keys(param);
          let length = keys.length;
          keys.forEach((key, index) => {
            let type = getType(param[key]);
            list.push({
              name: key,
              line: lineLevel++,
              value: convertObject(param[key], lineType),
              type: type,
              showIndex: showIndex,
              needComma: length !== index + 1,
              lineType: lineType,
              lastLineType: lineType,
              lastLine: isComplexType(param[key]) ? lineLevel++ : null,
            });
          });
          return list;
        } else {
          switch (getType(param)) {
            case "number":
            case "boolean":
            case "regexp":
              return param.toString();
            case "null":
              return "null";
            case "undefined":
              return "undefined";
            case "function":
              return " ƒ() {...}";
            default:
              return `"${param.toString()}"`;
          }
        }
      };

      // return parsed data
      const parseValue = (key, value, showIndex, needComma, lineType) => {
        return {
          name: key,
          line: lineLevel++,
          value: convertObject(value, lineType),
          type: getType(value),
          showIndex: showIndex,
          needComma: needComma,
          lineType: lineType,
          lastLineType: lineType,
          lastLine: isComplexType(value) ? lineLevel++ : null,
        };
      };

      const findRemovedKeys = (from = [], to = []) => {
        return from.filter(
          (fromElem) => !to.some((toElem) => toElem === fromElem)
        );
      };

      // merge two vars to target,target type Array<object>[{}]
      const parseData = (oldJson, newJson, target) => {
        let oldJsonKeys = Object.keys(oldJson);
        let newJsonKeys = Object.keys(newJson);
        let showIndex = isObject(newJson);

        // deleted keys
        let deletedKeys = findRemovedKeys(oldJsonKeys, newJsonKeys);

        // not removed keys
        let keptKeys = oldJsonKeys.filter((ak) =>
          newJsonKeys.some((bk) => bk === ak)
        );

        // new added keys
        let addedKeys = findRemovedKeys(newJsonKeys, oldJsonKeys);

        if (type === "del") {
          // push deleted keys
          deletedKeys.forEach((key, index) => {
            let needComma = true;
            if (
              keptKeys.length === 0 &&
              addedKeys.length === 0 &&
              index === deletedKeys.length - 1
            ) {
              needComma = false;
            }
            target.push(
              parseValue(key, oldJson[key], showIndex, needComma, "del")
            );
          });
        }

        // The core function: compare
        keptKeys.forEach((key, index) => {
          let needComma = true;
          if (addedKeys.length === 0 && index === keptKeys.length - 1) {
            needComma = false;
          }

          if (_isEqual(oldJson[key], newJson[key])) {
            target.push(
              parseValue(key, newJson[key], showIndex, needComma, "none")
            );
          } else if (isTheSametype(oldJson[key], newJson[key])) {
            if (isComplexType(newJson[key])) {
              let _target = parseValue(
                key,
                isArray(oldJson[key]) ? [] : {},
                showIndex,
                needComma,
                "none"
              );
              target.push(_target);
              // back one step
              lineLevel -= 1;
              // go inside
              parseData(oldJson[key], newJson[key], _target.value);
              // rewrite lastline
              _target.lastLine = lineLevel++;
            } else {
              if (type === "del") {
                target.push(
                  parseValue(key, oldJson[key], showIndex, true, "none")
                );
              }

              if (type === "add") {
                target.push(
                  parseValue(key, newJson[key], showIndex, needComma, "none")
                );
              }
            }
          } else {
            if (type === "del") {
              target.push(
                parseValue(key, oldJson[key], showIndex, true, "del")
              );
            }

            if (type === "add") {
              target.push(
                parseValue(key, newJson[key], showIndex, needComma, "add")
              );
            }
          }
        });

        if (type === "add") {
          // push new keys
          addedKeys.forEach((key, index) => {
            target.push(
              parseValue(
                key,
                newJson[key],
                showIndex,
                addedKeys.length !== index + 1,
                "add"
              )
            );
          });
        }

        if (type === "del" && _isEmpty(deletedKeys) && !_isEmpty(addedKeys)) {
          target.push(parseValue("", "", showIndex, false, "empty"));
        }

        if (type === "add" && _isEmpty(addedKeys) && !_isEmpty(deletedKeys)) {
          target.push(parseValue("", "", showIndex, false, "empty"));
        }
      };

      if (isTheSametype(_old, _new) && isComplexType(_new)) {
        parseData(_old, _new, result);
      } else {
        if (_old === _new) {
          result.push(parseValue(0, _new, false, false, "none"));
        } else {
          if (type === "del") {
            result.push(parseValue(0, _old, false, true, "del"));
          }

          if (type === "add") {
            result.push(parseValue(1, _new, false, false, "add"));
          }
        }
      }
      return result;
    },
    [isComplexType, isTheSametype]
  );

  const jsonDiff = useMemo(() => {
    let previous = [];
    let current = [];

    if (compare?.oldJson) {
      previous = mergeData(
        JSON.parse(compare?.oldJson),
        JSON.parse(compare?.newJson ?? compare?.oldJson),
        "del"
      );
    }

    if (compare?.newJson) {
      current = mergeData(
        JSON.parse(compare?.oldJson ?? compare?.newJson),
        JSON.parse(compare?.newJson),
        "add"
      );
    }

    return { previous, current };
  }, [mergeData, compare?.oldJson, compare?.newJson]);

  return { jsonDiff };
}
