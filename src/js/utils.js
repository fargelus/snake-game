export function deepCopyObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function isCoordsAreEqual(firstCoords, secondCoords) {
  return firstCoords.x === secondCoords.x
    && firstCoords.y === secondCoords.y;
}

export function resetObjectVals(obj, defaultValue) {
  const resetObj = {};
  Object.keys(obj).forEach(key => resetObj[key] = defaultValue);
  return resetObj;
}

export const MOVE_DIRECTION = {
  top: 0,
  right: 1,
  bottom: 2,
  left: 3,
};

export const OPPOSITE_DIRECTION = makeOppositeDirection();

function makeOppositeDirection() {
  const { left, top, right, bottom } = MOVE_DIRECTION;
  const retDirection = {};
  retDirection[left] = right;
  retDirection[top] = bottom;
  retDirection[right] = left;
  retDirection[bottom] = top;

  return retDirection;
}
