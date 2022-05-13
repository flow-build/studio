export const getIndent = (level) => {
  if (level === 1) {
    return { textIndent: "20px" };
  }
  return { textIndent: `${level * 20}px` };
};
