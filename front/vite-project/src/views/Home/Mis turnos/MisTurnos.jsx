import { useEffect, useState } from "react"
import Turno from "../../../components/Turno/Turno"
import Styles from "./Misturnos.module.css"
import axios from "axios"

function MisTurnos (){

    const [appointments, setAppointments ] = useState([])

    useEffect(() => {

        setTimeout(() => {
        axios.get("http://localhost: 3000/appointments/")
        .then(({data}) => {
            setAppointments(data.data)
        })
        .catch(err => err)
    },3000);
        
    }, [])

    return (
        <div className={Styles.container}>
            <div className={Styles.container}>
                <h1>Mis turnos</h1>
            </div>


            <div className={Styles.container}>
        
            {appointments.length > 0 ? appointments?.map(Turno =>
                <Turno
                    key={Turno.key}
                    id={Turno.id}
                    data={Turno.data}
                    time={Turno.time}
                    status={Turno.status}
                    />
            ): (<h1>Cargando...</h1>)
        }    
            </div>
        </div>
    )
}

export default MisTurnos