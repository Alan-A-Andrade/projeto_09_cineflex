import "./style.css"
import { useState } from "react"


export default function Seat(Props){

  const [availability, setAvailability] = useState(Props.isAvailable)

  function isSelected(status){

    if(status === false){
      return ""
    }
    else if (status === true){
      Props.onClick(Props.seatId, "add", Props.name)
      setAvailability("selected")
    }
    else{

      const confirmBox = window.confirm("gostaria realmente de remover o assento e apagar os dados?")

      if(confirmBox===true){
        Props.onClick(Props.seatId, "remove", Props.name)
        setAvailability(true)
      }
    }
  }

  return (
  <div onClick={() => isSelected(availability)} className={`seat-circle ${availability}`}>
    <p>{Props.name}</p>
  </div>
  )
}