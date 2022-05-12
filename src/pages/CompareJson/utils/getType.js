export const getType = (item) => {
  let t = Object.prototype.toString.call(item);
  let match = /(?!\[).+(?=\])/g;
  t = t.match(match)[0].split(" ")[1];
  return t.toLowerCase();
};
