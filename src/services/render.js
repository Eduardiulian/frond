
import { getCurrentState, ratio } from './state.js';

const MAP_SIZE = 3000;
let canvas;
let context;

function setCanvasDimensions() {
    const scaleRatio = Math.max(1, 800 / window.innerWidth);
    canvas.width = scaleRatio * window.innerWidth;
    canvas.height = scaleRatio * window.innerHeight;
}



let animationFrameRequestId;

function render() {
    const { me, others, lines, remainders, bots, usernames } = getCurrentState();
    if (me) {
        renderBackground(me.centroid.x, me.centroid.y);
        // Draw boundaries
        renderboundaries(me)
        //draw leaderboard


        renderPlayer(me);
        others.forEach(other => renderPlayers(me, other));

        //draw bots 
        bots.forEach(bot => renderBots(me, bot));

        lines.forEach(line => renderLine(me, line));

        remainders.forEach(remainder => rendeRemainder(me, remainder));

        renderLeaderboard(usernames)

    }
    animationFrameRequestId = requestAnimationFrame(render);
}

function rendeRemainder(me, remainder) {
    const canvasX = canvas.width / 2 - me.centroid.x
    const canvasY = canvas.height / 2 - me.centroid.y

    // Draw ship
    context.save();
    context.translate(canvasX, canvasY);

    context.beginPath();
    context.moveTo(remainder.coordinates[0].x, remainder.coordinates[0].y);

    for (let i = 1; i < remainder.coordinates.length; i++) {
        context.lineTo(remainder.coordinates[i].x, remainder.coordinates[i].y);
    }

    context.closePath();
    context.strokeStyle = 'black';
    context.lineWidth = 4;
    context.stroke();
    context.fillStyle = remainder.color;
    context.fill()

    context.restore();

}

function renderLine(me, line) {
    const canvasX = canvas.width / 2 - me.centroid.x
    const canvasY = canvas.height / 2 - me.centroid.y

    context.save();
    context.translate(canvasX, canvasY);
    //context.rotate(line.angle)
    context.beginPath();
    context.moveTo(line.x1, line.y1)
    context.lineTo(line.x2, line.y2)
    context.closePath();
    context.strokeStyle = line.color;
    context.lineWidth = 2;
    context.stroke();

    context.restore();
}


function renderPlayer(player) {
    const canvasX = canvas.width / 2 - player.centroid.x
    const canvasY = canvas.height / 2 - player.centroid.y

    // Draw ship
    context.save();
    context.translate(canvasX, canvasY);
    //context.beginPath();
    //console.log('player', me.centroid)
    //context.arc(0, 0, 40, 0, 2 * Math.PI);
    //context.fillStyle = 'blue';
    //context.fill();
    //context.closePath();

    context.beginPath();
    context.shadowColor = player.color;
    context.shadowBlur = 15;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.moveTo(player.coordinates[0].x, player.coordinates[0].y);

    for (let i = 1; i < player.coordinates.length; i++) {
        context.lineTo(player.coordinates[i].x, player.coordinates[i].y);
    }

    context.closePath();
    //
    if (player.protected) {
        context.shadowColor = 'hsla(183, 100%, 47%, 1)';
        context.shadowBlur = 100;
    }
    context.strokeStyle = 'black';;
    context.lineWidth = 4;
    context.stroke();
    context.fillStyle = player.color;
    context.fill()


    //for (let i = 0; i < player.coordinates.length; i++) {
    //    context.font = "20px serif";
    //    context.strokeStyle = 'black';
    //    context.strokeText(`${i}`
    //        , player.coordinates[i].x, player.coordinates[i].y);
    //}

    //context.beginPath();
    //context.arc(player.centroid.x, player.centroid.y, player.radius, 0, 2 * Math.PI);
    //context.strokeStyle = 'blue';
    //context.lineWidth = 2;
    //context.stroke();
    //context.closePath();

    context.restore();
}

function renderPlayers(me, player) {
    const canvasX = canvas.width / 2 - me.centroid.x
    const canvasY = canvas.height / 2 - me.centroid.y

    // Draw ship
    context.save();
    context.translate(canvasX, canvasY);

    context.beginPath();
    context.shadowColor = player.color;
    context.shadowBlur = 15;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.moveTo(player.coordinates[0].x, player.coordinates[0].y);
    for (let i = 1; i < player.coordinates.length; i++) {
        context.lineTo(player.coordinates[i].x, player.coordinates[i].y);
    }

    context.closePath();
    context.strokeStyle = 'black';
    context.lineWidth = 4;
    context.stroke();
    context.fillStyle = player.color;
    context.fill()

    //draw username
    drawUsername(player)


    //for (let i = 0; i < player.coordinates.length; i++) {
    //    context.font = "20px serif";
    //    context.strokeStyle = 'black';
    //    context.strokeText(`${i}`
    //        , player.coordinates[i].x, player.coordinates[i].y);
    //}


    //context.beginPath();
    //context.arc(player.centroid.x, player.centroid.y, player.radius, 0, 2 * Math.PI);
    //context.strokeStyle = 'blue';
    //context.lineWidth = 2;
    //context.stroke();
    //context.closePath();

    context.restore();
}

function renderBots(me, bot) {
    const canvasX = canvas.width / 2 - me.centroid.x
    const canvasY = canvas.height / 2 - me.centroid.y

    // Draw ship
    context.save();
    context.translate(canvasX, canvasY);

    context.beginPath();
    context.shadowColor = bot.color;
    context.shadowBlur = 15;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.moveTo(bot.coordinates[0].x, bot.coordinates[0].y);
    for (let i = 1; i < bot.coordinates.length; i++) {
        context.lineTo(bot.coordinates[i].x, bot.coordinates[i].y);
    }

    context.closePath();
    context.strokeStyle = 'black';
    context.lineWidth = 4;
    context.stroke();
    context.fillStyle = bot.color;
    context.fill()

    context.restore();
}


