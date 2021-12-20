import "./style.css"
import { useNavigate } from 'react-router-dom';
import back from "../../Assets/turn.png"

export default function HeaderCineflex() {

  const navigate = useNavigate();
  
  return(
    <header className="page-header">
      <h1>CINEFLEX</h1>
      {window.location.pathname==="/" ? "" : <div className="back-button" onClick={() => navigate(-1)}><img src={back} alt="voltar" /></div>}
    </header>
  )

}