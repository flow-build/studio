import PropTypes from "prop-types";

import { ComplexTree } from "pages/compare-json/components/Tree/components/ComplexTree";
import { NormalTree } from "pages/compare-json/components/Tree/components/NormalTree";

import { needFormat } from "pages/compare-json/utils";

export const Tree = (props) => {
  let { type } = props;

  if (needFormat(type)) {
    return <ComplexTree {...props} />;
  }
  return <NormalTree {...props} />;
};

Tree.propTypes = {
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

