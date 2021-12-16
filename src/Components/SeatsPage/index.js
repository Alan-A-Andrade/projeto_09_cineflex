import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

import FooterCineFlex from '../FooterCineFlex';
import Seat from '../Seat';

import "./style.css"


let requestTickets = {}

export {requestTickets}

export default function SeatsPage() {

    const { sessionId } = useParams();

    const navigate = useNavigate();

    const [sessionData, setSessionData] = useState([]);

    const [buyerName, setBuyerName] = useState({});

    const [buyerCPF, setBuyerCPF] = useState({});

    const [postRequest, setPostRequest] = useState("")

    const [renderInputBox, setRenderInputBox] = useState([])
 
    useEffect(() =>{

        const request = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/showtimes/${sessionId}/seats`);

        request.then( answer => {
            setSessionData(answer.data)
        });

    },[]);

    if(sessionData.length === 0) {
		return (
            <div>
                Carregando
            </div>
        );
	}

    function selectSeat(seatId, status){

        if (status === "add"){

            setRenderInputBox([...renderInputBox,seatId])
        }

        else{
 
            setRenderInputBox(renderInputBox.filter((el) => el !== seatId))
        }
        

    }

    

    function buyTickets(){

        if (renderInputBox.length === 0){
            alert("Selecionar assentos!")
        }
        else{
            alert("clicou e navegou")

            requestTickets.ids = renderInputBox.map(el => parseInt(el));  

            let arrCompradores = []

            for(let i = 0 ; i <renderInputBox.length ; i++){
             
            
            arrCompradores.push({idAssento: parseInt(renderInputBox[i]), nome: buyerNameList[renderInputBox[i]], cpf: buyerCPFList[renderInputBox[i]]})
            
            
            }
            
            requestTickets.compradores = arrCompradores
            console.log(requestTickets)
            console.log(exemplo)

            navigate("/sucesso") 
        }
    }

    let exemplo = {
        ids: [1, 2, 3], // ids dos assentos
        compradores: [
            { idAssento: 1, nome: "Fulano", cpf: "12345678900" },
            { idAssento: 2, nome: "Fulano 2", cpf: "12345678901" },
            { idAssento: 3, nome: "Fulano 3", cpf: "12345678902" },
        ]
    }

    let buyerNameList = {}

    let buyerCPFList ={}
  
    function getBuyerName(e, seatId){

         console.log(`nome ${e} do assento ${seatId}`)
            
        buyerNameList[seatId] = e

        console.log(buyerNameList)
    }

    function getBuyerCPF(e, seatId){

        console.log(`CPF ${e} do assento ${seatId}`)
           
        buyerCPFList[seatId] = e
   
        console.log(buyerCPFList)
    }

    function Inputs(Props) {

            return(
                <div className="buyer-info">
                    <h1>Assento {Props.seatId}</h1>
                    <div>
                        <h1>Nome do comprador:</h1>
                        <input type="text" placeholder='Digite seu nome...' onChange={e => getBuyerName(e.target.value, Props.seatId)}/>
                    </div>
                    <div>
                        <h1>CPF do comprador:</h1>
                        <input type="text" placeholder='Digite seu CPF...' onChange={e => getBuyerCPF(e.target.value, Props.seatId)}/>
                    </div>
                </div>)
        }
            
    


    return(
        <div className='seats-page'>
            <h1>Selecione o(s) assento(s)</h1>
            <div className="seats-list">
                {sessionData.seats.map(el => <Seat onClick={selectSeat} key={`${sessionId}_${el.name}`} name={el.name} isAvailable={el.isAvailable} /> )}
            </div>
            <div className="seats-legend">
                <div className="seat-circle selected">
                    <p>Selecionado</p>
                </div>
                <div className="seat-circle true">
                    <p>Disponível</p>
                </div>
                <div className="seat-circle false">
                    <p>Indisponível</p>
                </div>
            </div>
            <div className="input-box-list">
            {renderInputBox.map(el => <Inputs key={`seat_${el}`} seatId={el} />)}
            </div>
            <div className="buy-button" >
                {renderInputBox.length === 0 ? <h1 style={{backgroundColor: "grey", opacity: 0.5}}>Reservar assento(s)</h1> : <h1 onClick={()=>{buyTickets()}}>Reservar assento(s)</h1>}
            </div>
            <FooterCineFlex img={sessionData.movie.posterURL} movieName={sessionData.movie.title} movieSession={`${sessionData.day.weekday} - ${sessionData.day.date}`}/>
        </div>
    )

}