//-------------

function renderboundaries(me) {
    context.strokeStyle = 'black';
    context.lineWidth = 2.50;
    context.strokeRect(canvas.width / 2 - me.centroid.x, canvas.height / 2 - me.centroid.y, MAP_SIZE, MAP_SIZE);
}

function renderBackground(x, y) {
    //const backgroundX = MAP_SIZE / 2 - x + canvas.width / 2;
    //const backgroundY = MAP_SIZE / 2 - y + canvas.height / 2;
    //const backgroundGradient = context.createRadialGradient(
    //    backgroundX,
    //    backgroundY,
    //    MAP_SIZE / 10,
    //    backgroundX,
    //    backgroundY,
    //    MAP_SIZE / 2,
    //);
    //backgroundGradient.addColorStop(0, '#f9f5ff');
    //backgroundGradient.addColorStop(1, '#cda4de');
    //context.fillStyle = backgroundGradient;
    //context.fillRect(0, 0, canvas.width, canvas.height);

    // 2 back
    //context.fillStyle = '#f2fbff';
    //context.fillRect(0, 0, canvas.width, canvas.height);
    //context.lineWidth = 1;
    //context.strokeStyle = '#000000';
    //context.globalAlpha = 0.15;
    //context.beginPath();
    //
    //for (let i = -x; i < canvas.width; i += canvas.width / 48) {
    //    context.moveTo(i, 0);
    //    context.lineTo(i, canvas.height);
    //}
    //
    //for (let j = -y; j < canvas.height; j += canvas.height / 24) {
    //    context.moveTo(0, j);
    //    context.lineTo(canvas.width, j);
    //}
    //
    //context.stroke();
    //context.globalAlpha = 1;
    //context.closePath();
    // 3 back
    //draw back color
    //context.fillStyle = '#171717';
    // out of boundaries fill color
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width / 2 - x, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height / 2 - y);
    context.fillRect(canvas.width / 2 - x + MAP_SIZE, canvas.height / 2 - y, canvas.width / 2 + x - MAP_SIZE, canvas.height / 2 + y);
    context.fillRect(canvas.width / 2 - x, canvas.height / 2 - y + MAP_SIZE, MAP_SIZE, canvas.height / 2 + y - MAP_SIZE);
    //
    const gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, Math.min(canvas.width / 2, canvas.height / 2));

    gradient.addColorStop(0, 'rgba(36,0,0,1)');
    gradient.addColorStop(0, 'rgba(0,174,203,1)');
    gradient.addColorStop(1, 'rgba(0,151,203,0.734');

    context.fillStyle = gradient;
    context.fillRect(canvas.width / 2 - x, canvas.height / 2 - y, MAP_SIZE, MAP_SIZE);
    //draw lines
    context.lineWidth = 1;
    context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    //context.globalAlpha = 1;
    context.save();
    context.translate(canvas.width / 2 - x, canvas.height / 2 - y);
    context.beginPath();
    for (let i = 0; i < MAP_SIZE; i += MAP_SIZE / 32) {
        context.moveTo(i, 0);
        context.lineTo(i, MAP_SIZE);
    }

    for (let j = 0; j < MAP_SIZE; j += MAP_SIZE / 32) {
        context.moveTo(0, j);
        context.lineTo(MAP_SIZE, j);
    }

    context.stroke();
    //context.globalAlpha = 1;
    context.closePath();
    context.restore();
    //

}

function renderLeaderboard(usernames) {
    // Позиция и размеры таблицы
    const MarignX = 10;
    const MarignY = 10;
    const tableWidth = 145;
    const tableHeight = 260;
    const x = 75;
    let y = 23;
    const rowHeight = 22;
    //draw frame
    context.save();
    context.translate(canvas.width - MarignX - tableWidth, MarignY);
    context.fillStyle = 'hsla(0, 0%, 0%, 0.5)';
    context.fillRect(0, 0, tableWidth, tableHeight);
    // draw Leaderboard text
    context.fillStyle = 'white';
    context.textAlign = "center";
    context.font = 'bold 20px Arial, sans-serif';
    context.fillText("Leaderboard", x, y);
    //draw username test
    context.fillStyle = '#F5F5F5'
    context.font = 'bold 15px Arial, sans-serif';
    // Отрисовка каждого пользователя в таблице
    usernames.forEach((username, index) => context.fillText(`${index + 1}. ${username}`, x, y + (index + 1) * rowHeight));

    context.restore();
};

function drawUsername(player) {
    context.save();
    context.textAlign = "center";
    context.font = 'bold 20px Arial, sans-serif';
    context.fillStyle = 'white';
    context.strokeStyle = 'black';
    context.lineWidth = 0.5
    context.fillText(`${player.username}`, player.centroid.x, player.centroid.y - player.radius - 12);
    context.strokeText(`${player.username}`, player.centroid.x, player.centroid.y - player.radius - 12);
    context.restore();

}

function renderMainMenu() {
    animationFrameRequestId = requestAnimationFrame(renderMainMenu);
}

export function startRendering(canvasRef) {
    canvas = canvasRef.current;
    context = canvas.getContext("2d");
    setCanvasDimensions()
    window.addEventListener('resize', setCanvasDimensions);

    cancelAnimationFrame(animationFrameRequestId);
    animationFrameRequestId = requestAnimationFrame(render);
}


export function stopRendering() {
    cancelAnimationFrame(animationFrameRequestId);
    animationFrameRequestId = requestAnimationFrame(renderMainMenu);
}