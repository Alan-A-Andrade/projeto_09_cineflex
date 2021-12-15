import "./style.css"
import { Link } from "react-router-dom"

export default function MoviePoster(Props){

    return (
        <Link to={`/sessoes/${Props.movieID}`}>
        <div className="movie-poster">
            
            <img src={Props.img} alt={Props.altText} />
            
        </div>
        </Link>
        
    )

}