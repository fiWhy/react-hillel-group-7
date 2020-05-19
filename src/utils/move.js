export default (arr, fromIndex, toIndex) => {
  const newArr = [...arr];
  const movedItem = newArr.splice(fromIndex, 1)[0];
  newArr.splice(toIndex, 0, movedItem);
  return newArr;
};
