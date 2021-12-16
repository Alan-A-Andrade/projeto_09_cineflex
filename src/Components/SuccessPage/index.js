import "./style.css"
import { Link } from 'react-router-dom';
import { requestTickets } from "../SeatsPage"
import { infoForSuccessPage } from "../SeatsPage"
import { arraySeatNameList } from "../SeatsPage";

export default function SuccessPage(Props){

    return (
        <div className='success-page'>
            <div className="h1-wrapper">
                <h1 className="title">Pedido feito com sucesso!</h1>
            </div>
            <div className="success-info">
                <h1>Filme e sessão</h1>
            <div className="movie-info">
                <p>{infoForSuccessPage.movieName}</p>
                <p>{infoForSuccessPage.movieSession}</p>
            </div>
            <h1>Ingressos</h1>
                <div className="reserved-seats-list">
                {requestTickets.ids.map((el,id)=> <p key={`seat_${id}`}>{`Assento ${arraySeatNameList[id]}`}</p>)}
                </div>
            <h1>Comprador(es)</h1>
            {requestTickets.compradores.map((el,id)=> {
                return(
                <div key={`buyer_${id}`} className="reserved-seats-buyers">
                <p>{`Nome: ${el.nome}`}</p>
                <p>{`CPF: ${el.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}`}</p>
                </div>
                )
            })}
            </div>
            <Link style={{ textDecoration: 'none' }} to="/">
                <div className="back-home-button" >
                    <h1>Voltar para Home</h1>
                </div>
            </Link>
        </div>
        )
              
    


}