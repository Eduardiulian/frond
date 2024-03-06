import { useRef, useContext, useEffect } from "react";
import { connect, play } from "../../services/networking";
import { startCapturingInput, stopCapturingInput } from "../../services/input";
import { initState } from "../../services/state";
import { startRendering, stopRendering } from "../../services/render";
import GameContext from "../../gameContext";

const Canvas = () => {
    const canvasRef = useRef();
    const { Username, setGamestarted } = useContext(GameContext);

    useEffect(() => {
        connect(onGameOver).then(() => {
            play(Username);
            initState();
            startCapturingInput();
            startRendering(canvasRef);

        })

        return () => {
            onGameOver()
        };
    }, []);

    const onGameOver = () => {
        stopCapturingInput();
        stopRendering();
        setGamestarted(false);
    };

    return (<canvas ref={canvasRef} id="canvas" style={{position:"fixed"}}></canvas>)
}

export default Canvas