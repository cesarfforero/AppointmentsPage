import { useState } from "react"
import myAppointments from "../../../helpers/myAppointments"
import Turno from "../../../components/Turno/Turno"
import Styles from "./Misturnos.module.css"

function MisTurnos (){

    const [apps, setApp] = useState(myAppointments)

    return (
        <div className={Styles.container}>
            <div className={Styles.container}>
                <h1>Mis turnos</h1>
            </div>


            <div className={Styles.container}>
        
            {apps.map(Turno =>
                <Turno
                    key={Turno.key}
                    id={Turno.id}
                    data={Turno.data}
                    time={Turno.time}
                    status={Turno.status}
                    />
            )
        }    
            </div>
        </div>
    )
}

export default MisTurnos