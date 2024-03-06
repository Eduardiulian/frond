import { io } from 'socket.io-client';
import { processGameUpdate } from './state.js';
const socket = io('http://localhost', { 'path': '/api/websocket' });
const JOIN_GAME = 'JOIN_GAME';
const GAME_UPDATE = 'GAME_UPDATE';
const INPUT = 'INPUT'
const INPUT_KEY = 'INPUT_KEY'
const SHOOT_KEY = 'SHOOT_KEY'
const GAME_OVER = 'GAME_OVER'

const connectedPromise = new Promise(resolve => {
    socket.on('connect', () => {
        console.log('Connected to server!');
        resolve();
    });
})


export const connect = onGameOver => (
    connectedPromise.then(() => {
        socket.on(GAME_UPDATE, processGameUpdate);
        socket.on(GAME_OVER, onGameOver);
        socket.on('disconnect', () => {
            console.log('Disconnected from server.');
            document.getElementById('disconnect-modal').classList.remove('hidden');
            document.getElementById('reconnect-button').onclick = () => {
                window.location.reload();
            };
        });
    })
);

export const play = username => {
    socket.emit(JOIN_GAME, username);
};

export const updateDirection = dir => {
    socket.emit(INPUT, dir);
};

export const updateMove = dir => {
    const dirAngle = Math.atan2(dir.x, dir.y)
    socket.emit(INPUT_KEY, dir, dirAngle);

};

export const ShootDirection = dir => {
    socket.emit(SHOOT_KEY, dir);

};
