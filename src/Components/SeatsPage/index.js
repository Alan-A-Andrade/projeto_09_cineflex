import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

import FooterCineFlex from '../FooterCineFlex';
import Seat from '../Seat';

import "./style.css"

let requestTickets = {}
let infoForSuccessPage ={}
let arraySeatNameList = []

export {requestTickets}
export {arraySeatNameList}
export {infoForSuccessPage}

export default function SeatsPage() {

    const { sessionId } = useParams();

    const navigate = useNavigate();

    const [sessionData, setSessionData] = useState([]);

    const [renderInputBox, setRenderInputBox] = useState([])

    const [seatNameList, setSeatNameList] = useState([])
 
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
   

    function selectSeat(seatId, status, seatName){

        if (status === "add"){

            setRenderInputBox([...renderInputBox,seatId])
            setSeatNameList([...seatNameList,seatName])

            arraySeatNameList =seatNameList

            
        }

        else{
 
            setRenderInputBox(renderInputBox.filter((el) => el !== seatId))
            setSeatNameList(seatNameList.filter((el) => el !== seatName))

            arraySeatNameList = seatNameList

        }  

       
    }
   

    function buyTickets(){

        if (renderInputBox.length === 0){

        }
        else{



                requestTickets.ids = renderInputBox.map(el => parseInt(el));  

                let arrCompradores = []

                for(let i = 0 ; i <renderInputBox.length ; i++){
                
                
                arrCompradores.push({idAssento: parseInt(renderInputBox[i]), nome: buyerNameList[renderInputBox[i]], cpf: buyerCPFList[renderInputBox[i]]})
                
                
                }

                arraySeatNameList = seatNameList
                
                requestTickets.compradores = arrCompradores
                
                let request = axios.post("https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many",requestTickets)

                request.then(requestSuccess)
                request.catch(requestFail)
            }
 

        
    }

    function requestSuccess() {

        navigate("/sucesso")
    }
    function requestFail(answer){
        console.log(answer)
    }


    let buyerNameList = {}

    let buyerCPFList ={}
  
    function getBuyerName(e, seatId){
          
        buyerNameList[seatId] = e
    }

    function getBuyerCPF(e, seatId){
           
        buyerCPFList[seatId] = e
    }

    function Inputs(Props) {

            return(
                <div className="buyer-info">
                    <h1>Assento {Props.seatName}</h1>
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

    infoForSuccessPage = {movieName: sessionData.movie.title, movieSession: `${sessionData.day.date} - ${sessionData.name}`}
         
    return(
        <div className='seats-page'>
            <h1>Selecione o(s) assento(s)</h1>
            <div className="seats-list">
                {sessionData.seats.map(el => <Seat onClick={selectSeat} seatId={el.id} key={`${sessionId}_${el.name}`} name={el.name} isAvailable={el.isAvailable} /> )}
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
            {renderInputBox.map((el,i) => <Inputs key={`seat_${el}`} seatId={el} seatName={seatNameList[i]} />)}
            </div>
            <div className="buy-button" >
                {renderInputBox.length === 0 ? <h1 style={{backgroundColor: "grey", opacity: 0.5}}>Reservar assento(s)</h1> : <h1 onClick={()=>{buyTickets()}}>Reservar assento(s)</h1>}
            </div>
            <FooterCineFlex img={sessionData.movie.posterURL} movieName={sessionData.movie.title} movieSession={`${sessionData.day.weekday} - ${sessionData.name}`}/>
        </div>
    )
}