import React, { useState } from "react";
import { useSelector } from "react-redux";

import _isEqual from "lodash/isEqual";
import _isEmpty from "lodash/isEmpty";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import "./teste.css";
import EmptyContent from "./components/EmptyContent/EmptyContent";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const isArray = (item) => {
  if (item === "array") {
    return true;
  }
  return Object.prototype.toString.call(item) === "[object Array]";
};

const isObject = (item) => {
  return Object.prototype.toString.call(item) === "[object Object]";
};

const needFormat = (type) => {
  return type === "array" || type === "object";
};

const getIndent = (level) => {
  if (level === 1) {
    return { textIndent: "20px" };
  }
  return { textIndent: `${level * 20}px` };
};

const getType = (item) => {
  let t = Object.prototype.toString.call(item);
  let match = /(?!\[).+(?=\])/g;
  t = t.match(match)[0].split(" ")[1];
  return t.toLowerCase();
};

const isComplexType = (param) => {
  return isObject(param) || isArray(param);
};

const isTheSametype = (a, b) => {
  return (
    Object.prototype.toString.call(a) === Object.prototype.toString.call(b)
  );
};

const mergeData = (_old, _new, type) => {
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
    return from.filter((fromElem) => !to.some((toElem) => toElem === fromElem));
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

    // console.log({ deletedKeys });
    // console.log({ addedKeys });

    if (type === "del") {
      // push deleted keys
      deletedKeys.forEach((key, index) => {
        // console.log("delete array", deletedKeys);
        let needComma = true;
        if (
          keptKeys.length === 0 &&
          addedKeys.length === 0 &&
          index === deletedKeys.length - 1
        ) {
          needComma = false;
        }
        target.push(parseValue(key, oldJson[key], showIndex, needComma, "del"));
      });
    }

    // The core function: compare
    keptKeys.forEach((key, index) => {
      let needComma = true;
      if (addedKeys.length === 0 && index === keptKeys.length - 1) {
        needComma = false;
      }

      if (_isEqual(oldJson[key], newJson[key])) {
        // console.log("isEqual");
        // console.log({ key });
        target.push(
          parseValue(key, newJson[key], showIndex, needComma, "none")
        );
      } else if (isTheSametype(oldJson[key], newJson[key])) {
        // console.log("isTheSameType");
        // console.log({ key });
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
            target.push(parseValue(key, oldJson[key], showIndex, true, "none"));
          }

          if (type === "add") {
            target.push(
              parseValue(key, newJson[key], showIndex, needComma, "none")
            );
          }
        }
      } else {
        // console.log("else");
        // console.log({ key });
        if (type === "del") {
          target.push(parseValue(key, oldJson[key], showIndex, true, "del"));
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
      console.log("del");
      target.push(parseValue("", "", showIndex, false, "empty"));
    }

    if (type === "add" && _isEmpty(addedKeys) && !_isEmpty(deletedKeys)) {
      console.log("add");
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
};

const ComplexTree = (props) => {
  let {
    name,
    value,
    type,
    line,
    showIndex,
    needComma,
    level = 1,
    lineType,
    lastLineType,
    lastLine = null,
  } = props;

  let [visiable, setVisiable] = useState(true);

  if (lineType === "empty") {
    return (
      <p className={`c-json-p`} style={getIndent(level)}>
        <span className="c-json-mark">{line}</span>
        <span className={`c-of-${lineType}`}></span>
        <span className="c-json-content">&nbsp;</span>
      </p>
    );
  }

  return (
    <div className="c-json-line">
      <p
        className={`c-json-p c-line-${lineType}`}
        onClick={() => setVisiable(!visiable)}
        style={getIndent(level)}
      >
        <span className="c-json-mark">{line}</span>
        <span className={`c-of-${lineType}`}></span>
        <span className="c-json-content">
          {showIndex && <span className="c-json-key">{name}: </span>}
          <span className="c-json-pt">{isArray(type) ? "[" : "{"}</span>
        </span>
        {!visiable && (
          <span className="c-json-pt">
            {isArray(type) ? "...]" : "...}"}
            {needComma ? "," : ""}
          </span>
        )}
      </p>
      <div style={{ display: visiable ? "block" : "none" }}>
        {value.map((item, index) => (
          <Tree key={index} level={level + 1} {...item} />
        ))}

        <p
          className={`c-json-feet c-json-p c-line-${lineType}`}
          style={getIndent(level)}
        >
          {lastLine && <span className="c-json-mark">{lastLine}</span>}
          {lastLineType && <span className={`c-of-${lastLineType}`}></span>}
          <span className="c-json-pt">
            {isArray(type) ? "]" : "}"}
            {needComma ? "," : ""}
          </span>
        </p>
      </div>
    </div>
  );
};

function NormalTree(props) {
  let {
    name,
    value,
    line,
    showIndex,
    type,
    lineType,
    needComma,
    level = 1,
  } = props;

  if (lineType === "empty") {
    return (
      <p className={`c-json-p`} style={getIndent(level)}>
        <span className="c-json-mark">{line}</span>
        <span className={`c-of-${lineType}`}></span>
        <span className="c-json-content">&nbsp;</span>
      </p>
    );
  }

  return (
    <p className={`c-json-p c-line-${lineType}`} style={getIndent(level)}>
      <span className="c-json-mark">{line}</span>
      <span className={`c-of-${lineType}`}></span>
      <span className="c-json-content">
        {showIndex && <span className="c-json-key">{name}: </span>}
        <span className={`c-json-${type}`}>{value}</span>
        <span className="c-json-comma">{needComma ? "," : ""}</span>
      </span>
    </p>
  );
}

function Tree(props) {
  let { type } = props;

  if (needFormat(type)) {
    return <ComplexTree {...props} />;
  }
  return <NormalTree {...props} />;
}

const CompareJson = () => {
  const compare = useSelector((state) => state.compare);

  if (_isEmpty(compare?.oldJson) || _isEmpty(compare?.newJson)) {
    return <EmptyContent />;
  }

  const dataOld = mergeData(
    JSON.parse(compare?.oldJson),
    JSON.parse(compare?.newJson),
    "del"
  );
  const dataNew = mergeData(
    JSON.parse(compare?.oldJson),
    JSON.parse(compare?.newJson),
    "add"
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container columns={12}>
        <Grid item xs={6}>
          <Item>
            {dataOld.map((item, index) => (
              <Tree key={index} {...item} />
            ))}
          </Item>
        </Grid>

        <Grid item xs={6}>
          <Item>
            {dataNew.map((item, index) => (
              <Tree key={index} {...item} />
            ))}
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompareJson;
