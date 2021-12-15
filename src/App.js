import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./Assets/reset.css"
import "./Assets/style.css"

import HomePage from "./HomePage";
import HeaderCineflex from "./HeaderCineflex";


export default function App(){

return (
    <BrowserRouter>
    <HeaderCineflex/>
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
        </Routes>
    </BrowserRouter>
);


}