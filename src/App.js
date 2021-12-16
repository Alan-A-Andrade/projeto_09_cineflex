import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";

import "./Assets/reset.css"
import "./Assets/style.css"

import HomePage from "./Components/HomePage";
import HeaderCineflex from "./Components/HeaderCineflex"
import SessionPage from "./Components/SessionPage";
import SeatsPage from "./Components/SeatsPage";
import SuccessPage from "./Components/SuccessPage";

export default function App(){

    const [movieList, setMovieList] = useState([]);

    useEffect(() =>{

        const request = axios.get("https://mock-api.driven.com.br/api/v4/cineflex/movies");

        request.then( answer => {
            setMovieList(answer.data)
        });

    },[]);

    if(movieList.length === 0) {
		return (
            <div>
                Carregando
            </div>
        );
	}



    return (

        <BrowserRouter>
            <HeaderCineflex/>
            <Routes>
                <Route path="/" element={<HomePage data={movieList}/>}></Route>
                <Route path="sessoes/:movieId" element={<SessionPage/>}></Route>
                <Route path="assentos/:sessionId" element={<SeatsPage/>}></Route>
                <Route path="sucesso" element={<SuccessPage/>}></Route>
            </Routes>
        </BrowserRouter>


    );


}