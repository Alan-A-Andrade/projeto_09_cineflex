import "./style.css"
import { useState } from "react"


export default function Seat(Props){

    const [availability, setAvailability] = useState(Props.isAvailable)

    function isSelected(status){

        

        if(status === false){
            return ""
        }
        else if (status === true){
            Props.onClick(Props.name, "add")
            setAvailability("selected")
        }
        else{
            Props.onClick(Props.name, "remove")
            setAvailability(true)
        }
        

    }

    return (
        <div onClick={() => isSelected(availability)} className={`seat-circle ${availability}`}>
            <p>{Props.name}</p>
        </div>
        )
              
    


}