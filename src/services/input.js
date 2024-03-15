import { updateDirection, updateMove, ShootDirection, SetProtected } from './networking.js';


const inputs = {
    keyDownActions: {
        'ArrowLeft': { x: -1.5, y: 0 },
        'ArrowRight': { x: 1.5, y: 0 },
        'ArrowUp': { y: -1.5, x: 0 },
        'ArrowDown': { y: 1.5, x: 0 },

        'UpRight': { y: -1.5, x: 1.5 },
        'UpLeft': { y: -1.5, x: -1.5 },
        'DownRight': { y: 1.5, x: 1.5 },
        'DownLeft': { y: 1.5, x: -1.5 },
    }
}
let keys = {
    'ArrowLeft': false,
    'ArrowRight': false,
    'ArrowUp': false,
    'ArrowDown': false,
}
function onkeydownInput(e) {
    if (e.code === "Space") {
        SetProtected()
    }
    else {
        keys[e.key] = true
        keydownHandler(e)
    }

}

function onkeyupInput(e) {
    keys[e.key] = false

}

function keydownHandler(e) {
    let vals;
    if (keys['ArrowUp'] && keys['ArrowRight']) {

        vals = inputs.keyDownActions['UpRight']
    } else if (keys['ArrowUp'] && keys['ArrowLeft']) {
        vals = inputs.keyDownActions['UpLeft']
    }
    else if (keys['ArrowDown'] && keys['ArrowLeft']) {
        vals = inputs.keyDownActions['DownLeft']
    }
    else if (keys['ArrowDown'] && keys['ArrowRight']) {
        vals = inputs.keyDownActions['DownRight']
    }
    else {
        vals = inputs.keyDownActions[e.key];
    }
    if (vals) {
        updateMove(vals);
    }
}

function onMouseInput(e) {
    const dir = { x: e.clientX, y: e.clientY };
    updateDirection(dir);
}

function onClickInput(e) {
    const dir = Math.atan2(e.clientX - window.innerWidth / 2, window.innerHeight / 2 - e.clientY)
    ShootDirection(dir);
}


export function startCapturingInput() {
    window.addEventListener('mousemove', onMouseInput);
    window.addEventListener('keydown', onkeydownInput);
    window.addEventListener('keyup', onkeyupInput);
    window.addEventListener('click', onClickInput);
}

export function stopCapturingInput() {
    window.removeEventListener('mousemove', onMouseInput);
    window.removeEventListener('keydown', onkeydownInput);
    window.removeEventListener('keyup', onkeyupInput);
    window.removeEventListener('click', onClickInput);
}


