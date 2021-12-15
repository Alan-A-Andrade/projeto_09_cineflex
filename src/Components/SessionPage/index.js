import { useState, useEffect } from 'react';
import axios from "axios";

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


    return(
        <div className="session-page">
            <h1>Selecione o horário</h1>
            <div className="session-list">
                <ul>
                    <li>
                      <h1>{movieData.days[0].date}</h1>  
                    </li>

                </ul>
            </div>
        </div>
    )



}