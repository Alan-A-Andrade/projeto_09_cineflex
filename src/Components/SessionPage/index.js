import { useState, useEffect } from 'react';
import axios from "axios";

import FooterCineFlex from '../FooterCineFlex';

import "./style.css"

export default function SessionPage(Props) {


    const [movieData, setMovieData] = useState([]);

    useEffect(() =>{

        const request = axios.get(`https://mock-api.driven.com.br/api/v4/cineflex/movies/${Props.movieID}/showtimes`);

        request.then( answer => {
            setMovieData(answer.data)
            console.log(movieData)
        });

    },[]);

    if(movieData.length === 0) {
		return (
            <div>
                Carregando
            </div>
        );
	}

    function Session(Props){

        return(
            <ul>
            <h1>{`${Props.weekday} - ${Props.date}`}</h1>
                <li>                     
                {Props.data.map(el => {return (<div className="session"><h1>{el.name}</h1></div>)})}
                </li>
            </ul>
        )
    }

   
    return(
        <div className="session-page">
            <h1>Selecione o horário</h1>
            <div className="session-list">
                {movieData.days.map(el => <Session weekday={el.weekday} date={el.date} data={el.showtimes}/>)}
            </div>
            <FooterCineFlex img={movieData.posterURL} movieName={movieData.title} movieSession={""}/>
        </div>
    )



}