
import "./style.css"

import MoviePoster from "../MoviePoster";

export default function HomePage(props){

    let movieList = props.data
    

    return(
        <div className="homepage">
            <h1>Selecione o filme</h1>
            <div className="movie-list">
            {movieList.map(el => <MoviePoster img={el.posterURL} movieID={el.id}/>)}
            </div>
        </div>
    )
}