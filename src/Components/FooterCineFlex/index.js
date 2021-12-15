import "./style.css"

export default function FooterCineFlex(Props){
    return(
        <footer className="page-footer">
            <div className="mini-poster">
            <img src={Props.img} alt="" />
            </div>
            <div className="footer-text">
                <h1>{Props.movieName}</h1>
                <h1>{Props.movieSession}</h1>
            </div>
        </footer>
    )
}