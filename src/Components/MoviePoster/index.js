import "./style.css"
import { Link } from "react-router-dom"

export default function MoviePoster(Props){

    return (
        <Link to={`/sessoes/${Props.movieId}`}>
            <div className="movie-poster">
                <img src={Props.img} alt={Props.altText} />
            </div>
        </Link>
        
    )

}