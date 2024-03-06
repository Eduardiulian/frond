import 'bootstrap/dist/css/bootstrap.min.css';
import './play.css'
import Canvas from "./../../components/canvas/canvas"
import GameContext from "../../gameContext";
import { useContext } from "react";
import secario from './../../assets/secario3.png'

const Play = () => {
  const { Gamestarted, setUsername, setGamestarted } = useContext(GameContext);

  return (

    <div>
      {!Gamestarted ?
        <div className="grid-background" >
          <div className="wrapper" >
            <img src={secario} />
            <input
              className=" wrap-input"
              type="text"
              placeholder="Nickname"
              maxlength="10"
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <button type="submit" onClick={() => setGamestarted(true)} className="bttn">Play</button>
          </div>
        </div>
        : <Canvas />}
    </div>
  )
}

export default Play


///style={{ backgroundImage: "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))" }}