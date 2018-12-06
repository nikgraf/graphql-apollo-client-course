const addId = item => {
  return { ...item, id: item._id };
};

const addIds = list => {
  return list.map(addId);
};

module.exports = {
  addId,
  addIds
};
