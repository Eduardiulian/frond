const RENDER_DELAY = 150;

const gameUpdates = [];
let gameStart = 0;
let firstServerTimestamp = 0;
export let ratio = 0;

export function initState() {
  gameStart = 0;
  firstServerTimestamp = 0;
}

export function processGameUpdate(update) {
  if (!firstServerTimestamp) {
    firstServerTimestamp = update.t;
    gameStart = Date.now();
  }
  gameUpdates.push(update);
  const base = getBaseUpdate();
  if (base > 0) {
    gameUpdates.splice(0, base);
  }
}

function currentServerTime() {
  return firstServerTimestamp + (Date.now() - gameStart) - RENDER_DELAY;
}


function getBaseUpdate() {
  const serverTime = currentServerTime();
  for (let i = gameUpdates.length - 1; i >= 0; i--) {
    if (gameUpdates[i].t <= serverTime) {
      return i;
    }
  }
  return -1;
}


export function getCurrentState() {
  if (!firstServerTimestamp) {
    return {};
  }
  const base = getBaseUpdate();
  const serverTime = currentServerTime();
  // If base is the most recent update we have, use its state.
  // Otherwise, interpolate between its state and the state of (base + 1).
  if (base < 0 || base === gameUpdates.length - 1) {
    return gameUpdates[gameUpdates.length - 1];
  } else {
    const baseUpdate = gameUpdates[base];
    const next = gameUpdates[base + 1];
    ratio = (serverTime - baseUpdate.t) / (next.t - baseUpdate.t);
    return {
      me: interpolateObject(baseUpdate.me, next.me, ratio),
      others: interpolateObjectArray(baseUpdate.others, next.others, ratio),
      lines: baseUpdate.lines,
      remainders: baseUpdate.remainders,
      bots:baseUpdate.bots,
      usernames: baseUpdate.usernames
    };
  }
}

function interpolateObject(object1, object2, ratio) {
  if (!object2) {
    return object1;
  }

  const interpolated = {};
  Object.keys(object1).forEach(key => {
    if (key === 'coordinates') {
      interpolated[key] = interpolateObjectArray(object1[key], object2[key], ratio)
    }
    else if (key === 'x' || key === 'y') {
      interpolated[key] = object1[key] + (object2[key] - object1[key]) * ratio;
    }
    else if (key === 'color' || key === 'radius' || key === 'username') {
      interpolated[key] = object1[key];

    }
    else {
      interpolated[key] = interpolateObject(object1[key], object2[key], ratio)
    }
  });
  return interpolated;
}

function interpolateObjectArray(objects1, objects2, ratio) {

  let arr = [];
  for (let i = 0; i < objects1.length; i++) {
    arr.push(interpolateObject(objects1[i], objects2[i], ratio))
  }
  return arr;
}
