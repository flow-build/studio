import PropTypes from "prop-types";

import { getIndent } from "pages/history/components/comparison/utils";

export const NormalTree = (props) => {
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
};

NormalTree.propTypes = {
  name: PropTypes.string,
  line: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  type: PropTypes.oneOf(["string", "object", "null", "number", "array"]),
  showIndex: PropTypes.bool,
  needComma: PropTypes.bool,
  lineType: PropTypes.oneOf(["add", "del", "none"]),
  lastLineType: PropTypes.oneOf(["add", "del", "none"]),
  lastLine: PropTypes.number,
};
