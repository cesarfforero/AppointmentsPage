import Styles from "./Turno.module.css"

function Turno({id, date, time, status}){
    return (
        <div className={Styles.appointmentCard}>
            <div className={Styles.appointmentsHeader}>
                <h3>Turno #{id}</h3>
                <span className={status === "Active" ? Styles.statusActive : Styles.statusInactive}> {status}</span>                
            </div> 
            <div className={Styles.appointmentDetails}>
                <p><strong>Fecha</strong> <span>{date}</span></p>  
                <p><strong>Hora</strong> <span>{time}</span></p>  
            </div>
        </div>   
    )
}

export default Turno

