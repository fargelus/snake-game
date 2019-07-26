export function deepCopyObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function isCoordsAreEqual(firstCoords, secondCoords) {
  return firstCoords.x === secondCoords.x
    && firstCoords.y === secondCoords.y;
}
