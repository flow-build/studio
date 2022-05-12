export const isArray = (item) => {
  if (item === "array") {
    return true;
  }
  return Object.prototype.toString.call(item) === "[object Array]";
};
