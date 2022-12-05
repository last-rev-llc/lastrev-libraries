const removeEmpty = (obj) => {
  Object.keys(obj).forEach((key) => (obj[key]['en-US'] == null || obj[key]['en-US'] == undefined) && delete obj[key]);
  return obj;
};
exports.removeEmpty = removeEmpty;
